import express from "express";
import deptController from "../../controllers/dept";
import { body, query } from "express-validator";

const router = express.Router();

// 参数校验
const vaildator = [body("deptName").notEmpty().withMessage("部门名称不能为空")];

router.get("/dept/info", [query("id").notEmpty().withMessage("id不能为空")], deptController.info);
router.get("/dept/list", deptController.list);
router.post("/dept/save", vaildator, deptController.create);
router.post("/dept/update", [...vaildator, body("id").notEmpty().withMessage("id不能为空")], deptController.update);
router.post(
  "/dept/status",
  [body("id").notEmpty().withMessage("id不能为空"), body("status").notEmpty().withMessage("status不能为空")],
  deptController.status,
);
router.post("/dept/del", [body("id").notEmpty().withMessage("id不能为空")], deptController.destroy);

export default router;
