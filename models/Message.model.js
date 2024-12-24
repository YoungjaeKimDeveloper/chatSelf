import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
