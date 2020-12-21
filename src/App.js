import logo from './logo.svg';
import './App.css';

import Lifecycle from './components/Lifecycle';
import StateTest from './components/StateTest';
import AntdTest from './components/AntdTest';
import CommentList from './components/CommentList';
import Hoc from './components/Hoc';

function App() {
  return (
    <div className="App">
      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
      {/* 生命周期 */}
      {/* {this.state.prop && <Lifecycle prop={this.state.prop}></Lifecycle>} */}
      {/* State和状态改变setState */}
      {/* <Clock></Clock> */}
      {/* <StateTest></StateTest> */}
      {/* antd */}
      {/* <AntdTest></AntdTest> */}
      {/* 展示组件和容器组件 */}
      <CommentList></CommentList>
      {/* 高阶组件 */}
      <Hoc></Hoc>
    </div>
  );
}

export default App;
