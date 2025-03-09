"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET,
    send_mail_auth_user: process.env.SEND_MAIL_AUTH_USER,
    send_mail_auth_pass: process.env.SEND_MAIL_AUTH_PASS,
    cloudinary_api_name: process.env.CLOUDINARY_API_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
