import express, { Request, RequestHandler, Response } from "express"
import { Admin, Hotel, Room } from "../../models/Schema";
import { imageUploadeHandler } from "../Utils/ImageUploadHelper";


export const getRoomController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let hid = req.params.hid;

        let hotel = await Hotel.findById(hid);
        let rooms = hotel?.populate('rooms');
        return res.status(200).json({
            rooms
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        })
    }
}

export const addRoomController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let hid = req.params.hid;
        let aid = req.adminId;

        let admin = await Admin.findById(aid);
        if (!admin?.hotels.includes(hid)) {
            return res.status(404).json({
                msg: "Hotel is not associated with the Admin"
            })
        }

        let hotel = await Hotel.findById(hid);
        if (!hid) {
            return res.status(404).json({
                msg: "No Such hotel !"
            })
        }

        const { type, pricePerNight, capacity, amenities } = req.body;
        console.log(type, pricePerNight, capacity, amenities);

        if (!type || !pricePerNight || !capacity || !amenities) {
            return res.status(404).json({
                msg: "All Values Are NEcessaary !"
            })
        }

        let images: string[] = [];
        // Correctly handle files from the request
        let files = req.files;

        console.log("Uploaded files: ", files);

        // If files exist, process them
        if (files && Array.isArray(files)) {  // Ensure files is an array
            console.log("Processing files...");

            let i = 1;
            // Loop through each file
            for (const file of files) {
                console.log("Processing file: ", i);

                // Upload file and get the URL
                const uploadedUrl = await imageUploadeHandler(file);
                if (uploadedUrl) {
                    console.log("Image URL added: ", i);
                    images.push(uploadedUrl);
                }
                i++;
            }
        } else if (files && !Array.isArray(files)) {
            // If files is not an array but a single object (handle cases where only one file is uploaded)
            console.log("Processing a single file...");

            const uploadedUrl = await imageUploadeHandler(files); // Cast to the correct type
            if (uploadedUrl) {
                images.push(uploadedUrl);
            }
        }

        Room.create({
            type, pricePerNight, capacity, isAvailable: true, amenities, images
        }).then((res1: any) => {
            Hotel.updateOne({ _id: hid }, { $push: { rooms: res1._id } }).then((res2) => {
                return res.status(200).json({
                    msg: "Room Added Succesfully !",
                    res1
                })
            })
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Somthing went wrong !"
        })
    }
}

export const updateRoomController: RequestHandler | any = async (req: Request, res: Response) => {
    try {

        let rid = req.params.rid

        const { type, pricePerNight, isAvailable, capacity, amenities } = req.body;

        let room = await Room.findById(rid);
        if (!room) {
            return res.status(404).json({
                msg: "Room Not Found !"
            })
        }
        let images: string[] | any = room?.images;
        // Correctly handle files from the request
        let files = req.files;

        console.log("Uploaded files: ", files);

        // If files exist, process them
        if (files && Array.isArray(files)) {  // Ensure files is an array
            console.log("Processing files...");

            let i = 1;
            // Loop through each file
            for (const file of files) {
                console.log("Processing file: ", i);

                // Upload file and get the URL
                const uploadedUrl = await imageUploadeHandler(file);
                if (uploadedUrl) {
                    console.log("Image URL added: ", i);
                    images.push(uploadedUrl);
                }
                i++;
            }
        } else if (files && !Array.isArray(files)) {
            // If files is not an array but a single object (handle cases where only one file is uploaded)
            console.log("Processing a single file...");

            const uploadedUrl = await imageUploadeHandler(files); // Cast to the correct type
            if (uploadedUrl) {
                images.push(uploadedUrl);
            }
        }

        let updaetdRoom = await Room.findByIdAndUpdate(rid, { type, pricePerNight, capacity, isAvailable, amenities, images })
        if (updaetdRoom) {
            return res.status(200).json({
                msg: "Room Updated Succesfully !"
            })
        }
        else {
            return res.status(200).json({
                msg: "Room Updation Failed !"
            })
        }
    }

    catch (error) {
        return res.status(501).json({
            msg: "Somthing went wrong !"
        })
    }

}

export const deleteRoomController: RequestHandler | any = async (req: Request, res: Response) => {
    try {

        let rid = req.params.rid;
        let deletedRoom = await Room.findByIdAndDelete(rid)
        console.log(deletedRoom);

        if (deletedRoom) {
            return res.status(200).json({
                msg: "Room Deleted Succesfully !"
            })
        }
        else return res.status(200).json({
            msg: "Room Deleted Failed !"
        })
    }
    catch (error) {
        console.log("error is : ", error);

        return res.status(501).json({
            msg: "Something Went Wrong !    "
        })
    }
}

