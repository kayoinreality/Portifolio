export type IncomeType = "fixed" | "extra";

export type Income = {
  id: string;
  label: string;
  amount: number;
  type: IncomeType;
  createdAt: string;
};

export type Expense = {
  id: string;
  amount: number;
  category: string;
  source: "manual" | "card";
  description: string;
  date: string;
  needsReview: boolean;
};

export type FinanceData = {
  savingsTargetPercent: number;
  incomes: Income[];
  expenses: Expense[];
};
