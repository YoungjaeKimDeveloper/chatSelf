import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING in ${PORT}`);
  connectDB();
});
