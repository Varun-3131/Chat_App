import express from 'express';
import dotenv from "dotenv";
import {connectDb} from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import {app,server} from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


server.listen(PORT, () => {
    console.log('Server started on port-'+ PORT);
    connectDb()

})


app.use("/api/auth",authRoutes)

app.use("/api/messages",messageRoutes)


