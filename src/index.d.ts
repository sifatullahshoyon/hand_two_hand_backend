import { CustomJwtPayload } from '../middlewares/auth';

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload; // Use the updated CustomJwtPayload type
    }
  }
}
