import { Request, RequestHandler, Response } from "express";
import { Hotel } from "../../models/Schema";

export const getUserHotelController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let hotels = await Hotel.find({});
        return res.status(200).json({
            hotels
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        })
    }
}
export const getUserHotelByIdController: RequestHandler | any = async (req: Request, res: Response) => {
    let hid = req.params.hid;
    try {
        let hotel = await Hotel.findById(hid);
        return res.status(200).json({
            hotel
        })
    } catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        })
    }
}
