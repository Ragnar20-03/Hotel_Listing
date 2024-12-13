"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("./dotenv");
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: dotenv_1.EMAIL_USER,
        pass: dotenv_1.EMAIL_PASS
    }
});