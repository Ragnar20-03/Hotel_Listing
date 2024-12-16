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
exports.updateManagerController = exports.addMangerController = exports.adminLoginController = exports.verifyOtpController = exports.getOtpController = void 0;
const Otp_1 = require("../../services/Otp/Otp");
const email_1 = require("../../services/Email/email");
const Schema_1 = require("../../models/Schema");
const ImageUploadHelper_1 = require("../Utils/ImageUploadHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("../../config/dotenv");
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
        if (!isValidOtp) {
            return res.status(400).json({ msg: "Invalid OTP!" });
        }
        if (req.file) {
            let uploadurl = yield (0, ImageUploadHelper_1.imageUploadeHandler)(req.file);
            const newAdmin = yield Schema_1.Admin.create({ name, email, password, phone, url: uploadurl });
            return res.status(200).json({
                msg: "Admin Created Successfully!",
                url: uploadurl,
                admin: newAdmin, // optional
            });
        }
        // Create Admin
        const newAdmin = yield Schema_1.Admin.create({ name, email, password, phone, url: "#" });
        if (newAdmin) {
            let token = jsonwebtoken_1.default.sign({ aid: newAdmin.__v }, dotenv_1.SECRETE_KEY);
            res.cookie("token", token, {
                httpOnly: true, // Prevents client-side access to the cookie
                secure: true, // Ensures cookie is only sent over HTTPS
                sameSite: "none", // Required for cross-origin requests
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            return res.status(200).json({
                msg: "Admin Created Successfully!",
                admin: newAdmin, // optional
            });
        }
        else {
            return res.status(501).json({
                msg: "Admin Created Failed!",
            });
        }
    }
    catch (err) {
        console.error("Error in verifyOtpController:", err);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
});
exports.verifyOtpController = verifyOtpController;
const adminLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log("email is : ", email);
    Schema_1.Admin.findOne({ email: email }).then((res1) => {
        console.log("res1 : ", res1);
        if (res1 != null) {
            if (res1.password == password) {
                let token = jsonwebtoken_1.default.sign({ aid: res1._id }, dotenv_1.SECRETE_KEY);
                res.cookie("token", token, {
                    httpOnly: false, // Prevents client-side access to the cookie
                    secure: true, // Ensures cookie is only sent over HTTPS
                    sameSite: "lax", // Required for cross-origin requests
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });
                console.log("cookie sent to broeswer succesfully !", token);
                return res.status(200).json({
                    msg: "Login Succesfull !"
                });
            }
            else {
                return res.status(501).json({
                    msg: "Password Mismatch !"
                });
            }
        }
        return res.status(404).json({
            msg: "Account Not Found , Please Register !"
        });
    });
});
exports.adminLoginController = adminLoginController;
const addMangerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.addMangerController = addMangerController;
const updateManagerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateManagerController = updateManagerController;
