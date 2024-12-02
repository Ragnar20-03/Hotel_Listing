import nodemailer from "nodemailer"

nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "username",
        pass: "userpass"
    }
})