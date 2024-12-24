import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  profileUpdate,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
// 회원가입
// 설명 : Document에 새로운 Documentation 만들어주기
// TOKEN 같이 보내서 Auth해주기
router.post("/signup", signup);
// 로그인
// TOKEN 같이 보내서 Auth해주기
router.post("/login", login);
// 프로파일 업데이트 해주기
router.put("/profile", verifyToken, profileUpdate);

// 로그아웃
// Token 지워주기
router.post("/logout", logout);

router.get("/", verifyToken, checkAuth);
export default router;
