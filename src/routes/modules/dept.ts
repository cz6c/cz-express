import express from "express";
import DeptController from "../../controllers/dept";

const router = express.Router();

router.get("/dept/info", DeptController.info);
router.get("/dept/list", DeptController.list);
router.post("/dept/save", DeptController.create);
router.post("/dept/update", DeptController.update);
router.post("/dept/del", DeptController.destroy);

export default router;
