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
exports.userLoginController = exports.verifyUserOtpController = exports.getUserOtpController = void 0;
const Schema_1 = require("../../models/Schema");
const Otp_1 = require("../../services/Otp/Otp");
const email_1 = require("../../services/Email/email");
const getUserOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone } = req.body;
        let otpInstance = Otp_1.OTP.getInstance();
        let generatedOtp = yield (otpInstance === null || otpInstance === void 0 ? void 0 : otpInstance.generateOTP(email));
        yield (0, email_1.sendOTP)(email, generatedOtp);
        return res.status(200).json({
            msg: "Otp Sent Succesfully !"
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.getUserOtpController = getUserOtpController;
const verifyUserOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone, otp } = req.body;
        if (!email || !name || !password || !phone || !otp) {
            return res.status(404).json({
                msg: "All Values Are Necessary !"
            });
        }
        let otpInstance = Otp_1.OTP.getInstance();
        if (otpInstance === null || otpInstance === void 0 ? void 0 : otpInstance.validateOtp(email, otp)) {
            Schema_1.User.create({
                name: name,
                email: email,
                password: password,
                phone: phone,
                bookings: [],
                profilePicture: "#"
            });
            return res.status(200).json({
                msg: " User Account created Succesfully !"
            });
        }
        else {
            return res.status(501).json({
                msg: " Invalid OTP !"
            });
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.verifyUserOtpController = verifyUserOtpController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        Schema_1.User.findOne({ email: email }).then((res1) => {
            if (res1 != null) {
                if (res1.password == password) {
                    return res.status(200).json({
                        msg: " Login Successfull !"
                    });
                }
                else {
                    return res.status(501).json({
                        msg: "Password Mismatch !"
                    });
                }
            }
            else {
                return res.status(404).json({
                    msg: "Account Not Found !"
                });
            }
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        });
    }
});
exports.userLoginController = userLoginController;
