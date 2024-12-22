import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DATA CONNECTED✅");
  } catch (error) {
    console.log("FAILED TO CONNECT DB❌ :", error.message);
  }
};
