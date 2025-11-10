# 8 Side Effects with useEffect

`useEffect` manages side-effects (data fetching, subscriptions, timers, DOM interactions).

```jsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(id) // cleanup
}, [])
```

- Dependencies array controls when the effect runs
- Return a cleanup function to dispose resources
- Avoid running effects on every render unless needed