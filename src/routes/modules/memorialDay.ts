import express from "express";
import MemorialDayController from "../../controllers/memorialDay";

const router = express.Router();

router.get("/memorialDay/info", MemorialDayController.info);
router.get("/memorialDay/list", MemorialDayController.list);
router.post("/memorialDay/create", MemorialDayController.create);
router.post("/memorialDay/update", MemorialDayController.update);
router.post("/memorialDay/destroy", MemorialDayController.destroy);

export default router;
