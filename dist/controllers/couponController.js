"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCoupon = exports.generateCoupon = void 0;
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../prisma"));
const generateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    if (!productId) {
        res.status(400).json({ error: "Product ID is required." });
        return;
    }
    try {
        const discountCode = `DISCOUNT-${(0, uuid_1.v4)().slice(0, 8).toUpperCase()}`;
        const expiresAt = (0, moment_1.default)().add(30, "minutes").toDate();
        const coupon = yield prisma_1.default.coupon.create({
            data: { productId, discountCode, expiresAt },
        });
        yield prisma_1.default.logs.create({
            data: { action: "generateCoupon", details: { coupon } },
        });
        res.status(201).json({ message: "Coupon generated successfully.", discountCode: coupon.discountCode });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to generate coupon.", details: error.message });
    }
});
exports.generateCoupon = generateCoupon;
const validateCoupon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, discountCode } = req.body;
    if (!productId || !discountCode) {
        res
            .status(400)
            .json({ error: "Product ID and discount code are required." });
        return;
    }
    try {
        const coupon = yield prisma_1.default.coupon.findFirst({
            where: { productId, discountCode },
        });
        if (!coupon) {
            yield prisma_1.default.logs.create({
                data: {
                    action: "validateCoupon",
                    details: { productId, discountCode, error: "Invalid coupon." },
                },
            });
            res.status(404).json({ error: "Invalid coupon." });
            return;
        }
        if ((0, moment_1.default)().isAfter(coupon.expiresAt)) {
            yield prisma_1.default.logs.create({
                data: {
                    action: "validateCoupon",
                    details: { productId, discountCode, error: "Coupon expired." },
                },
            });
            res.status(400).json({ error: "Coupon expired." });
            return;
        }
        yield prisma_1.default.logs.create({
            data: {
                action: "validateCoupon",
                details: { productId, discountCode, status: "Valid coupon." },
            },
        });
        res.status(200).json({ message: "Coupon is valid.", coupon });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "Failed to validate coupon.", details: error.message });
    }
});
exports.validateCoupon = validateCoupon;
