import express from "express";
import userController from "../../controllers/user";
import { body } from "express-validator";

const router = express.Router();

// 参数校验
const vaildator = [
  body("username").notEmpty().withMessage("账号不能为空"),
  body("password").isLength({ min: 6 }).withMessage("密码最小6位"),
  body("roleId").notEmpty().withMessage("角色id不能为空"),
  body("deptId").notEmpty().withMessage("部门id不能为空"),
  body("avatar").notEmpty().withMessage("头像不能为空"),
];

router.get("/user/info", userController.info);
router.get("/user/list", userController.list);
router.post("/user/save", vaildator, userController.create);
router.post("/user/update", vaildator, userController.update);
router.post(
  "/user/status",
  [body("id").notEmpty().withMessage("id不能为空"), body("status").notEmpty().withMessage("status不能为空")],
  userController.status,
);
router.post("/user/del", [body("id").notEmpty().withMessage("id不能为空")], userController.destroy);

export default router;
