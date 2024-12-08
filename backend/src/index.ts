import express, { Request, Response } from 'express'
import { router as AdminRouter } from "./routes/Admin"
import { ConnectDB } from './config/db';
import { PORT } from './config/dotenv';
import { cloudinary_start } from './config/cloudinary';

const app = express();
app.use(express.json());
app.use('/api/v1/admin', AdminRouter);

app.get('/', async (req: Request, res: Response) => {
    console.log("reqched !");

    res.status(200).json({
        msg: "Welcome to backend !"
    })
})

app.listen(PORT, async () => {
    console.log("Jay Ganesh !", PORT);
    await cloudinary_start()
    await ConnectDB();
})