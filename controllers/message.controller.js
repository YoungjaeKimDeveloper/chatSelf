import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/Message.model.js";
import { User } from "../models/User.model.js";

export const getListUsers = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res
        .status(400)
        .json({ success: false, message: "FAILED TO FIND CURRENT USER" });
    }
    const users = await User.find({
      _id: { $ne: currentUser._id },
    }).select("-password");
    if (users.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE LISTOFOTHERS" });
    }
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.error("FAILED FROM 'getListUsers❌':", error.message);
    return res.status(500).json({ success: false, message: "INTERNAL ERROR" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const { id: partnerID } = req.params;
    const { text, image } = req.body;
    let imageUrl;
    if (!currentUserID) {
      return res
        .status(400)
        .json({ success: false, messsage: "currentUserID IS NOT EXISTED ❌" });
    }
    if (!partnerID) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE PARTNER ID ❌" });
    }
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }
    const newMessage = await Message.create({
      senderID: currentUserID,
      receiverID: partnerID,
      text: text,
      image: imageUrl,
    });
    console.info("MESSAGE HAS SENT SUCCESSFULLY");
    return res.status(201).json({ success: true, newMessage: newMessage });
  } catch (error) {
    console.error("FAILED FROM 'sendMessage❌':", error.message);
    return res.status(500).json({ success: false, message: "INTERNAL ERROR" });
  }
};

export const getConversatio = async (req, res) => {
  try {
    const currentUser = req.user._id;
    if (!currentUser) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE CURRENT ID ❌" });
    }

    const { id: partnerID } = req.params;
    if (!partnerID) {
      if (!currentUser) {
        return res
          .status(400)
          .json({ success: false, message: "CANNOT FIND THE partnerID ID ❌" });
      }
    }

    const conversation = await Message.find({
      $or: [
        { senderID: currentUser, receiverID: partnerID },
        { senderID: partnerID, receiverID: currentUser },
      ],
    });
    if (conversation.length === 0) {
      return res.status(200).json({ message: "THERE IS NO CONVERSATION YET" });
    }
    return res.status(200).json({ success: true, conversation });
  } catch (error) {
    console.error("FAILED FROM 'getConversatio ❌':", error.message);
    return res.status(500).json({ success: false, message: "INTERNAL ERROR" });
  }
};
