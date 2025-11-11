# 9 Custom Hooks

Encapsulate reusable logic into functions prefixed with `use`.

```jsx
function useLocalStorage(key, initial){
  const [value, setValue] = React.useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
```

- Reuse across components
- Compose multiple hooks inside custom hooks