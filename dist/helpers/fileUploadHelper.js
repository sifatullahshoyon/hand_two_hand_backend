"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendImageToCloudinary = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../app/config"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        // console.log('filename', file);
        const fileExt = path_1.default.extname(file.originalname);
        // console.log('fileExt', fileExt);
        const fileName = file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-') +
            '-' +
            Date.now();
        // console.log('fileName 25:-', fileName, fileExt);
        cb(null, fileName + fileExt);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
// cloudinary
cloudinary_1.v2.config({
    cloud_name: config_1.default.cloudinary_api_name,
    api_key: config_1.default.cloudinary_api_key,
    api_secret: config_1.default.cloudinary_api_secret,
});
const sendImageToCloudinary = (imageName, path) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName.trim(),
        }, (error, result) => {
            fs_1.default.unlinkSync(path); // delete upload folder file system
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
};
exports.sendImageToCloudinary = sendImageToCloudinary;
