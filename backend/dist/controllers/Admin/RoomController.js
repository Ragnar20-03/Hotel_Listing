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
const getRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.getRoomController = getRoomController;
const addRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ msg: "Success" });
});
exports.addRoomController = addRoomController;
const updateRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.updateRoomController = updateRoomController;
const deleteRoomController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteRoomController = deleteRoomController;
