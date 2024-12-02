import express, { Response, Request, RequestParamHandler } from "express";
import { M_AdminMiddleware } from "../middlewares/AdminMiddleware";
import { addMangerController, adminLoginController, getOtpController, updateManagerController, verifyOtpController } from "../controllers/Admin/AuthController";
import { addRoomController, deleteRoomController, getRoomController, updateRoomController } from "../controllers/Admin/RoomController";
import { addHotelController, deleteHotelController, getHotelController, updateHotelController } from "../controllers/Admin/HotelController";

const router = express.Router()


// AUTH ----------------------------------------------------------------------------------------
router.post('/get-otp', getOtpController)
router.post('/verify-otp', verifyOtpController)
router.post('/login', adminLoginController)
//manager
router.post('/add-manager', addMangerController)

router.put('/update-manager', updateManagerController)

// HOTEL ----------------------------------------------------------------------------------------
router.get("/get-hotel", getHotelController)

router.get('/get-hotel/:id', getHotelController)

router.post('/add-hotel', addHotelController)

router.put('/update-hotel', updateHotelController)

router.delete('/delete-hotel', deleteHotelController)

// ROOM ----------------------------------------------------------------------------------------
router.get('/get-room/:hid', getRoomController)
router.get('/get-room/:hid/:rid', getRoomController)
router.post('add-room/:hid', addRoomController)
router.put('/update-room/:rid', updateRoomController)
router.delete('/delete-room/:rid', deleteRoomController)

module.exports = router;