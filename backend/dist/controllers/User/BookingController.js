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
exports.cancelUserBookingController = exports.bookUserRoomController = void 0;
const Schema_1 = require("../../models/Schema");
const mongoose_1 = __importDefault(require("mongoose"));
const bookUserRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        let hid = req.params.hid;
        let rid = req.params.rid;
        let uid = req.userId;
        console.log("uid is : ", uid);
        let hotel = yield Schema_1.Hotel.findById(hid).session(session);
        if (!(hotel === null || hotel === void 0 ? void 0 : hotel.rooms.includes(new mongoose_1.default.Types.ObjectId(rid)))) {
            return res.status(501).json({
                msg: "Room is not associated with the Hotel"
            });
        }
        let room = yield Schema_1.Room.findById(rid).session(session);
        if (!room) {
            return res.status(501).json({
                msg: "No Such Room !"
            });
        }
        room.isAvailable = false;
        // Payment API 
        yield room.save({ session });
        const { checkIn, checkOut, guests, totalPrice } = req.body;
        if (!checkIn || !checkOut || !guests || !totalPrice) {
            return res.status(404).json({
                msg: "All Values are Necessary !"
            });
        }
        const booking = yield Schema_1.Booking.create([{
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests,
                totalPrice: totalPrice,
                paymentStatus: "completed",
                user: new mongoose_1.default.Types.ObjectId(uid),
                hotel: new mongoose_1.default.Types.ObjectId(hid),
                room: new mongoose_1.default.Types.ObjectId(rid)
            }], { session });
        yield session.commitTransaction();
        res.status(201).json(booking);
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(500).json({ msg: 'Error processing booking' });
    }
    finally {
        session.endSession();
    }
});
exports.bookUserRoomController = bookUserRoomController;
const cancelUserBookingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        let bid = req.params.bid;
        const booking = yield Schema_1.Booking.findByIdAndUpdate(bid, { paymentStatus: 'cancelled' }, { session, new: true }); // get updated document
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }
        // Update room availability (optional):
        const room = yield Schema_1.Room.findById(booking.room).session(session);
        if (room) {
            room.isAvailable = true;
            yield room.save({ session });
        }
        yield session.commitTransaction();
        res.status(200).json(booking);
    }
    catch (error) {
        yield session.abortTransaction();
        console.error(error);
        res.status(500).json({ msg: 'Error canceling booking' });
    }
    finally {
        session.endSession();
    }
});
exports.cancelUserBookingController = cancelUserBookingController;
