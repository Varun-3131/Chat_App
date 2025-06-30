import express from 'express';
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import {connectDb} from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();


const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log('Server started on port-'+ PORT);
    connectDb()

})


app.use("/api/auth",authRoutes)


