"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotelController = exports.updateHotelController = exports.addHotelController = exports.getHotelControllerById = exports.getHotelController = void 0;
const Schema_1 = require("../../models/Schema");
const ImageUploadHelper_1 = require("../Utils/ImageUploadHelper");
const getHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let aid = req.adminId;
        let hotels = yield Schema_1.Admin.findById(aid).populate('hotels');
        return res.status(200).json({
            hotels
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        });
    }
});
exports.getHotelController = getHotelController;
const getHotelControllerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let aid = req.adminId;
        let hid = req.params.hid;
        let admin = yield Schema_1.Admin.findById(aid);
        if (admin) {
            if (admin.hotels.includes(hid)) {
                let hotel = yield Schema_1.Hotel.findById(hid);
                return res.status(200).json({
                    hotel
                });
            }
            else {
                return res.status(404).json({
                    msg: "Hotel is not associated with admin"
                });
            }
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        });
    }
});
exports.getHotelControllerById = getHotelControllerById;
const addHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract values from request body
        let adminId = req.adminId;
        const { name, location, description, amenities, policies, contactInfo, ratings } = req.body;
        console.log("Request body is: ", name, location, description, amenities, policies, contactInfo, ratings);
        // Initialize images array
        let images = [];
        // Correctly handle files from the request
        let files = req.files;
        console.log("Uploaded files: ", files);
        // If files exist, process them
        if (files && Array.isArray(files)) { // Ensure files is an array
            console.log("Processing files...");
            let i = 1;
            // Loop through each file
            for (const file of files) {
                console.log("Processing file: ", i);
                // Upload file and get the URL
                const uploadedUrl = yield (0, ImageUploadHelper_1.imageUploadeHandler)(file);
                if (uploadedUrl) {
                    console.log("Image URL added: ", i);
                    images.push(uploadedUrl);
                }
                i++;
            }
        }
        else if (files && !Array.isArray(files)) {
            // If files is not an array but a single object (handle cases where only one file is uploaded)
            console.log("Processing a single file...");
            const uploadedUrl = yield (0, ImageUploadHelper_1.imageUploadeHandler)(files); // Cast to the correct type
            if (uploadedUrl) {
                images.push(uploadedUrl);
            }
        }
        // Create the new hotel
        let addHotel = yield Schema_1.Hotel.create({
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
            yield Schema_1.Admin.findByIdAndUpdate(adminId, {
                $push: { hotels: addHotel._id }
            });
            console.log("hotel pushed to admin : ");
            return res.status(200).json({
                msg: "Hotel Added Successfully!",
                hotel: addHotel
            });
        }
        else {
            return res.status(500).json({
                msg: "Failed to add hotel, please try again."
            });
        }
    }
    catch (error) {
        console.error("Error adding hotel: ", error);
        return res.status(500).json({
            msg: "Internal Server Error",
        });
    }
});
exports.addHotelController = addHotelController;
const updateHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let adminId = req.adminId;
        let hotelId = req.params.hid;
        console.log("hotel id is : ", hotelId);
        let admin = yield Schema_1.Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({
                msg: "Admin Not Found !"
            });
        }
        let isHotelAssociated = admin.hotels.includes(hotelId);
        console.log("iassociated id is : ", isHotelAssociated);
        if (!isHotelAssociated) {
            return res.status(501).json({
                msg: "UnAuthorized Request ! | Hotel is not associated with the admin "
            });
        }
        const { name, location, description, amenities, policies, contactInfo, ratings } = req.body;
        let images = admin.hotels;
        // Correctly handle files from the request
        let files = req.files;
        // If files exist, process them
        if (files && Array.isArray(files)) { // Ensure files is an array
            let i = 1;
            // Loop through each file
            for (const file of files) {
                console.log("Processing file: ", i);
                // Upload file and get the URL
                const uploadedUrl = yield (0, ImageUploadHelper_1.imageUploadeHandler)(file);
                if (uploadedUrl) {
                    console.log("Image URL added: ", i);
                    images.push(uploadedUrl);
                }
                i++;
            }
        }
        else if (files && !Array.isArray(files)) {
            // If files is not an array but a single object (handle cases where only one file is uploaded)
            console.log("Processing a single file...");
            const uploadedUrl = yield (0, ImageUploadHelper_1.imageUploadeHandler)(files); // Cast to the correct type
            if (uploadedUrl) {
                images.push(uploadedUrl);
            }
        }
        // Create the new hotel
        let updateHotel = yield Schema_1.Hotel.findByIdAndUpdate(hotelId, {
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
        }
        else {
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
});
exports.updateHotelController = updateHotelController;
const deleteHotelController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hid = req.params.hid;
        let aid = req.adminId;
        let admin = yield Schema_1.Admin.findById(aid);
        if (admin === null || admin === void 0 ? void 0 : admin.hotels.includes(hid)) {
            let deletedHotel = yield Schema_1.Hotel.findByIdAndDelete(hid);
            return res.status(200).json({
                deletedHotel
            });
        }
        else {
            return res.status(501).json({
                msg: "Hotel is not associated with Admin "
            });
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: " Something Went Wrong !"
        });
    }
});
exports.deleteHotelController = deleteHotelController;
