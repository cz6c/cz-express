import express from "express";
import { body } from "express-validator";
import AuthController from "../../controllers/auth";

const router = express.Router();

// 登录参数校验
const vaildator = [
  body("username").isString().withMessage("用户名必传"),
  body("password").isLength({ min: 6 }).withMessage("密码类型错误"),
];

router.post("/login", vaildator, AuthController.login);

export default router;
