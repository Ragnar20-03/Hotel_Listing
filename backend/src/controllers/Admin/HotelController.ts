import express, { Request, RequestHandler, Response } from "express"
import { Admin, Hotel } from "../../models/Schema";
import { imageUploadeHandler } from "../Utils/ImageUploadHelper";
import mongoose from "mongoose";


export const getHotelController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let aid = req.adminId;
        let hotels = await Admin.findById(aid).populate('hotels')
        return res.status(200).json({
            hotels
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        })
    }
}

export const getHotelControllerById: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let aid = req.adminId;
        let hid = req.params.hid;
        let admin = await Admin.findById(aid);
        if (admin) {
            if (admin.hotels.includes(hid)) {
                let hotel = await Hotel.findById(hid);
                return res.status(200).json({
                    hotel
                })
            }
            else {
                return res.status(404).json({
                    msg: "Hotel is not associated with admin"
                })
            }
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        })
    }
}

export const addHotelController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        // Extract values from request body
        let adminId = req.adminId;
        const { name, location, description, amenities, policies, contactInfo, ratings } = req.body;
        console.log("Request body is: ", name, location, description, amenities, policies, contactInfo, ratings);

        // Initialize images array
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

        // Create the new hotel
        let addHotel = await Hotel.create({
            name,
            location,
            description,
            amenities,
            policies,
            contactInfo,
            images,
            rooms: [], // If rooms need to be processed, ensure this is handled in the form
            ratings
        });

        // Return response if hotel is created successfully
        if (addHotel) {
            await Admin.findByIdAndUpdate(adminId, {
                $push: { hotels: addHotel._id }
            })
            console.log("hotel pushed to admin : ");

            return res.status(200).json({
                msg: "Hotel Added Successfully!",
                hotel: addHotel
            });
        } else {
            return res.status(500).json({
                msg: "Failed to add hotel, please try again."
            });
        }

    } catch (error) {
        console.error("Error adding hotel: ", error);
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

export const updateHotelController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let adminId = req.adminId;
        let hotelId: string | mongoose.Types.ObjectId | any = req.params.hid;
        console.log("hotel id is : ", hotelId);

        let admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({
                msg: "Admin Not Found !"
            })
        }

        let isHotelAssociated = admin.hotels.includes(hotelId);
        console.log("iassociated id is : ", isHotelAssociated);


        if (!isHotelAssociated) {
            return res.status(501).json({
                msg: "UnAuthorized Request ! | Hotel is not associated with the admin "
            })
        }

        const { name, location, description, amenities, policies, contactInfo, ratings } = req.body;

        let images: string[] = admin.hotels;
        // Correctly handle files from the request
        let files = req.files;


        // If files exist, process them
        if (files && Array.isArray(files)) {  // Ensure files is an array

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

        // Create the new hotel
        let updateHotel = await Hotel.findByIdAndUpdate(hotelId, {
            name,
            location,
            description,
            amenities,
            policies,
            contactInfo,
            images,
            ratings
        });

        // Return response if hotel is created successfully
        if (updateHotel) {
            return res.status(200).json({
                msg: "Hotel Updared Successfully!",
                hotel: updateHotel
            });
        } else {
            return res.status(500).json({
                msg: "Failed to Update hotel, please try again."
            });
        }
    }
    catch (error) {
        console.error("Error adding hotel: ", error);
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
}

export const deleteHotelController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        let hid = req.params.hid;
        let aid = req.adminId;
        let admin = await Admin.findById(aid);
        if (admin?.hotels.includes(hid)) {
            let deletedHotel = await Hotel.findByIdAndDelete(hid);
            return res.status(200).json({
                deletedHotel
            })
        }
        else {
            return res.status(501).json({
                msg: "Hotel is not associated with Admin "
            })
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: " Something Went Wrong !"
        })
    }
}

