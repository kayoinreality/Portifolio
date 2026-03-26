# Meu Ecossistema Financeiro (Pessoal)

Aplicativo pessoal em **Next.js + Docker** para:

- acompanhar renda fixa e renda extra;
- registrar gastos avulsos (fora de cartão);
- identificar compras sem descrição e revisar depois;
- visualizar indicadores de economia e sobra projetada para o próximo mês.

## Rodando local com Docker

```bash
docker compose up --build
```

Acesse em `http://localhost:3000`.

## Rodando sem Docker

```bash
npm install
npm run dev
```

## Endpoints

- `GET /api/finance`: dados completos + resumo;
- `POST /api/expenses`: cria gasto manual;
- `POST /api/incomes`: cria renda extra;
- `PATCH /api/review`: resolve gasto sem descrição.
