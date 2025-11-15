import { addService, getAllServices, getServiceById } from "../controllers/serviceController.js";
import express from "express";

const router = express.Router();

router.get("/services", getAllServices);
router.post("/services/add", addService);
router.get("/services/:id", getServiceById);

export default router;
