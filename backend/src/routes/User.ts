import express from "express";
import { getUserHotelByIdController, getUserHotelController } from "../controllers/User/HotelController";
import { getUserHotelRoomByIdController, getUserHotelRoomController } from "../controllers/User/RoomController";
import { bookUserRoomController, cancelUserBookingController } from "../controllers/User/BookingController";
import { getUserOtpController, userLoginController, verifyUserOtpController } from "../controllers/User/AuthController";
import { M_UserMiddleware } from "../middlewares/UserMiddleware";
export const router = express.Router();

// User Hotel Controllers ;
router.post('/get-otp', getUserOtpController);
router.post('/verify-otp', verifyUserOtpController);
router.post('/login', userLoginController);


router.get('/get-hotel/:hid', getUserHotelByIdController);


router.get('/get-room/:hid', getUserHotelRoomController);
router.get('/get-room/:rid', getUserHotelRoomByIdController);


router.post('/book-room/:hid/:rid', M_UserMiddleware, bookUserRoomController);
router.post('/cancel-book/:bid', M_UserMiddleware, cancelUserBookingController);
