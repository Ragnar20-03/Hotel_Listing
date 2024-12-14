import { Request, Response, RequestHandler } from "express"
import { Review } from "../../models/Schema";
import mongoose from "mongoose";

export const addReviewController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let uid = req.userId;
        let hid = req.params.hid;

        const { rating, comment } = req.body;

        if (!rating || !comment) {
            return res.status(501).json({
                msg: "All Values Are Necessary !"
            })
        }
        let createReivew = await Review.create({ rating: rating, comment: comment, user: new mongoose.Types.ObjectId(uid), hotel: new mongoose.Types.ObjectId(hid) })

        if (createReivew) {
            return res.status(200).json({
                msg: " Review Added Succesfully !"
            })
        }
        else {
            return res.status(501).json({
                msg: " Review Added Failed !"
            })
        }

    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        })
    }
}

export const getReviewController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let hid = req.params.hid;
        let reviews = await Review.find({ hotel: hid })
        return res.status(200).json({
            reviews
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        })
    }
}