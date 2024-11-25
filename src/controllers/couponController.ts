import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import prisma from "../prisma";

export const generateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId } = req.body;

  if (!productId) {
    res.status(400).json({ error: "Product ID is required." });
    return;
  }

  try {
    const discountCode = `DISCOUNT-${uuidv4().slice(0, 8).toUpperCase()}`;
    const expiresAt = moment().add(30, "minutes").toDate();

    const coupon = await prisma.coupon.create({
      data: { productId, discountCode, expiresAt },
    });

    await prisma.logs.create({
      data: { action: "generateCoupon", details: { coupon } },
    });

    res.status(201).json({ message: "Coupon generated successfully.", discountCode: coupon.discountCode });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to generate coupon.", details: error.message });
  }
};

export const validateCoupon = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId, discountCode } = req.body;

  if (!productId || !discountCode) {
    res
      .status(400)
      .json({ error: "Product ID and discount code are required." });
    return;
  }

  try {
    const coupon = await prisma.coupon.findFirst({
      where: { productId, discountCode },
    });

    if (!coupon) {
      await prisma.logs.create({
        data: {
          action: "validateCoupon",
          details: { productId, discountCode, error: "Invalid coupon." },
        },
      });
      res.status(404).json({ error: "Invalid coupon." });
      return;
    }

    if (moment().isAfter(coupon.expiresAt)) {
      await prisma.logs.create({
        data: {
          action: "validateCoupon",
          details: { productId, discountCode, error: "Coupon expired." },
        },
      });
      res.status(400).json({ error: "Coupon expired." });
      return;
    }

    await prisma.logs.create({
      data: {
        action: "validateCoupon",
        details: { productId, discountCode, status: "Valid coupon." },
      },
    });

    res.status(200).json({ message: "Coupon is valid.", coupon });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to validate coupon.", details: error.message });
  }
};
