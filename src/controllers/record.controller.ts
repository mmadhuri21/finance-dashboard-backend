import { Request, Response } from "express";
import {
  createRecord,
  getAllRecords,
  updateRecord,
} from "../services/record.service";

export const createFinancialRecord = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const record = await createRecord({
    ...req.body,
    createdById: user.userId,
  });

  res.status(201).json({
    message: "Financial record created successfully",
    data: record,
  });
};

export const getFinancialRecords = async (req: Request, res: Response) => {
  const records = await getAllRecords({
    type: req.query.type as string | undefined,
    category: req.query.category as string | undefined,
    startDate: req.query.startDate as string | undefined,
    endDate: req.query.endDate as string | undefined,
  });

  res.status(200).json({
    message: "Financial records fetched successfully",
    data: records,
  });
};

export const updateFinancialRecord = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const record = await updateRecord(id, req.body);

  res.status(200).json({
    message: "Financial record updated successfully",
    data: record,
  });
};