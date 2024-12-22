import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
// Schema에서 Password 바꿔주는 로직 넣어주기
// 화살표함수에서는 this 키워드 못씀
UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    console.log("FAILED TO HASH PASSWORD", error.message);
    next(error);
  }
});

export const User = mongoose.model("User", UserSchema);
