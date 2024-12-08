import mongoose from "mongoose";
import { DB_URL } from "./dotenv";

export const ConnectDB = async () => {
    mongoose.connect(DB_URL).then((res) => {
        console.log("Database Connected Succefully ! ");
        return true;
    }).catch((error) => {
        console.log("Error IN Database Connecting !");
        return false;
    })
}