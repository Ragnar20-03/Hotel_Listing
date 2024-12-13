import { Response, NextFunction, Request, RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { SECRETE_KEY } from "../config/dotenv";
import { Admin } from "../models/Schema";

interface jwtPayload {
    aid: string | any,
    iat: number;
}
export const M_AdminMiddleware: RequestHandler | any = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token'];
        if (!token) {
            return res.status(401).json({
                msg: "Unauthorized Request",
            });
        }

        const verifiedToken = jwt.verify(token, SECRETE_KEY) as jwtPayload;
        if (verifiedToken && verifiedToken.aid) {
            console.log("Verified Token is:", verifiedToken);
            Admin.findOne({ _id: verifiedToken.aid }).then((res1) => {
                if (res1 != null) {
                    req.adminId = verifiedToken.aid;
                    return next(); // Pass control to the next middleware/controller
                    console.log('here');

                }
                return res.status(501).json({
                    msg: "Unauthorized Request | Admin Not Found "
                })
            })
        } else {
            return res.status(401).json({
                msg: "Unauthorized Request: Invalid token",
            });
        }
    } catch (error) {
        console.error("Error in M_AdminMiddleware:", error);
        return res.status(401).json({
            msg: "Unauthorized Request: Token verification failed",
        });
    }
};
