import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_Cloud_NAME,
  api_key: process.env.CLOUDINARY_Cloud_KEY,
  api_secret: process.env.CLOUDINARY_Cloud_API_SECRET,
});

export default cloudinary;