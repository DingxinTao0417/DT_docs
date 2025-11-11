# 6 Controlled Forms

Controlled components mirror input values in React state and update on change.

```jsx
function Form(){
  const [value, setValue] = React.useState('')
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Type here"
    />
  )
}
```

- Use `value` to control input
- Handle `onChange` to update state
- For multiple fields, keep them in a single object or use separate state slices