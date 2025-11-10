# 14 Expense Tracker Case

Track incomes and expenses with category, amount, and date.

- State: list of transactions
- Add transaction via form
- Summaries: total, by category
- Persist to `localStorage`

```jsx
function useTransactions(){
  return React.useState([])
}
```