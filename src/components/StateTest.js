import React, { Component } from 'react'

export default class StateTest extends Component {
  state = {
    counter: 1
  };
  componentDidMount() {
    // 请不要直接修改状态值
    // this.state.counter += 1;
    // 批量执行
    // this.setState(obj, cb)
    // this.setState(fn, cb)
    // this.setState({
    //   counter: this.state.counter + 1
    // })
    this.setState(oldState => ({
      counter: oldState.counter + 1
    }))
    this.setState(oldState => ({
      counter: oldState.counter + 1
    }))
    this.setState(oldState => ({
      counter: ++oldState.counter
    }))
  }
  render() {
    return (
      <div>{this.state.counter}</div>
    )
  }
}
