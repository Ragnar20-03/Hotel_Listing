"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const HotelController_1 = require("../controllers/User/HotelController");
const RoomController_1 = require("../controllers/User/RoomController");
const BookingController_1 = require("../controllers/User/BookingController");
const AuthController_1 = require("../controllers/User/AuthController");
const UserMiddleware_1 = require("../middlewares/UserMiddleware");
const AdminMiddleware_1 = require("../middlewares/AdminMiddleware");
exports.router = express_1.default.Router();
// User Hotel Controllers ;
exports.router.post('/get-otp', AuthController_1.getUserOtpController);
exports.router.post('/verify-otp', AuthController_1.verifyUserOtpController);
exports.router.post('/login', AuthController_1.userLoginController);
exports.router.get('/get-hotel', HotelController_1.getUserHotelController);
exports.router.get('/get-hotel/:hid', HotelController_1.getUserHotelByIdController);
exports.router.get('/get-rooms/:hid', RoomController_1.getUserHotelRoomController);
exports.router.get('/get-room/:rid', RoomController_1.getUserHotelRoomByIdController);
exports.router.post('/book-hotel/:hid/:rid', UserMiddleware_1.M_UserMiddleware, BookingController_1.bookUserRoomController);
exports.router.post('/cancel-booking/:bid', UserMiddleware_1.M_UserMiddleware, BookingController_1.cancelUserBookingController);
exports.router.get('/get-booking/:hid', AdminMiddleware_1.M_AdminMiddleware);
