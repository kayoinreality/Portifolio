import { NextRequest, NextResponse } from "next/server";
import { readFinanceData, writeFinanceData } from "@/lib/finance-store";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const expenseId = String(body.expenseId || "");
  const description = String(body.description || "").trim();

  if (!expenseId || !description) {
    return NextResponse.json({ error: "Dados obrigatórios ausentes." }, { status: 400 });
  }

  const data = await readFinanceData();
  const expense = data.expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return NextResponse.json({ error: "Despesa não encontrada." }, { status: 404 });
  }

  expense.description = description;
  expense.needsReview = false;

  await writeFinanceData(data);
  return NextResponse.json({ ok: true });
}
