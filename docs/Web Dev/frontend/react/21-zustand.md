# 21 Zustand

A small, fast state-management library.

```jsx
import { create } from 'zustand'

const useStore = create(set => ({
  count: 0,
  inc: () => set(state => ({ count: state.count + 1 })),
  dec: () => set(state => ({ count: state.count - 1 }))
}))

function Counter(){
  const { count, inc, dec } = useStore()
  return (
    <div>
      <button onClick={dec}>-</button>
      <span>{count}</span>
      <button onClick={inc}>+</button>
    </div>
  )
}
```

- No providers required; subscribe via hooks
- Co-locate slices by feature