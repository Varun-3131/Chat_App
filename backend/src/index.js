import express from 'express';
import dotenv from "dotenv";
import {connectDb} from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();


const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}));


app.listen(PORT, () => {
    console.log('Server started on port-'+ PORT);
    connectDb()

})


app.use("/api/auth",authRoutes)

app.use("/api/message",messageRoutes)


