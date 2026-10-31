# Profitwise

A minimalist e-commerce profit tracker. Enter your orders and ad spend, get your daily net profit, and keep a calendar of every day.

## Tech stack

- **Frontend:** Angular, TypeScript
- **Backend:** NestJS, TypeScript, REST API
- **Database:** Supabase (PostgreSQL)

## Features

- Profit calculator: revenue, gross profit, net profit, margin and ROAS, updated as you type
- Calendar view of saved days, per month, with net profit and margin
- Detailed breakdown for each saved day, including the settings used that day
- Persistent settings (revenue per order, COGS, fees, commissions, VAT, shipping)

## How it works

1. **Set your costs.** Enter revenue per order, COGS, fees, commissions, VAT and shipping once in the calculator settings.
2. **Enter the day.** Add the number of orders and your ad spend. Results update as you type.
3. **Save it.** Pick a date and save. The day appears in your calendar with its net profit and margin.
