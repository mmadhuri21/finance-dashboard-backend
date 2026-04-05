import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboard.service";

export const getSummary = async (_req: Request, res: Response) => {
  const summary = await getDashboardSummary();

  res.status(200).json({
    message: "Dashboard summary fetched successfully",
    data: summary,
  });
};