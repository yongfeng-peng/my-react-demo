import React, { Component } from "react";

import logo from './logo.svg';
import './App.css';
import { Welcome1, Welcome2 } from './components/CompType';
import Lifecycle from './components/Lifecycle';
import StateTest from './components/StateTest';
import Clock from './components/Clock';
import AntdTest from './components/AntdTest';
import CommentList from './components/CommentList';
import Hoc from './components/Hoc';
import CartSample from './components/CartSample';
import FunCount from './components/FunCount'
import ClassCount from './components/ClassCount'

function formatName(user) {
  return `${user.firstName}---${user.lastName}`
}

class App extends Component {
  render() {
    const name = 'jerry';
    const user = { firstName: 'tom', lastName: 'jerry' };
    const jsx = <p>hello, jerry</p>;
    return (
      <div className='App'>
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
        {/* 表达式 */}
        <h1>{name}</h1>
        <h1>{formatName(user)}</h1>
        {/* 属性 */}
        <img src={logo} style={{width:'100px'}} />
        {/* jsx也是表达式 */}
        {jsx}
        {/* 使用其他组件
             <Welcome1 name='hello world'></Welcome1>
        <Welcome2 name='hello world'></Welcome2>
         */}
     
        {/* 生命周期 */}
       {/* {this.state.prop && <Lifecycle prop={this.state.prop}></Lifecycle>}*/}
        <Lifecycle></Lifecycle>
        {/* State和状态改变setState
        <Clock></Clock>

         */}
        {/* <StateTest></StateTest> */}
        {/* antd */}
        {/* <AntdTest></AntdTest> */}
        {/* 展示组件和容器组件
        <CommentList></CommentList>

         */}
        {/* 高阶组件
        <Hoc></Hoc>
          
        */}
        {/* 组件复合 */}
        {/* <Composition></Composition> */}
        {/* <CartSample></CartSample> */}
        {/* hooks */}
        <FunCount></FunCount>
        <ClassCount></ClassCount>
      </div>
    );
  }
}

export default App;
