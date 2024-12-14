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
exports.deleteRoomController = exports.updateRoomController = exports.addRoomController = exports.getRoomController = void 0;
const Schema_1 = require("../../models/Schema");
const ImageUploadHelper_1 = require("../Utils/ImageUploadHelper");
const getRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hid = req.params.hid;
        let hotel = yield Schema_1.Hotel.findById(hid);
        let rooms = hotel === null || hotel === void 0 ? void 0 : hotel.populate('rooms');
        return res.status(200).json({
            rooms
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        });
    }
});
exports.getRoomController = getRoomController;
const addRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hid = req.params.hid;
        let aid = req.adminId;
        let admin = yield Schema_1.Admin.findById(aid);
        if (!(admin === null || admin === void 0 ? void 0 : admin.hotels.includes(hid))) {
            return res.status(404).json({
                msg: "Hotel is not associated with the Admin"
            });
        }
        let hotel = yield Schema_1.Hotel.findById(hid);
        if (!hid) {
            return res.status(404).json({
                msg: "No Such hotel !"
            });
        }
        const { type, pricePerNight, capacity, amenities } = req.body;
        console.log(type, pricePerNight, capacity, amenities);
        if (!type || !pricePerNight || !capacity || !amenities) {
            return res.status(404).json({
                msg: "All Values Are NEcessaary !"
            });
        }
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
        Schema_1.Room.create({
            type, pricePerNight, capacity, isAvailable: true, amenities, images
        }).then((res1) => {
            Schema_1.Hotel.updateOne({ _id: hid }, { $push: { rooms: res1._id } }).then((res2) => {
                return res.status(200).json({
                    msg: "Room Added Succesfully !",
                    res1
                });
            });
        });
    }
    catch (error) {
        return res.status(501).json({
            msg: "Somthing went wrong !"
        });
    }
});
exports.addRoomController = addRoomController;
const updateRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rid = req.params.rid;
        const { type, pricePerNight, isAvailable, capacity, amenities } = req.body;
        let room = yield Schema_1.Room.findById(rid);
        if (!room) {
            return res.status(404).json({
                msg: "Room Not Found !"
            });
        }
        let images = room === null || room === void 0 ? void 0 : room.images;
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
        let updaetdRoom = yield Schema_1.Room.findByIdAndUpdate(rid, { type, pricePerNight, capacity, isAvailable, amenities, images });
        if (updaetdRoom) {
            return res.status(200).json({
                msg: "Room Updated Succesfully !"
            });
        }
        else {
            return res.status(200).json({
                msg: "Room Updation Failed !"
            });
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Somthing went wrong !"
        });
    }
});
exports.updateRoomController = updateRoomController;
const deleteRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rid = req.params.rid;
        let deletedRoom = yield Schema_1.Room.findByIdAndDelete(rid);
        console.log(deletedRoom);
        if (deletedRoom) {
            return res.status(200).json({
                msg: "Room Deleted Succesfully !"
            });
        }
        else
            return res.status(200).json({
                msg: "Room Deleted Failed !"
            });
    }
    catch (error) {
        console.log("error is : ", error);
        return res.status(501).json({
            msg: "Something Went Wrong !    "
        });
    }
});
exports.deleteRoomController = deleteRoomController;
