import { prisma } from "../config/prisma";
import { RecordType } from "@prisma/client";

export const getDashboardSummary = async () => {
  const records = await prisma.financialRecord.findMany();

  let totalIncome = 0;
  let totalExpense = 0;

  const categoryTotals: Record<string, number> = {};

  records.forEach((record) => {
    if (record.type === RecordType.INCOME) {
      totalIncome += record.amount;
    } else {
      totalExpense += record.amount;
    }

    if (!categoryTotals[record.category]) {
      categoryTotals[record.category] = 0;
    }

    categoryTotals[record.category] += record.amount;
  });

  const netBalance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryTotals,
    totalRecords: records.length,
  };
};