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
exports.getReviewController = exports.addReviewController = void 0;
const Schema_1 = require("../../models/Schema");
const mongoose_1 = __importDefault(require("mongoose"));
const addReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uid = req.userId;
        let hid = req.params.hid;
        const { rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(501).json({
                msg: "All Values Are Necessary !"
            });
        }
        let createReivew = yield Schema_1.Review.create({ rating: rating, comment: comment, user: new mongoose_1.default.Types.ObjectId(uid), hotel: new mongoose_1.default.Types.ObjectId(hid) });
        if (createReivew) {
            return res.status(200).json({
                msg: " Review Added Succesfully !"
            });
        }
        else {
            return res.status(501).json({
                msg: " Review Added Failed !"
            });
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.addReviewController = addReviewController;
const getReviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hid = req.params.hid;
        let reviews = yield Schema_1.Review.find({ hotel: hid });
        return res.status(200).json({
            reviews
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.getReviewController = getReviewController;
