import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getListUsers,
  sendMessage,
  getConversatio,
} from "../controllers/message.controller.js";
const router = express.Router();

router.get("/getListUsers", verifyToken, getListUsers);
// Send message
router.post("/send/:id", verifyToken, sendMessage);
// Get Conversation
router.get("/getConversation/:id", verifyToken, getConversatio);
export default router;
