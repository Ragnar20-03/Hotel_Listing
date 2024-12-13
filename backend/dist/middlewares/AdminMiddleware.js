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
exports.M_AdminMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("../config/dotenv");
const Schema_1 = require("../models/Schema");
const M_AdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized Request",
            });
        }
        const verifiedToken = jsonwebtoken_1.default.verify(token, dotenv_1.SECRETE_KEY);
        if (verifiedToken && verifiedToken.aid) {
            console.log("Verified Token is:", verifiedToken);
            Schema_1.Admin.findOne({ _id: verifiedToken.aid }).then((res1) => {
                if (res1 != null) {
                    req.adminId = verifiedToken.aid;
                    return next(); // Pass control to the next middleware/controller
                    console.log('here');
                }
                return res.status(501).json({
                    msg: "Unauthorized Request | Admin Not Found "
                });
            });
        }
        else {
            return res.status(401).json({
                msg: "Unauthorized Request: Invalid token",
            });
        }
    }
    catch (error) {
        console.error("Error in M_AdminMiddleware:", error);
        return res.status(401).json({
            msg: "Unauthorized Request: Token verification failed",
        });
    }
});
exports.M_AdminMiddleware = M_AdminMiddleware;
