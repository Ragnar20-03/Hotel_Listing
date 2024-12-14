import express from "express";
import { getUserHotelByIdController, getUserHotelController } from "../controllers/User/HotelController";
import { getUserHotelRoomByIdController, getUserHotelRoomController } from "../controllers/User/RoomController";
import { bookUserRoomController, cancelUserBookingController } from "../controllers/User/BookingController";
import { getUserOtpController, userLoginController, verifyUserOtpController } from "../controllers/User/AuthController";
import { M_UserMiddleware } from "../middlewares/UserMiddleware";
import { M_AdminMiddleware } from "../middlewares/AdminMiddleware";
export const router = express.Router();

// User Hotel Controllers ;
router.post('/get-otp', getUserOtpController);
router.post('/verify-otp', verifyUserOtpController);
router.post('/login', userLoginController);


router.get('/get-hotel', getUserHotelController);
router.get('/get-hotel/:hid', getUserHotelByIdController);


router.get('/get-rooms/:hid', getUserHotelRoomController);
router.get('/get-room/:rid', getUserHotelRoomByIdController);


router.post('/book-room/:hid/:rid', M_UserMiddleware, bookUserRoomController);
router.post('/cancel-booking/:bid', M_UserMiddleware, cancelUserBookingController);
router.get('/get-booking/:hid', M_AdminMiddleware,)