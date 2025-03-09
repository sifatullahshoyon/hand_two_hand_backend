import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: '{VALUE} is not a valid email',
      },
      immutable: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      select: false, // Excludes password from query results by default for security.
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    photo: String,
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
      required: true,
    },
    userStatus: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

// password hashing
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc

  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  // this next function come from mongoose
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';

  // this next function come from mongoose
  next();
});

export const UserModel = model<IUser>('User', userSchema);
