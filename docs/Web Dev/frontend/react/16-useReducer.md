# 16 useReducer

Manage complex state transitions with a reducer function.

```jsx
function reducer(state, action){
  switch(action.type){
    case 'add': return { items: [...state.items, action.payload] }
    case 'remove': return { items: state.items.filter(i => i.id !== action.id) }
    default: return state
  }
}

function App(){
  const [state, dispatch] = React.useReducer(reducer, { items: [] })
  return (
    <div>
      <button onClick={() => dispatch({ type: 'add', payload: { id: 1 } })}>Add</button>
    </div>
  )
}
```

- Prefer immutable updates
- Co-locate reducer and action creators for clarity