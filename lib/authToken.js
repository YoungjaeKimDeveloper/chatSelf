// JWT Payload,SecretKey 넣고 만들어주기
import jwt from "jsonwebtoken";

export const generateToken = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    // Client Cookie엔아 넣어주기
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, //MS
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development",
    });
    return token;
  } catch (error) {
    console.log("ERROR IN CREATING TOKEN", error.message);
    return res.status(400).json({ message: "FAILED TO GENERATE TOKEN" });
  }
};
