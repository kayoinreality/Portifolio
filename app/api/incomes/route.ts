import { NextRequest, NextResponse } from "next/server";
import { readFinanceData, writeFinanceData } from "@/lib/finance-store";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const amount = Number(body.amount);

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Valor inválido." }, { status: 400 });
  }

  const data = await readFinanceData();

  data.incomes.unshift({
    id: crypto.randomUUID(),
    label: String(body.label || "Renda extra"),
    amount,
    type: "extra",
    createdAt: body.createdAt || new Date().toISOString().slice(0, 10),
  });

  await writeFinanceData(data);
  return NextResponse.json({ ok: true });
}
