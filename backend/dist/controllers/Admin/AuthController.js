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
exports.updateManagerController = exports.addMangerController = exports.adminLoginController = exports.verifyOtpController = exports.getOtpController = void 0;
const Otp_1 = require("../../services/Otp/Otp");
const email_1 = require("../../services/Email/email");
const Schema_1 = require("../../models/Schema");
const cloudinary_1 = require("../../services/Cloudinary/cloudinary");
const getOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("Email :  ", email);
    console.log("password :  ", password);
    const optInstance = Otp_1.OTP.getInstance();
    const generatedOtp = (yield (optInstance === null || optInstance === void 0 ? void 0 : optInstance.generateOTP(email))) || "";
    yield (0, email_1.sendOTP)(email, generatedOtp);
    res.status(200).json({
        msg: "OTP Sent Succesfully !"
    });
});
exports.getOtpController = getOtpController;
const verifyOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, password, otp } = req.body;
        // Validate OTP
        const otpInstance = Otp_1.OTP.getInstance();
        if (!otpInstance) {
            return res.status(500).json({ msg: "OTP service unavailable." });
        }
        const isValidOtp = otpInstance.validateOtp(email, otp);
        // if (!isValidOtp) {
        //     return res.status(400).json({ msg: "Invalid OTP!" });
        // }
        if (req.file) {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: "Only image files (JPEG, PNG, GIF, WebP) are allowed!" });
            }
            // Generate a unique public ID using the profile name and current timestamp
            const publicId = `avatar__${Date.now()}`;
            // Upload the new avatar to cloud storage
            const uploadResult = yield (0, cloudinary_1.uploadImage)(req.file.buffer, publicId);
            // Delete the previous avatar from cloud storage if it exists
            // if (prevAvatar) {
            //     const prevPublicId = prevAvatar.split('/').pop()?.split('.')[0];
            //     if (prevPublicId) {
            //         await removeAvatar(prevPublicId); // Remove previous avatar from cloud storage
            //     }
            // } 
            const newAdmin = yield Schema_1.Admin.create({ name, email, password, phone });
            return res.status(200).json({
                msg: "Admin Created Successfully!",
                url: uploadResult.secure_url,
                admin: newAdmin, // optional
            });
        }
        // Create Admin
        const newAdmin = yield Schema_1.Admin.create({ name, email, password, phone });
        return res.status(200).json({
            msg: "Admin Created Successfully!",
            admin: newAdmin, // optional
        });
    }
    catch (err) {
        console.error("Error in verifyOtpController:", err);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
});
exports.verifyOtpController = verifyOtpController;
const adminLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.adminLoginController = adminLoginController;
const addMangerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.addMangerController = addMangerController;
const updateManagerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateManagerController = updateManagerController;
