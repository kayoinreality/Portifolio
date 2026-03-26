import { promises as fs } from "fs";
import path from "path";
import { FinanceData } from "@/lib/types";

const dbPath = path.join(process.cwd(), "data", "finance.json");

export async function readFinanceData(): Promise<FinanceData> {
  const file = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(file) as FinanceData;
}

export async function writeFinanceData(data: FinanceData): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export function buildSummary(data: FinanceData) {
  const totalIncome = data.incomes.reduce((acc, income) => acc + income.amount, 0);
  const fixedIncome = data.incomes
    .filter((income) => income.type === "fixed")
    .reduce((acc, income) => acc + income.amount, 0);
  const extraIncome = totalIncome - fixedIncome;

  const totalExpenses = data.expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const pendingReview = data.expenses.filter((expense) => expense.needsReview).length;

  const savingsPotential = Math.max(0, totalIncome - totalExpenses);
  const suggestedSavings = fixedIncome * (data.savingsTargetPercent / 100);
  const carryOverNextMonth = savingsPotential - suggestedSavings;

  return {
    totalIncome,
    fixedIncome,
    extraIncome,
    totalExpenses,
    savingsPotential,
    suggestedSavings,
    carryOverNextMonth,
    pendingReview,
  };
}
