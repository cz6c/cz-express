import express from "express";
import AuthController from "../../controllers/auth";

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/getMenuList", AuthController.getMenuList);

export default router;
