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
exports.getUserHotelRoomByIdController = exports.getUserHotelRoomController = void 0;
const Schema_1 = require("../../models/Schema");
const getUserHotelRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hid } = req.params;
        // Find the hotel by ID
        const hotel = yield Schema_1.Hotel.findById(hid);
        if (!hotel) {
            return res.status(404).json({
                msg: "No Such Hotel!"
            });
        }
        // Populate the rooms associated with the hotel
        const populatedHotel = yield hotel.populate('rooms');
        // Check if the hotel has rooms
        const rooms = populatedHotel.rooms || [];
        return res.status(200).json({
            success: true,
            hotel: {
                id: hotel._id,
                name: hotel.name, // Include any other hotel details you'd like to return
            },
            rooms,
        });
    }
    catch (error) {
        console.error("Error fetching hotel rooms:", error);
        return res.status(500).json({
            msg: "Something Went Wrong",
        });
    }
});
exports.getUserHotelRoomController = getUserHotelRoomController;
const getUserHotelRoomByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getUserHotelRoomByIdController = getUserHotelRoomByIdController;
