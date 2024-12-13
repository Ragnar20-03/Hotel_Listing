import express from "express";
import { M_AdminMiddleware } from "../middlewares/AdminMiddleware";
import { addMangerController, adminLoginController, getOtpController, updateManagerController, verifyOtpController } from "../controllers/Admin/AuthController";
import { addRoomController, deleteRoomController, getRoomController, updateRoomController } from "../controllers/Admin/RoomController";
import { addHotelController, deleteHotelController, getHotelController, updateHotelController } from "../controllers/Admin/HotelController";
import multer from "multer";
import { upload } from "../config/cloudinary";

export const router = express.Router()


// AUTH ----------------------------------------------------------------------------------------
router.post('/get-otp', getOtpController)
router.post('/verify-otp', upload.single('file'), verifyOtpController)
router.post('/login', adminLoginController)
//manager
// router.post('/add-manager', M_AdminMiddleware, addMangerController)

// router.put('/update-manager', M_AdminMiddleware, updateManagerController)

// HOTEL ----------------------------------------------------------------------------------------
router.get("/get-hotel", M_AdminMiddleware, getHotelController)

router.get('/get-hotel/:id', getHotelController)

router.post('/add-hotel', M_AdminMiddleware, upload.array('files', 5), addHotelController)

router.put('/update-hotel/:hid', M_AdminMiddleware, upload.array('files', 5), updateHotelController)

router.delete('/delete-hotel', M_AdminMiddleware, deleteHotelController)

// ROOM ----------------------------------------------------------------------------------------
router.get('/get-room/:hid', getRoomController)
router.get('/get-room/:hid/:rid', getRoomController)
router.post('add-room/:hid', M_AdminMiddleware, addRoomController)
router.put('/update-room/:rid', M_AdminMiddleware, updateRoomController)
router.delete('/delete-room/:rid', M_AdminMiddleware, deleteRoomController)

