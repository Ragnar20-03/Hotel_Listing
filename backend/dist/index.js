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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Admin_1 = require("./routes/Admin");
const User_1 = require("./routes/User");
const db_1 = require("./config/db");
const dotenv_1 = require("./config/dotenv");
const cloudinary_1 = require("./config/cloudinary");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true'); // Explicitly allow credentials
    next();
});
app.use((0, cors_1.default)({
    origin: true, // Dynamically allow all origins
    credentials: true, // Allow cookies to be sent
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/admin', Admin_1.router);
app.use('/api/v1/user', User_1.router);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reqched !");
    res.status(200).json({
        msg: "Welcome to backend !"
    });
}));
app.listen(dotenv_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Jay Ganesh !", dotenv_1.PORT);
    yield (0, cloudinary_1.cloudinary_start)();
    yield (0, db_1.ConnectDB)();
}));
