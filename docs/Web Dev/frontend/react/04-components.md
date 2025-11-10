# 4 Components Basics

## What is a component?
A component is a piece of UI with its own logic and appearance. Components can be nested and reused.

![Components](assets/07.png)

## Defining and using components
Use a capitalized function to define a component; render it like a tag.

```jsx
// Define
function Button(){
  return <button>click me</button>
}

// Use
function App(){
  return (
    <div>
      <Button />
      <Button></Button>
    </div>
  )
}
```