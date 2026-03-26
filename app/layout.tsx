import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu Ecossistema Financeiro",
  description: "App pessoal para gerenciar finanças",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
