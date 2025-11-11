# 7 Component Communication

## Parent → Child (props)
Pass data and configuration via props.

```jsx
function Child({ title }){ return <h3>{title}</h3> }
function Parent(){ return <Child title="Hello" /> }
```

## Child → Parent (callbacks)
Pass a function from parent, call it in child.

```jsx
function Parent(){
  const onSelect = (id) => { console.log('selected', id) }
  return <List onSelect={onSelect} />
}
```

## Avoid props drilling
Use Context for global-ish data (theme, auth) or a state library for complex apps.