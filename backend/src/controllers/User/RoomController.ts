import { Request, RequestHandler, Response } from "express";
import { Hotel } from "../../models/Schema";

export const getUserHotelRoomController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        const { hid } = req.params;

        // Find the hotel by ID
        const hotel = await Hotel.findById(hid);
        if (!hotel) {
            return res.status(404).json({
                msg: "No Such Hotel!"
            });
        }

        // Populate the rooms associated with the hotel
        const populatedHotel = await hotel.populate('rooms');

        // Check if the hotel has rooms
        const rooms = populatedHotel.rooms || [];
        return res.status(200).json({
            success: true,
            hotel: {
                id: hotel._id,
                name: hotel.name, // Include any other hotel details you'd like to return
            },
            rooms,
        });
    } catch (error) {
        console.error("Error fetching hotel rooms:", error);
        return res.status(500).json({
            msg: "Something Went Wrong",

        });
    }
};

export const getUserHotelRoomByIdController: RequestHandler | any = async (req: Request, res: Response) => {

}