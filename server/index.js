import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config({});
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/api/user", userRoutes);
app.use("/api", storyRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));