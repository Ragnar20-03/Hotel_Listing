import mongoose, { Schema, Document } from 'mongoose';


interface IAdmin extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profilePicture?: string;
    hotels: string[]
}
const AdminSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        profilePicture: { type: String },
        url: String,
        hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }],

    },
    { timestamps: true }
);


interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    profilePicture?: string;
    bookings: mongoose.Types.ObjectId[]; // References to Booking
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        role: { type: String },// enum: ['user', 'admin', 'manager'], default: 'user' },
        profilePicture: { type: String },
        bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    },
    { timestamps: true }
);

interface IHotel extends Document {
    name: string;
    location: string;
    description: string;
    amenities: string[];
    policies: string;
    contactInfo: string;
    images: string[];
    rooms: mongoose.Types.ObjectId[]; // References to Room
    ratings: {
        average: number;
        count: number;
    };
}

const HotelSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        description: { type: String, required: true },
        amenities: [{ type: String }],
        policies: { type: String },
        contactInfo: { type: String },
        images: [{ type: String }], // URLs of images
        rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
        ratings: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);

interface IRoom extends Document {
    // hotel: mongoose.Types.ObjectId; // Reference to Hotel
    type: string; // E.g., "Single", "Double", "Suite"
    pricePerNight: number;
    capacity: number; // Max number of people
    // availability: {
    //     startDate: Date;
    //     endDate: Date;
    // }[];
    isAvailable: boolean,
    amenities: string[];
    images: string[];
}

const RoomSchema: Schema = new Schema(
    {
        type: { type: String, required: true },
        pricePerNight: { type: Number, required: true },
        capacity: { type: Number, required: true },
        isAvailable: Boolean,
        amenities: [{ type: String }],
        images: [{ type: String }],
    },
    { timestamps: true }
);

interface IBooking extends Document {
    user: mongoose.Types.ObjectId; // Reference to User
    hotel: mongoose.Types.ObjectId; // Reference to Hotel
    room: mongoose.Types.ObjectId; // Reference to Room
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    paymentStatus: 'pending' | 'completed' | 'cancelled';
}

const BookingSchema: Schema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
        room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        guests: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true }
);
interface IReview extends Document {
    user: mongoose.Types.ObjectId; // Reference to User
    hotel: mongoose.Types.ObjectId; // Reference to Hotel
    rating: number; // 1-5
    comment: string[];
}

const ReviewSchema: Schema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: [{ type: String, required: true }],
    },
    { timestamps: true }
);




export const Review = mongoose.model<IReview>('Review', ReviewSchema);
export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
export const User = mongoose.model<IUser>('User', UserSchema);
export const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema);
export const Room = mongoose.model<IRoom>('Room', RoomSchema)
export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema)


