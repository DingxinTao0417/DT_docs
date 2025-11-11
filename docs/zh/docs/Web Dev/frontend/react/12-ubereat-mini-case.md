# 12 Uber Eat Mini Case

Build a simple listings page with filters and sorting.

- Data: array of items with name, price, rating, category
- UI: search input, category filter, sort buttons
- Logic: derived view via `useMemo` based on filters

```jsx
function useFiltered(items, q, cat, sort){
  return React.useMemo(() => {
    let res = items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()))
    if (cat) res = res.filter(i => i.category === cat)
    if (sort === 'price') res = res.sort((a,b) => a.price - b.price)
    if (sort === 'rating') res = res.sort((a,b) => b.rating - a.rating)
    return res
  }, [items, q, cat, sort])
}
```