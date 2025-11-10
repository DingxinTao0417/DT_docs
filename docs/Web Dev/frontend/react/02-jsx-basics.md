# 2 JSX Basics

## What is JSX?
JSX (JavaScript + XML) lets you write HTML-like templates inside JavaScript. It is the primary way to build UI in React.

```jsx
const message = 'this is message'

function App(){
  return (
    <div>
      <h1>this is title</h1>
      {message}
    </div>
  )
}
```

Benefits:
- Declarative HTML-like templates
- Full JavaScript programmability

## The nature of JSX
JSX is a syntax extension, not standard JS. Browsers don’t understand it directly; build tools transform JSX into JS.

Popular tools: BABEL, SWC (you can choose while initializing the project)

![JSX transform](assets/03.png)

## JS expressions in JSX
Use `{...}` to embed JavaScript expressions: variables, function calls, method calls, object literals.

Rules:
- Allowed: string literals, variables, calls, object literals
- Not allowed: `if`, `switch`, variable declarations inside `{}`

```jsx
const message = 'this is message'

function getAge(){
  return 18
}

function App(){
  return (
    <div>
      <h1>this is title</h1>
      {/* string */}
      {'this is str'}
      {/* variable */}
      {message}
      {/* function result */}
      {getAge()}
    </div>
  )
}
```

## List rendering
Use `Array.prototype.map` to render lists.

```jsx
const list = [
  {id:1001, name:'Vue'},
  {id:1002, name: 'React'},
  {id:1003, name: 'Angular'}
]

function App(){
  return (
    <ul>
      {list.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  )
}
```

## Conditional rendering
Use logical `&&` and ternary `? :` for basic conditions.

```jsx
const flag = true
const loading = false

function App(){
  return (
    <>
      {flag && <span>this is span</span>}
      {loading ? <span>loading...</span> : <span>this is span</span>}
    </>
  )
}
```

## Complex conditions
Extract logic into functions or variables.

```jsx
const type = 1  // 0 | 1 | 3

function getArticleJSX(){
  if (type === 0) return <div>No image template</div>
  if (type === 1) return <div>Single image template</div>
  if (type === 3) return <div>Three images template</div>
  return null
}

function App(){
  return <>{getArticleJSX()}</>
}
```