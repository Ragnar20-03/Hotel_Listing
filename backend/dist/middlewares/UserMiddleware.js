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
exports.M_UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("../config/dotenv");
const Schema_1 = require("../models/Schema");
const M_UserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.cookies['token'];
        if (!token) {
            return res.status(501).json({
                msg: "Unauthorized Request !"
            });
        }
        let verifiedToken = jsonwebtoken_1.default.verify(token, dotenv_1.SECRETE_KEY);
        if (!verifiedToken) {
            return res.status(501).json({
                msg: "Unauthorized Request !"
            });
        }
        else {
            req.userId = verifiedToken.uid;
            let user = yield Schema_1.User.findById(verifiedToken.uid);
            if (!user) {
                return res.status(501).json({
                    msg: "Unauthorized Request !"
                });
            }
            else {
                return next();
            }
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Unauthorized Request "
        });
    }
});
exports.M_UserMiddleware = M_UserMiddleware;
