import { Router } from "express";
import { generateCoupon, validateCoupon } from "../controllers/couponController";

const router = Router();

router.post("/generate", generateCoupon);
router.post("/validate", validateCoupon);

export default router;
