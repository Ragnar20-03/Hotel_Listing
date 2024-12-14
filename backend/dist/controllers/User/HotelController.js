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
exports.getUserHotelByIdController = exports.getUserHotelController = void 0;
const Schema_1 = require("../../models/Schema");
const getUserHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hotels = yield Schema_1.Hotel.find({});
        return res.status(200).json({
            hotels
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.getUserHotelController = getUserHotelController;
const getUserHotelByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let hid;
    req.params.hid;
    try {
        let hotel = yield Schema_1.Hotel.findById(hid);
        return res.status(200).json({
            hotel
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.getUserHotelByIdController = getUserHotelByIdController;
