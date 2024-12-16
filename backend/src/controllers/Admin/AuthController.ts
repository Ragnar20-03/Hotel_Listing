import { Request, RequestHandler, Response } from "express"
import { OTP } from "../../services/Otp/Otp";
import { sendOTP } from "../../services/Email/email";
import { Admin } from "../../models/Schema";
import { uploadImage } from "../../services/Cloudinary/cloudinary";
import { imageUploadeHandler } from "../Utils/ImageUploadHelper";
import jwt from "jsonwebtoken"
import { SECRETE_KEY } from "../../config/dotenv";

export const getOtpController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("Email :  ", email);
    console.log("password :  ", password);
    const optInstance = OTP.getInstance();
    const generatedOtp = await optInstance?.generateOTP(email) || "";
    await sendOTP(email, generatedOtp);
    res.status(200).json({
        msg: "OTP Sent Succesfully !"
    })

}

export const verifyOtpController: RequestHandler = async (req, res): Promise<any> => {
    try {
        const { name, phone, email, password, otp } = req.body;

        // Validate OTP
        const otpInstance = OTP.getInstance();
        if (!otpInstance) {
            return res.status(500).json({ msg: "OTP service unavailable." });
        }

        const isValidOtp = otpInstance.validateOtp(email, otp);
        if (!isValidOtp) {
            return res.status(400).json({ msg: "Invalid OTP!" });
        }

        if (req.file) {
            let uploadurl = await imageUploadeHandler(req.file);
            const newAdmin = await Admin.create({ name, email, password, phone, url: uploadurl });
            return res.status(200).json({
                msg: "Admin Created Successfully!",
                url: uploadurl,
                admin: newAdmin, // optional
            });
        }

        // Create Admin
        const newAdmin = await Admin.create({ name, email, password, phone, url: "#" });
        if (newAdmin) {
            let token = jwt.sign({ aid: newAdmin.__v }, SECRETE_KEY)
            res.cookie("token", token, {
                httpOnly: true,          // Prevents client-side access to the cookie
                secure: true,            // Ensures cookie is only sent over HTTPS
                sameSite: "none",        // Required for cross-origin requests
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            });
            return res.status(200).json({
                msg: "Admin Created Successfully!",
                admin: newAdmin, // optional
            });
        }
        else {
            return res.status(501).json({
                msg: "Admin Created Failed!",
            });
        }
    } catch (err) {
        console.error("Error in verifyOtpController:", err);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
};


export const adminLoginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("email is : ", email);

    Admin.findOne({ email: email }).then((res1) => {
        console.log("res1 : ", res1);

        if (res1 != null) {
            if (res1.password == password) {
                let token = jwt.sign({ aid: res1._id }, SECRETE_KEY)
                res.cookie("token", token, {
                    httpOnly: false,          // Prevents client-side access to the cookie
                    secure: true,            // Ensures cookie is only sent over HTTPS
                    sameSite: "lax",        // Required for cross-origin requests
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                });
                console.log("cookie sent to broeswer succesfully !", token);

                return res.status(200).json({
                    msg: "Login Succesfull !"
                })
            }
            else {
                return res.status(501).json({
                    msg: "Password Mismatch !"
                })
            }
        }
        return res.status(404).json({
            msg: "Account Not Found , Please Register !"
        })
    })
}

export const addMangerController = async (req: Request, res: Response) => {

}
export const updateManagerController = async (req: Request, res: Response) => {

}

