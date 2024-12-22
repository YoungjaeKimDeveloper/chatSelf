import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING in ${PORT}`);
  connectDB();
});
