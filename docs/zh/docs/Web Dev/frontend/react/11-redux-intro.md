# 11 Redux Introduction

Core ideas:
- Single store holds application state
- State is read-only; changes via actions
- Pure reducers describe state transitions

```jsx
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    inc: state => { state.value += 1 },
    dec: state => { state.value -= 1 }
  }
})

export const { inc, dec } = counterSlice.actions
export const store = configureStore({ reducer: { counter: counterSlice.reducer } })
```

```jsx
// App.jsx
import { Provider, useSelector, useDispatch } from 'react-redux'
import { store, inc, dec } from './store'

function Counter(){
  const value = useSelector(s => s.counter.value)
  const dispatch = useDispatch()
  return (
    <div>
      <button onClick={() => dispatch(dec())}>-</button>
      <span>{value}</span>
      <button onClick={() => dispatch(inc())}>+</button>
    </div>
  )
}

export default function App(){
  return <Provider store={store}><Counter/></Provider>
}
```