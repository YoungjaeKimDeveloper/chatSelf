import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      console.error("TOKEN IS NOT EXISTED");
      return res
        .status(400)
        .json({ success: false, message: "TOKEN IS NOT EXISTED" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      console.error("FAILED TO DECODE TOKEN");
      return res
        .status(400)
        .json({ success: false, message: "FAILED TO DECODED" });
    }
    const user = await User.findById({ _id: decoded.id }).select("-password");
    if (!user) {
      console.error("CANNOT FIND THE USER");
      return res
        .status(400)
        .json({ success: false, message: "FAILED TO FIND DECODED USER" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("ERROR IN verifyToken FUNCTION", error.message);
    return res
      .status(500)
      .json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};
