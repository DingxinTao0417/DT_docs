# 17 Rendering Performance Optimization

Key techniques:
- `React.memo` to avoid rerendering pure components
- `useMemo` for expensive computations
- `useCallback` for stable function identities
- Avoid anonymous functions in hot paths; prefer bound callbacks
- Profile with React DevTools and browser perf tools