import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import { UserModel } from '../app/modules/user/user.model';
import { TUserRole } from '../app/modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import jwt from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
  name: string;
  email: string;
  role: TUserRole;
  userStatus: 'active' | 'inactive';
  _id: string;
}

const verifyToken = async (token: string): Promise<CustomJwtPayload> => {
  try {
    const decoded = jwt.verify(token, config.jwt_secret!) as CustomJwtPayload;

    const user = await UserModel.findOne({ email: decoded.email }).select(
      '_id',
    );

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...decoded,
      _id: user._id.toString(), // Ensure _id is a string
    };
  } catch (error) {
    console.log(error);
    throw new Error('Invalid or expired token');
  }
};

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('You are not authorized!');
    }

    // Verify the token and get user details
    const decoded = await verifyToken(token);

    // Fetch the user from DB using the decoded email
    const user = await UserModel.findOne({ email: decoded.email });

    if (!user) {
      throw new Error('This user is not found!');
    }

    // Check if the user's status is inactive
    if (user.userStatus === 'inactive') {
      throw new Error('This user is blocked!');
    }

    // Check if the user has the required role
    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      throw new Error('You are not authorized');
    }

    req.user = decoded; // Attach decoded user info to the request object
    next();
  });
};

export default auth;
