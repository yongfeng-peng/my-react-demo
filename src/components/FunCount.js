import React, { useState, useEffect, createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

const CountContext = createContext();

function Counter(){
  const count = useContext(CountContext)  // useContext接收上下文变量
  return (<h2>{count}</h2>)
}

function ChildComponent({name, children}) {
  function changeOldStatus(name) {
    console.log('old数据方法');
    return `${name}`
  }
  // const actionOldData = changeOldStatus(name);
  const actionOldData = useMemo(() =>  changeOldStatus(name), [name])
  return (
    <>
      <div>{actionOldData}</div>
      <div>{children}</div>
    </>
  )
}

function useWinSize(){
  const [ size , setSize] = useState({
    width:document.documentElement.clientWidth,
    height:document.documentElement.clientHeight
  })

  const onResize = useCallback(()=>{
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    })
  },[]) 
  useEffect(()=>{
    window.addEventListener('resize',onResize)
    return ()=>{
      window.removeEventListener('resize',onResize)
    }
  },[])
  return size;
}

function Index() {
  useEffect(() => {
    console.log('useEffect---Index页面');
    return () => {
      console.log('离开---Index页面');
    }
  }, [])
  return <h2>index-page</h2>;
}

function List() {
  useEffect(() => {
    console.log('useEffect---list页面');
  })
  return <h2>List-Page</h2>;
}

/**
 * useState是react自带的一个hook函数，它的作用是用来声明状态变量
 * useState 接收的参数是状态的初始值(Initial state)，它返回一个数组
 */

/**
 * useEffect函数 代替class声明常用的声明周期
 */

/**
 * useContext 让父子组件传值更简单
 * useContext和redux的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和useReducer的配合使用，可以实现类似Redux的作用
 * Context的作用就是对它所包含的组件树提供全局共享数据的一种技术
 */
function FunCount() {
  const [count, setCount] = useState(0);
  // setCount函数，函数接收的参数是修改过的新状态值。React重新渲染组件。React自动帮助我们记忆了组件的上一次状态值
  // let _useState = userState(0)
  // let count = _useState[0]
  // let setCount = _useState[1]

  // 涉及一个多状态声明事项
  /**
   * 只赋值，并没有设置key
   * React是根据useState出现的顺序来确定的
   * React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。
  */
  // let show = true;
  const [age, setAge] = useState(18);
  // if(show) {
  //   const [sex, setSex] = useState('女');
  // }
  const [sex, setSex] = useState('女');
  const [work, setWork] = useState('游客');

  useEffect(() => {
    console.log('-------------useEffect----------------', count);
    return ()=>{
      console.log('====================');
    }
  }, [])
  /**
   * 组件第一次渲染和每次组件更新都会执行这个函数
   * React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而类的两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)
   * useEffect中定义的函数的执行不会阻碍浏览器更新视图，函数是异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的
   * useEffect实现componentWillUnmount生命周期函数（组件将要被卸载时执行）。比如定时器要清空，避免发生内存泄漏;比如登录状态要取消，避免下次进入信息出错
   * 使用useEffect第二个参数,传空数组[]时，当组件将被销毁时才进行解绑, 有参数，每次变化都进行解绑
  */

 const [ count1 , dispatch ] = useReducer((state, action) => {
    switch(action) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      default:
        return state
    }
  },0)
  
  const [oldData , setOldData] = useState('最初状态')
  const [newData , setNewData] = useState('新的状态')
  
  const size = useWinSize();

  return (
    <div>
      <div>函数实现：{count}</div>
      <button onClick={() => {
        setCount(count + 1)
      }}>add</button>
      <hr/>
      <ul>
        <li>年龄: {age}</li>
        <li>性别: {sex}</li>
        <li>工作: {work}</li>
      </ul>
      <hr/>
      {/*<Router>
        <ul>
          <li> <Link to="/">首页</Link> </li>
          <li><Link to="/list/">列表</Link> </li>
        </ul>
        <Route path="/" exact component={Index} />
        <Route path="/list/" component={List} />
      </Router>
    */}
      <CountContext.Provider value={count}>
        <Counter/>
      </CountContext.Provider>
      <hr/>
      <div>
        <h2>现在的分数是{count1}</h2>
        <button onClick={()=>dispatch('add')}>Increment</button>
        <button onClick={()=>dispatch('sub')}>Decrement</button>
      </div>
      <hr/>
      <div>
        <button onClick={()=>{setOldData(new Date().getTime()+',old')}}>old</button>
        <button onClick={()=>{setNewData(new Date().getTime()+',new')}}>new</button>
        <ChildComponent name={oldData}>{newData}</ChildComponent>
      </div>
      <hr/>
      <div>页面Size:{size.width}x{size.height}</div>
    </div>
  )
}

export default FunCount;


/**
 * reducer 是一个函数，接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数
 * useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理
 * useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性
 */
// function countReducer(state, action) {
//   switch(action.type) {
//       case 'add':
//           return state + 1;
//       case 'sub':
//           return state - 1;
//       default: 
//           return state;
//   }
// }

/** 
 * useMemo主要用来解决使用React hooks产生的无用渲染的性能问题
 * 使用function的形式来声明组件，失去了shouldCompnentUpdate（在组件更新之前）这个生命周期
 * 没有办法通过组件更新前条件来决定组件是否更新。而且在函数组件中，也不再区分mount和update两个状态，函数组件的每一次调用都会执行内部的所有逻辑，带来了非常大的性能损耗
 * useMemo和useCallback都是解决上述性能问题的
*/

/** 
 * useRef
 * 用useRef获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了,React界面的变化可以通过状态来控制。
 * 用useRef来保存变量，这个在工作中也很少能用到
*/
