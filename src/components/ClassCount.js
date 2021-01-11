import React, { Component } from 'react'

export default class ClassCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  componentDidMount() {
    console.log('--------------componentDidMount-----------------', this.state.count);
  }
  componentDidUpdate() {
    console.log('---------------componentDidUpdate------------', this.state.count);
  }
  handClick = () => {
    let { count } = this.state;
    this.setState({
      count: ++count
    })
  }
  render() {
    return (
      <div>
        <div>类实现：{this.state.count}</div>
        <button onClick={this.handClick}>add</button>
      </div>
    )
  }
}
