import { prisma } from "../config/prisma";
import { Prisma, RecordType } from "@prisma/client";

export const createRecord = async (data: {
  amount: number;
  type: RecordType;
  category: string;
  date: string;
  notes?: string;
  createdById: string;
}) => {
  const record = await prisma.financialRecord.create({
    data: {
      amount: data.amount,
      type: data.type,
      category: data.category,
      date: new Date(data.date),
      notes: data.notes,
      createdById: data.createdById,
    },
  });

  return record;
};

export const getAllRecords = async (filters?: {
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const where: Prisma.FinancialRecordWhereInput = {};

  if (filters?.type) {
    where.type = filters.type as RecordType;
  }

  if (filters?.category) {
    where.category = {
      contains: filters.category,
    };
  }

  if (filters?.startDate || filters?.endDate) {
    where.date = {};

    if (filters.startDate) {
      where.date.gte = new Date(filters.startDate);
    }

    if (filters.endDate) {
      where.date.lte = new Date(filters.endDate);
    }
  }

  return prisma.financialRecord.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateRecord = async (
  id: string,
  data: {
    amount?: number;
    type?: RecordType;
    category?: string;
    date?: string;
    notes?: string;
  }
) => {
  return prisma.financialRecord.update({
    where: { id },
    data: {
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
      ...(data.notes !== undefined && { notes: data.notes }),
    },
  });
};