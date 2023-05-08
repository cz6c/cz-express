import express from "express";
import AuthController from "../../controllers/auth";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [body("username").notEmpty().withMessage("账号不能为空"), body("password").notEmpty().withMessage("密码不能为空")],
  AuthController.login,
);
router.get("/getMenuList", AuthController.getMenuList);

export default router;
