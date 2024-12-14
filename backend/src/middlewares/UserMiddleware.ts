import { Request, Response, RequestHandler, NextFunction } from "express"
import jwt from "jsonwebtoken";
import { SECRETE_KEY } from "../config/dotenv";
import { User } from "../models/Schema";

interface jwtPayload {
    uid: string | any,
    iat: number;
}
export const M_UserMiddleware: RequestHandler | any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies['token'];
        if (!token) {
            return res.status(501).json({
                msg: "Unauthorized Request !"
            })
        }
        let verifiedToken = jwt.verify(token, SECRETE_KEY) as jwtPayload;
        if (!verifiedToken) {
            return res.status(501).json({
                msg: "Unauthorized Request !"
            })
        }
        else {
            req.userId = verifiedToken.uid
            let user = await User.findById(verifiedToken.uid);
            if (!user) {
                return res.status(501).json({
                    msg: "Unauthorized Request !"
                })
            }
            else {
                return next();
            }
        }
    }
    catch (error) {
        return res.status(501).json({
            msg: "Unauthorized Request "
        })
    }
}