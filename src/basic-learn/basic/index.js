import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const name = 'Shero';
// const element = <h1>Hello, {name}</h1>;

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  // 建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到自动插入分号陷阱
  <div>
    <h1>Hello, {name}</h1>
    <h1>Hello, {formatName(user)}</h1>
    <h1>{getGreeting()}</h1>
  </div>
);


function formatName(user) {
  return `${user.firstName}-----${user.lastName}`
}

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// }

// setInterval(tick, 1000);

// function Welcome(props) {
//   return <h1>hello, {props.name}</h1>;
// }

// function App() {
//   return (
//     <div>
//     <Welcome name="Sara" />
//     <Welcome name="Dedi" />
//     <Welcome name="Asli" />
//     </div>
//   );
// }

// ReactDOM.render(
//   <App/>,
//   document.getElementById('root')
// );

function formatDate(date) {
  return date.toLocaleDateString();
}

// 从组件自身的角度命名 props，而不是依赖于调用组件的上下文命名
function Avatar(props) {
  return (
    <img
      className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

// 该组件由于嵌套的关系，变得难以维护，且很难复用它的各个部分。因此，让我们从中提取一些组件出来
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
// ReactDOM.render(
//   <Comment
//     date={comment.date}
//     text={comment.text}
//     author={comment.author}
//   />,
//   document.getElementById('root')
// );

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// function Clock(props) {
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date
    }
  }

  // 挂载 组件已经被渲染到 DOM 中后运
  componentDidMount() {
    this.timeId =  setInterval(
      () => this.tick(),
      1000
    );
  }

  // 卸载
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return(
      <div>
        <h1>Hello, world!</h1>
        {/* <h2>It is {this.state.date.toLocaleTimeString()}.</h2> */}
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const  numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number, index) =>
      <li key={index}>{number}</li>
    )
    return(
      <ul>{listItems}</ul>
    );
  }
}

function ListItems(props) {
  return (
    // <li key={props.number}>{props.number}</li> // 错误
    <li>{props.number}</li>
  );
}

function NumberList(props) {
  const  numbers =  props.numbers;
  const listItems = numbers.map(number =>
    <ListItems key={number} number={number} />
    // <li key={number}>{number}</li>
  )
  return(
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

function Blog(props) {
  const sidebar = (
    <ul>
      {
        props.posts.map(item => 
          <li key={item.id}>{item.title}</li>
        )
      }
    </ul>
  );
  const content = props.posts.map(item => 
    <div key={item.id}>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </div>
  );
  return(
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

// 受控组件
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    // this.handleChange = this.handleChange.bind(this); // 第一种绑定事件
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  // handleSubmit(e) {
  //   alert(`提交名字${this.state.value}`);
  //   e.preventDefault();
  // }
  handleSubmit = (e) => { // 第二种绑定事件
    alert(`提交名字${this.state.value}`);
    e.preventDefault();
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          名字：
          <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e)} />
          {/*第三种绑定事件*/}
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

// textarea

class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '请撰写一篇关于你喜欢的 DOM 元素的文章.'
    };
  }
  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }
  handleSubmit(e) {
    alert(`提交名字${this.state.value}`);
    e.preventDefault();
  }
  render() {
    return(
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          文章：
          <textarea value={this.state.value} onChange={(e) => this.handleChange(e)} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('你喜欢的风味是: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}

class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

// function BoilingVerdict(props) {
//   if (props.celsius >= 100) {
//     return <p>The water would boil.</p>;
//   }
//   return <p>The water would not boil.</p>;
// }

// class Calculator extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {temperature: ''};
//   }

//   handleChange(e) {
//     this.setState({temperature: e.target.value});
//   }

//   render() {
//     const temperature = this.state.temperature;
//     return (
//       <fieldset>
//         <legend>Enter temperature in Celsius:</legend>
//         <input
//           value={temperature}
//           onChange={this.handleChange} />
//         <BoilingVerdict
//           celsius={parseFloat(temperature)} />
//       </fieldset>
//     );
//   }
// }

// const scaleNames = {
//   c: 'Celsius',
//   f: 'Fahrenheit'
// };

// function tryConvert(temperature, convert) {
//   const input = parseFloat(temperature);
//   if (Number.isNaN(input)) {
//     return '';
//   }
//   const output = convert(input);
//   const rounded = Math.round(output * 1000) / 1000;
//   return rounded.toString();
// }

// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(e) {
//     this.props.onTemperatureChange(e.target.value);
//   }

//   render() {
//     const temperature = this.props.temperature;
//     const scale = this.props.scale;
//     return (
//       <fieldset>
//         <legend>Enter temperature in {scaleNames[scale]}:</legend>
//         <input value={temperature}
//           onChange={this.handleChange} />
//       </fieldset>
//     );
//   }
// }

// class Calculator2 extends React.Component {
//   render() {
//     return (
//       <div>
//         <TemperatureInput scale="c" />
//         <TemperatureInput scale="f" />
//       </div>
//     );
//   }
// }

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

// 状态提升
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

// function WelcomeDialog() {
//   return (
//     <FancyBorder color="blue">
//       <h1 className="Dialog-title">
//         Welcome
//       </h1>
//       <p className="Dialog-message">
//         Thank you for visiting our spacecraft!
//       </p>
//     </FancyBorder>
//   );
// }

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}

function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function Container() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

function Dialog1(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }
  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
  render() {
    return (
      <Dialog1 title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
          onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog1>
    );
  }
}

function App() {
  return (
    <div>
      {/*<Clock />
      <Clock />
      <Clock />
      <Toggle />
      <List />
      <NumberList numbers= {numbers} />
      <Blog posts={posts} />
      <WelcomeDialog /> */}
      <NameForm />
      <EssayForm />
      <FlavorForm />
      <Reservation />
      <Calculator />
      <SignUpDialog />
    </div>
  );
}

// 每个 Clock 组件都会单独设置它自己的计时器并且更新它。
// 在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。

ReactDOM.render(
  <App />,
  // <Container />,
  document.getElementById('root')
);

// setInterval(tick, 1000);
