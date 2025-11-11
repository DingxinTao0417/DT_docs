# 19 useImperativeHandle

Customize the ref value exposed to parent components.

```jsx
const Input = React.forwardRef(function Input(props, ref){
  const innerRef = React.useRef(null)
  React.useImperativeHandle(ref, () => ({
    focus: () => innerRef.current?.focus(),
    clear: () => { if(innerRef.current) innerRef.current.value = '' }
  }))
  return <input ref={innerRef} {...props} />
})
```