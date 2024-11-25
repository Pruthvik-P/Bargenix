import { Request, Response } from "express";
import prisma from "../prisma";

export const getLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = await prisma.logs.findMany();
    res.status(200).json({ logs });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to get logs.", details: error.message });
  }
};
