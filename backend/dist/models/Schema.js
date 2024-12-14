"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Room = exports.Hotel = exports.User = exports.Booking = exports.Review = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AdminSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    profilePicture: { type: String },
    url: String,
    hotels: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Hotel' }],
}, { timestamps: true });
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    role: { type: String }, // enum: ['user', 'admin', 'manager'], default: 'user' },
    profilePicture: { type: String },
    bookings: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Booking' }],
}, { timestamps: true });
const HotelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    amenities: [{ type: String }],
    policies: { type: String },
    contactInfo: { type: String },
    images: [{ type: String }], // URLs of images
    rooms: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Room' }],
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
}, { timestamps: true });
const RoomSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    isAvailable: Boolean,
    amenities: [{ type: String }],
    images: [{ type: String }],
}, { timestamps: true });
const BookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });
const ReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: [{ type: String, required: true }],
}, { timestamps: true });
exports.Review = mongoose_1.default.model('Review', ReviewSchema);
exports.Booking = mongoose_1.default.model('Booking', BookingSchema);
exports.User = mongoose_1.default.model('User', UserSchema);
exports.Hotel = mongoose_1.default.model('Hotel', HotelSchema);
exports.Room = mongoose_1.default.model('Room', RoomSchema);
exports.Admin = mongoose_1.default.model('Admin', AdminSchema);
