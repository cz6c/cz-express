import express from "express";
import MapFootprintController from "../../controllers/mapFootprint";

const router = express.Router();

router.get("/mapFootprint/info", MapFootprintController.info);
router.get("/mapFootprint/list", MapFootprintController.list);
router.post("/mapFootprint/create", MapFootprintController.create);
router.post("/mapFootprint/update", MapFootprintController.update);
router.post("/mapFootprint/destroy", MapFootprintController.destroy);

export default router;
