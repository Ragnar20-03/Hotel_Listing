import { Request, Response, RequestHandler } from 'express'
import { Booking, Hotel, Room } from '../../models/Schema';
import mongoose from 'mongoose';


export const bookUserRoomController: RequestHandler | any = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let hid = req.params.hid;
        let rid = req.params.rid;
        let uid = req.userId;
        console.log("uid is : ", uid);

        let hotel = await Hotel.findById(hid).session(session);
        if (!hotel?.rooms.includes(new mongoose.Types.ObjectId(rid))) {
            return res.status(501).json({
                msg: "Room is not associated with the Hotel"
            });
        }

        let room = await Room.findById(rid).session(session);
        if (!room) {
            return res.status(501).json({
                msg: "No Such Room !"
            });
        }

        room.isAvailable = false;
        // Payment API 
        await room.save({ session });

        const { checkIn, checkOut, guests, totalPrice } = req.body;
        if (!checkIn || !checkOut || !guests || !totalPrice) {
            return res.status(404).json({
                msg: "All Values are Necessary !"
            });
        }

        const booking = await Booking.create([{

            checkIn: checkIn,
            checkOut: checkOut,
            guests: guests,
            totalPrice: totalPrice,
            paymentStatus: "completed",
            user: new mongoose.Types.ObjectId(uid),
            hotel: new mongoose.Types.ObjectId(hid),
            room: new mongoose.Types.ObjectId(rid)
        }], { session });

        await session.commitTransaction();
        res.status(201).json(booking);
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({ msg: 'Error processing booking' });
    } finally {
        session.endSession();
    }
};

export const cancelUserBookingController: RequestHandler | any = async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        let bid = req.params.bid;

        const booking = await Booking.findByIdAndUpdate(bid, { paymentStatus: 'cancelled' }, { session, new: true }); // get updated document

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Update room availability (optional):
        const room = await Room.findById(booking.room).session(session);
        if (room) {
            room.isAvailable = true;
            await room.save({ session });
        }

        await session.commitTransaction();
        res.status(200).json(booking);
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({ msg: 'Error canceling booking' });
    } finally {
        session.endSession();
    }
};