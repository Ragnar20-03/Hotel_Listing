"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const AdminMiddleware_1 = require("../middlewares/AdminMiddleware");
const AuthController_1 = require("../controllers/Admin/AuthController");
const RoomController_1 = require("../controllers/Admin/RoomController");
const HotelController_1 = require("../controllers/Admin/HotelController");
const cloudinary_1 = require("../config/cloudinary");
exports.router = express_1.default.Router();
// AUTH ----------------------------------------------------------------------------------------
exports.router.post('/get-otp', AuthController_1.getOtpController);
exports.router.post('/verify-otp', cloudinary_1.upload.single('file'), AuthController_1.verifyOtpController);
exports.router.post('/login', AuthController_1.adminLoginController);
//manager
// router.post('/add-manager', M_AdminMiddleware, addMangerController)
// router.put('/update-manager', M_AdminMiddleware, updateManagerController)
// HOTEL ----------------------------------------------------------------------------------------
exports.router.get("/get-hotel", AdminMiddleware_1.M_AdminMiddleware, HotelController_1.getHotelController);
exports.router.get('/get-hotel/:id', HotelController_1.getHotelController);
exports.router.post('/add-hotel', AdminMiddleware_1.M_AdminMiddleware, cloudinary_1.upload.array('files', 5), HotelController_1.addHotelController);
exports.router.put('/update-hotel/:hid', AdminMiddleware_1.M_AdminMiddleware, cloudinary_1.upload.array('files', 5), HotelController_1.updateHotelController);
exports.router.delete('/delete-hotel', AdminMiddleware_1.M_AdminMiddleware, HotelController_1.deleteHotelController);
// ROOM ----------------------------------------------------------------------------------------
exports.router.get('/get-room/:hid', RoomController_1.getRoomController);
exports.router.get('/get-room/:hid/:rid', RoomController_1.getRoomController);
exports.router.post('add-room/:hid', AdminMiddleware_1.M_AdminMiddleware, RoomController_1.addRoomController);
exports.router.put('/update-room/:rid', AdminMiddleware_1.M_AdminMiddleware, RoomController_1.updateRoomController);
exports.router.delete('/delete-room/:rid', AdminMiddleware_1.M_AdminMiddleware, RoomController_1.deleteRoomController);
