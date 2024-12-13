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
exports.removeImagehandler = exports.imageUploadeHandler = void 0;
const cloudinary_1 = require("../../services/Cloudinary/cloudinary");
const imageUploadeHandler = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return "invalid_file_type";
    }
    // Generate a unique public ID using the profile name and current timestamp
    const publicId = `admin_profile${Date.now()}`;
    // Upload the new avatar to cloud storage
    const uploadResult = yield (0, cloudinary_1.uploadImage)(file.buffer, publicId);
    console.log("Uploaded Url is : ", uploadResult.secure_url);
    if (yield uploadResult.secure_url) {
        return uploadResult.secure_url;
    }
});
exports.imageUploadeHandler = imageUploadeHandler;
const removeImagehandler = (prevAvatar) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Delete the previous avatar from cloud storage if it exists
    if (prevAvatar) {
        const prevPublicId = (_a = prevAvatar.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
        if (prevPublicId) {
            yield (0, cloudinary_1.removeImage)(prevPublicId); // Remove previous avatar from cloud storage
        }
    }
});
exports.removeImagehandler = removeImagehandler;
