import { Request, RequestHandler, Response } from "express"
import { OTP } from "../../services/Otp/Otp";
import { sendOTP } from "../../services/Email/email";
import { Admin } from "../../models/Schema";
import { uploadImage } from "../../services/Cloudinary/cloudinary";

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
        // if (!isValidOtp) {
        //     return res.status(400).json({ msg: "Invalid OTP!" });
        // }

        if (req.file) {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: "Only image files (JPEG, PNG, GIF, WebP) are allowed!" });
            }

            // Generate a unique public ID using the profile name and current timestamp
            const publicId = `avatar__${Date.now()}`;

            // Upload the new avatar to cloud storage
            const uploadResult = await uploadImage(req.file.buffer, publicId);

            // Delete the previous avatar from cloud storage if it exists
            // if (prevAvatar) {
            //     const prevPublicId = prevAvatar.split('/').pop()?.split('.')[0];
            //     if (prevPublicId) {
            //         await removeAvatar(prevPublicId); // Remove previous avatar from cloud storage
            //     }
            // } 
            const newAdmin = await Admin.create({ name, email, password, phone });
            return res.status(200).json({
                msg: "Admin Created Successfully!",
                url: uploadResult.secure_url,
                admin: newAdmin, // optional
            });
        }



        // Create Admin
        const newAdmin = await Admin.create({ name, email, password, phone });
        return res.status(200).json({
            msg: "Admin Created Successfully!",
            admin: newAdmin, // optional
        });
    } catch (err) {
        console.error("Error in verifyOtpController:", err);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
};


export const adminLoginController = async (req: Request, res: Response) => {

}

export const addMangerController = async (req: Request, res: Response) => {

}
export const updateManagerController = async (req: Request, res: Response) => {

}

