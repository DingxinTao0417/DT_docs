# 3 Event Handling

## Basic binding
React events use camelCase and are passed as function references.

```jsx
function App(){
  const clickHandler = () => {
    console.log('button clicked')
  }
  return <button onClick={clickHandler}>click me</button>
}
```

## Event object
Declare a parameter to receive the synthetic event.

```jsx
function App(){
  const clickHandler = (e) => {
    console.log('button clicked', e)
  }
  return <button onClick={clickHandler}>click me</button>
}
```

## Passing custom parameters
Wrap the call in an arrow function to pass parameters.

```jsx
function App(){
  const clickHandler = (name) => {
    console.log('button clicked', name)
  }
  return <button onClick={() => clickHandler('jack')}>click me</button>
}
```

Note: do not call the handler directly in JSX; pass a function reference.

## Event + custom parameter

```jsx
function App(){
  const clickHandler = (name, e) => {
    console.log('button clicked', name, e)
  }
  return <button onClick={(e) => clickHandler('jack', e)}>click me</button>
}
```