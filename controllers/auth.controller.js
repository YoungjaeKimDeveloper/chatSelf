import { generateToken } from "../lib/authToken.js";
import { User } from "../models/User.model.js";

export const signup = async (req, res) => {
  console.log("FUNCITON CALL");
  // Model 에 맞게 정보 받고
  // auth 맞는 경우 Token 발행해주기
  // 회원가입 기능
  try {
    const { email, fullName, password } = req.body;
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "PLEASE Fill up the all forms" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "PASSWORD SHOULD BE AT LEAST 6 Letters",
      });
    }
    const existedEmailUser = await User.findOne({ email: email });
    if (existedEmailUser) {
      return res
        .status(409)
        .json({ success: false, message: "USE THE OTHER EMAIL" });
    }
    const newUser = new User({ email, fullName, password });
    const token = await generateToken(newUser._id, res);
    console.log("TOKEN: ", token);
    await newUser.save();

    return res.status(201).json({ success: true, newUser: newUser });
  } catch (error) {
    console.log("Failed to sign up", error.message);
    return res.status(400).json({ success: false, error: error.message });
  }
};
export const login = async () => {
  try {
  } catch (error) {}
};

export const logout = async () => {
  try {
  } catch (error) {}
};
