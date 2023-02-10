import express from "express";
import userController from "../../controllers/user";

const router = express.Router();

router.get("/user/info", userController.info);
router.get("/user/list", userController.list);
router.post("/user/create", userController.create);
router.post("/user/update", userController.update);
router.post("/user/destroy", userController.destroy);

export default router;
