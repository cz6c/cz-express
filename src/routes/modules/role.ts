import express from "express";
import roleController from "../../controllers/role";
import { body, query } from "express-validator";

const router = express.Router();

// 参数校验
const vaildator = [
  body("roleName").notEmpty().withMessage("角色名称不能为空"),
  body("menuIds").notEmpty().withMessage("菜单不能为空"),
];

router.get("/role/info", [query("id").notEmpty().withMessage("id不能为空")], roleController.info);
router.get("/role/list", roleController.list);
router.post("/role/save", vaildator, roleController.create);
router.post("/role/update", [...vaildator, body("id").notEmpty().withMessage("id不能为空")], roleController.update);
router.post(
  "/role/status",
  [body("id").notEmpty().withMessage("id不能为空"), body("status").notEmpty().withMessage("status不能为空")],
  roleController.status,
);
router.post("/role/del", [body("id").notEmpty().withMessage("id不能为空")], roleController.destroy);

export default router;
