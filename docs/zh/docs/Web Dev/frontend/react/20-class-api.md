# 20 Class API

Class components and lifecycle methods (legacy but still present).

```jsx
class Counter extends React.Component{
  state = { value: 0 }
  componentDidMount(){ /* subscribe */ }
  componentWillUnmount(){ /* cleanup */ }
  render(){
    return (
      <div>
        <button onClick={() => this.setState({ value: this.state.value - 1 })}>-</button>
        <span>{this.state.value}</span>
        <button onClick={() => this.setState({ value: this.state.value + 1 })}>+</button>
      </div>
    )
  }
}
```