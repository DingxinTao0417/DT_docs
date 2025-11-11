# 18 forwardRef

Forward a ref from parent to an inner DOM node or child component.

```jsx
const Input = React.forwardRef(function Input(props, ref){
  return <input ref={ref} {...props} />
})

function App(){
  const ref = React.useRef(null)
  return (
    <div>
      <Input ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
    </div>
  )
}
```