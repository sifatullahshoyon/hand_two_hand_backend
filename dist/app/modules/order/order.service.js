"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const listings_model_1 = __importDefault(require("../listings/listings.model"));
const http_status_codes_1 = require("http-status-codes");
const order_utils_1 = require("./order.utils");
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new Error((http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'Order is not specified'));
    const products = payload.products;
    let totalPrice = 0;
    const listings = yield Promise.all(products === null || products === void 0 ? void 0 : products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield listings_model_1.default.findById(item.product);
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
            return {
                listing: product === null || product === void 0 ? void 0 : product._id, // Match the schema field name
                quantity: item.quantity,
                name: product.title,
                images: product.images,
            };
        }
        else {
            throw new Error(`Product with ID ${item.product} not found`);
        }
    })));
    let order = yield order_model_1.default.create({
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
        customer_name: user === null || user === void 0 ? void 0 : user.name,
        customer_address: (user === null || user === void 0 ? void 0 : user.address) || 'N/A',
        customer_email: user === null || user === void 0 ? void 0 : user.email,
        customer_phone: (user === null || user === void 0 ? void 0 : user.phoneNumber) || 'N/A',
        customer_city: (user === null || user === void 0 ? void 0 : user.city) || 'N/A',
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (!(payment === null || payment === void 0 ? void 0 : payment.checkout_url)) {
        throw new Error('Failed to initiate payment');
    }
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(order._id, {
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        }, { new: true });
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
});
// const getOrders = async () => {
//   const data = await Order.find();
//   return data;
// };
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find().lean();
    const populatedOrders = yield Promise.all(orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
        const listingsWithDetails = yield Promise.all((order.listings || []).map((listing) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield listings_model_1.default.findById(listing.listing).lean();
            if (!product) {
                console.log('Product not found for listing:', listing.listing); // Debugging log
            }
            return Object.assign(Object.assign({}, listing), { name: (product === null || product === void 0 ? void 0 : product.title) || 'Unknown', images: (product === null || product === void 0 ? void 0 : product.images) || [] });
        })));
        return Object.assign(Object.assign({}, order), { listings: listingsWithDetails });
    })));
    return populatedOrders;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
exports.orderService = {
    createOrder,
    getOrders,
    verifyPayment,
};
