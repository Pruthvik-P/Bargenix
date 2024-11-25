"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const couponController_1 = require("../controllers/couponController");
const router = (0, express_1.Router)();
router.post("/generate", couponController_1.generateCoupon);
router.post("/validate", couponController_1.validateCoupon);
exports.default = router;
