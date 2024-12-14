import { Request, Response, RequestHandler } from "express"
import { User } from "../../models/Schema";
import { OTP } from "../../services/Otp/Otp";
import jwt from "jsonwebtoken"
import { sendOTP } from "../../services/Email/email";
import { SECRETE_KEY } from "../../config/dotenv";

export const getUserOtpController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone } = req.body;
        let otpInstance = OTP.getInstance();
        let generatedOtp: string | any = await otpInstance?.generateOTP(email);
        await sendOTP(email, generatedOtp);
        return res.status(200).json({
            msg: "Otp Sent Succesfully !"
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        })
    }
}

export const verifyUserOtpController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        const { name, email, password, phone, otp } = req.body;
        if (!email || !name || !password || !phone || !otp) {
            return res.status(404).json({
                msg: "All Values Are Necessary !"
            })
        }
        let otpInstance = OTP.getInstance();

        if (otpInstance?.validateOtp(email, otp)) {
            let newUser = await User.create({
                name: name,
                email: email,
                password: password,
                phone: phone,
                bookings: [],
                profilePicture: "#"
            })
            let token = jwt.sign({ uid: newUser._id }, SECRETE_KEY)
            res.cookie('token', token);
            return res.status(200).json({
                msg: " User Account created Succesfully !"
            })
        }
        else {
            return res.status(501).json({
                msg: " Invalid OTP !"
            })
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something Went Wrong !"
        })
    }
}

export const userLoginController: RequestHandler | any = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        User.findOne({ email: email }).then((res1) => {
            if (res1 != null) {
                if (res1.password == password) {
                    let token = jwt.sign({ uid: res1._id }, SECRETE_KEY)
                    res.cookie('token', token);
                    return res.status(200).json({
                        msg: " Login Successfull !"
                    })
                }
                else {
                    return res.status(501).json({
                        msg: "Password Mismatch !"
                    })
                }
            }
            else {
                return res.status(404).json({
                    msg: "Account Not Found !"
                })
            }
        })
    }
    catch (error) {
        return res.status(501).json({
            msg: "Something went wrong !"
        })
    }
}

