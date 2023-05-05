import express from "express";
import RoleController from "../../controllers/role";

const router = express.Router();

router.get("/role/info", RoleController.info);
router.get("/role/list", RoleController.list);
router.post("/role/save", RoleController.create);
router.post("/role/update", RoleController.update);
router.post("/role/del", RoleController.destroy);

export default router;
