import { IUser } from '../user/user.interface';
import Order from './order.model';
import ListingModel from '../listings/listings.model';
import { StatusCodes } from 'http-status-codes';
import { orderUtils } from './order.utils';

const createOrder = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  if (!payload?.products?.length)
    throw new Error((StatusCodes.NOT_ACCEPTABLE, 'Order is not specified'));

  const products = payload.products;

  let totalPrice = 0;
  const listings = await Promise.all(
    products?.map(async item => {
      const product = await ListingModel.findById(item.product);

      if (!product) {
        throw new Error('product Not Found');
      }

      if (product) {
        const price = Number(String(product.price || '0').replace(/,/g, ''));
        const quantity = Number(item.quantity || 0);

        if (isNaN(price) || isNaN(quantity)) {
          throw new Error('Invalid product price or quantity');
        }

        const subtotal = price * quantity;
        totalPrice += subtotal;
        // console.log(product, 'product');
        return {
          listing: product?._id, // Match the schema field name
          quantity: item.quantity,
          name: product.title,
          images: product.images,
        };
      } else {
        throw new Error(`Product with ID ${item.product} not found`);
      }
    }),
  );

  console.log(listings, 'listings');

  let order = await Order.create({
    user: user._id,
    listings,
    totalPrice,
    status: 'Pending',
  });

  if (!order) {
    throw new Error('Failed to create order');
  }

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user?.name,
    customer_address: user?.address || 'N/A',
    customer_email: user?.email,
    customer_phone: user?.phoneNumber || 'N/A',
    customer_city: user?.city || 'N/A',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (!payment?.checkout_url) {
    throw new Error('Failed to initiate payment');
  }

  if (payment?.transactionStatus) {
    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { new: true },
    );

    if (!updatedOrder) {
      throw new Error('Failed to update order transaction details');
    }

    order = updatedOrder; // Assign the updated order
  }

  return {
    status: true,
    statusCode: 201,
    message: 'Order placed successfully',
    order,
    paymentUrl: payment.checkout_url,
  };
};

// const getOrders = async () => {
//   const data = await Order.find();
//   return data;
// };

const getOrders = async () => {
  const orders = await Order.find().lean();

  const populatedOrders = await Promise.all(
    orders.map(async order => {
      const listingsWithDetails = await Promise.all(
        (order.listings || []).map(async listing => {
          const product = await ListingModel.findById(listing.listing).lean();
          if (!product) {
            console.log('Product not found for listing:', listing.listing); // Debugging log
          }
          return {
            ...listing,
            name: product?.title || 'Unknown',
            images: product?.images || [],
          };
        }),
      );

      return {
        ...order,
        listings: listingsWithDetails,
      };
    }),
  );

  return populatedOrders;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const orderService = {
  createOrder,
  getOrders,
  verifyPayment,
};
