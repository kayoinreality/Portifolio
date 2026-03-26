import { NextRequest, NextResponse } from "next/server";
import { readFinanceData, writeFinanceData } from "@/lib/finance-store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const amount = Number(body.amount);

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Valor inválido." }, { status: 400 });
  }

  const data = await readFinanceData();
  const description = (body.description ?? "").trim();

  data.expenses.unshift({
    id: crypto.randomUUID(),
    amount,
    category: String(body.category || "Sem categoria"),
    source: "manual",
    description,
    date: body.date || new Date().toISOString().slice(0, 10),
    needsReview: description.length === 0,
  });

  await writeFinanceData(data);
  return NextResponse.json({ ok: true });
}
