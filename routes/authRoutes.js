import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
const router = express.Router();
// 회원가입
// 설명 : Document에 새로운 Documentation 만들어주기
// TOKEN 같이 보내서 Auth해주기
router.post("/signup", signup);
// 로그인
// TOKEN 같이 보내서 Auth해주기
router.post("/login", login);
// 로그아웃
// Token 지워주기
router.post("/logout", logout);

export default router;
