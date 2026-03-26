import { NextResponse } from "next/server";
import { buildSummary, readFinanceData } from "@/lib/finance-store";

export async function GET() {
  const data = await readFinanceData();
  const summary = buildSummary(data);

  return NextResponse.json({ ...data, summary });
}
