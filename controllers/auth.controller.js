import { generateToken } from "../lib/authToken.js";
import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
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
        .json({ success: false, message: "DUPLICATED EMAIL" });
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
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "PLEASE FILL UP THE ALL FORMS" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      console.error("CAN'T FIND THE USER WITH EMAIL");
      return res
        .status(400)
        .json({ success: false, message: "INVALID CREDENTIAL" });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res
        .status(400)
        .json({ success: false, message: "INVALID CREDENTIAL" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      success: true,
      email,
      fullName: user.fullName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Failed in Loggin", error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: "0",
    });
    console.log("LOGOUT");
    return res
      .status(200)
      .json({ success: true, message: "LOGOUT SUCCESSFULLY" });
  } catch (error) {
    console.log("FAILED TO LOGOUT");
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(400).json({ message: "USER IS NOT VERIFIED" });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const user = await User.findById(currentUserID);

  } catch (error) {}
};


// 설명 : 11:30 ProFileUpdate funciton 만들던 도중 뇌 뽀재짐 // put이랑 cloudinary 합쳐서 profile image update 해주고 나서 프론트개발 시작해야함