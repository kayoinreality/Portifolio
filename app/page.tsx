"use client";

import { FormEvent, useEffect, useState } from "react";

type Expense = {
  id: string;
  amount: number;
  category: string;
  source: "manual" | "card";
  description: string;
  date: string;
  needsReview: boolean;
};

type FinancePayload = {
  incomes: Array<{ id: string; label: string; amount: number; type: "fixed" | "extra" }>;
  expenses: Expense[];
  summary: {
    totalIncome: number;
    fixedIncome: number;
    extraIncome: number;
    totalExpenses: number;
    savingsPotential: number;
    suggestedSavings: number;
    carryOverNextMonth: number;
    pendingReview: number;
  };
};

export default function HomePage() {
  const [data, setData] = useState<FinancePayload | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    const response = await fetch("/api/finance");
    const payload = (await response.json()) as FinancePayload;
    setData(payload);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addExpense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: formData.get("amount"),
        category: formData.get("category"),
        description: formData.get("description"),
        date: formData.get("date"),
      }),
    });

    form.reset();
    await loadData();
  }

  async function addIncome(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    await fetch("/api/incomes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: formData.get("label"),
        amount: formData.get("amount"),
        createdAt: formData.get("createdAt"),
      }),
    });

    form.reset();
    await loadData();
  }

  async function resolveExpense(expenseId: string, description: string) {
    if (!description.trim()) return;

    await fetch("/api/review", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expenseId, description }),
    });

    await loadData();
  }

  if (loading || !data) return <main className="container">Carregando...</main>;

  return (
    <main className="container">
      <h1>Meu Ecossistema Financeiro</h1>
      <p>Controle pessoal de renda, gastos e projeção mensal.</p>

      <section className="grid">
        <Card title="Renda total" value={data.summary.totalIncome} />
        <Card title="Renda extra" value={data.summary.extraIncome} />
        <Card title="Despesas" value={data.summary.totalExpenses} />
        <Card title="Potencial de economia" value={data.summary.savingsPotential} />
        <Card title="Guardar (meta)" value={data.summary.suggestedSavings} />
        <Card title="Sobra para próximo mês" value={data.summary.carryOverNextMonth} />
      </section>

      <section className="panel">
        <h2>Lançar gasto avulso (fora do cartão)</h2>
        <form onSubmit={addExpense} className="form">
          <input name="amount" type="number" step="0.01" placeholder="Valor" required />
          <input name="category" placeholder="Categoria" required />
          <input name="description" placeholder="Descrição (opcional)" />
          <input name="date" type="date" />
          <button type="submit">Salvar gasto</button>
        </form>
      </section>

      <section className="panel">
        <h2>Adicionar renda extra</h2>
        <form onSubmit={addIncome} className="form">
          <input name="label" placeholder="Origem da renda" required />
          <input name="amount" type="number" step="0.01" placeholder="Valor" required />
          <input name="createdAt" type="date" />
          <button type="submit">Salvar renda</button>
        </form>
      </section>

      <section className="panel">
        <h2>Compras sem descrição ({data.summary.pendingReview})</h2>
        {data.expenses.filter((item) => item.needsReview).length === 0 && <p>Nenhuma pendência 🎉</p>}
        {data.expenses
          .filter((item) => item.needsReview)
          .map((expense) => (
            <ReviewRow key={expense.id} expense={expense} onResolve={resolveExpense} />
          ))}
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <strong>
        {value.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </strong>
    </article>
  );
}

function ReviewRow({
  expense,
  onResolve,
}: {
  expense: Expense;
  onResolve: (expenseId: string, description: string) => Promise<void>;
}) {
  const [description, setDescription] = useState("");

  return (
    <div className="reviewRow">
      <div>
        <p>
          <strong>{expense.category}</strong> • {expense.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </p>
        <small>{expense.date}</small>
      </div>
      <input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Descreva essa compra"
      />
      <button onClick={() => onResolve(expense.id, description)}>Confirmar</button>
    </div>
  );
}
