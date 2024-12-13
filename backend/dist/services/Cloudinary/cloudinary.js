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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeImage = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
// Wrap the Cloudinary upload in a promise
const uploadImage = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'HotelListing/',
            public_id: publicId,
            overwrite: true,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadImage = uploadImage;
const removeImage = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/avatar/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
});
exports.removeImage = removeImage;
