### react基础笔记
#### JSX
* 是一个 JavaScript 的语法扩展
* React认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据
*  JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式
* JSX 也是一个表达式, 在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象
* JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。
  * 例如，JSX 里的 class 变成了 className，而 tabindex 则变为 tabIndex。
* JSX 防止注入攻击, React DOM 在渲染所有输入内容之前，默认会进行转义, 有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
* JSX 表示对象, Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

#### 元素渲染
* React 构建的应用通常只有单一的根 DOM 节点
* React 元素是不可变对象
* React 只更新它需要更新的部分
  * React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。

#### 组件 & Props
* 组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素
* 渲染组件
  *  props： React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件。
* 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签
* 组件可以在其输出中引用其他组件
* Props 的只读性,组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props
  * React 组件都必须像纯函数一样保护它们的 props 不被更改
  * 应用程序的 UI 是动态的，并会伴随着时间的推移而变化

#### State & 生命周期
* 正确的使用state
  * 不要直接修改 State (wrong: this.state.comment = 'Hello';),应该使用 setState()
  * 构造函数是唯一可以给 this.state 赋值的地方
  * State 的更新可能是异步的 可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
  * State 的更新会被合并
  * 数据是向下流动的，不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

#### 事件处理
* React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：
* React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
* 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。
*  bind 很麻烦，这里有两种方式可以解决
```
onClick={this.handleClick}
// 此语法确保 `handleClick` 内的 `this` 已被绑定。
// 注意: 这是 *实验性* 语法。
handleClick = () => {
  console.log('this is:', this);
}
```
```
handleClick() {
  console.log('this is:', this);
}
onClick={() => this.handleClick()}>

```

#### 条件渲染
* 元素变量
* 与运算符 &&
* 三目运算符
* 阻止组件渲染，让 render 方法直接返回 null，而不进行任何渲染，组件的 render 方法中返回 null 并不会影响组件的生命周期

#### 列表 & Key
* key 帮助 React 识别哪些元素改变了，比如被添加或删除
* 元素的 key 只有放在就近的数组上下文中才有意义(在 map() 方法中的元素需要设置 key 属性)
* key 只是在兄弟节点之间必须唯一

#### 表单
* 在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state。例如这个纯 HTML 表单只接受一个名称
* 受控组件
  * 输入的值始终由 React 的 state 驱动

#### 状态提升
* 多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的

#### 组合 vs 继承
* React 有十分强大的组合模式。我们推荐使用组合而非继承来实现组件间的代码重用
* 包含关系
  * 有些组件无法提前知晓它们子组件的具体内容
  * 组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

#### React 哲学
* React 构建一个可搜索的产品数据表格来更深刻地领会 React 哲学。

#### React和ReactDOM
* React逻辑控制(义务控制、视图模型控制)，React.createElement()（生成虚拟DOM，React生成的组件或者数据与render渲染的数据进行diff,打补丁）
#### JSX
* 表达式: {expr}
* 属性: <div id={}>
* jsx也是表达式: <p>{jsx}</p>
#### 组件
* 函数式：
```
function Comp(props) {
  return(...)
}
```
* 类：
```
class Comp extends React.Component {
  render() {
    return(...)
  }
}
```

#### 属性
```
<Comp name='' style={{...}}>
```

#### 状态
```
class Comp {
  state = {}
  componentDidMount() {
    this.setState({
      prop: val, // 批量异步的，不会立刻生效
    })
    this.setState({state => (prop: val)})
  }
}
```

#### 条件和循环
```
{this.state.isLOgin ? <p>{userInfo.name}</p> : '登陆'}
{this.state.message && <p>{this.state.message}</p>}
{this.state.list.map(u => <li>{u.name}</li>)}
```

#### 事件 
```
constructor(props) {
  super(props);
  this.handleChange = this.handleChange.bind(this);
} // 第二种
handleChange = () => {} // 第一种
<input onChange={this.handleChange} /> // this指向
<input onChange={() => this.handleChange(user)} /> // 第三种
```

#### 通信
```
// 属性方式通信（父组件复杂，子组件负责调用）
// 父子组件隔代，上下文关系，及redux
<Comp titile={} onSubmit={this.onSubmit} />
```

#### 第三方库使用ant-design组件库