import express from "express";
import userController from "../../controllers/user";
import { body } from "express-validator";

const router = express.Router();

// 参数校验
const vaildator = [
  body("username").isString().withMessage("用户名必传"),
  body("password").isLength({ min: 6 }).withMessage("密码类型错误"),
];

router.get("/user/info", userController.info);
router.get("/user/list", userController.list);
router.post("/user/save", vaildator, userController.create);
router.post("/user/update", vaildator, userController.update);
router.post("/user/del", [body("id").isString().withMessage("id必传")], userController.destroy);

export default router;
