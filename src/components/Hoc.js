import React, { Component } from "react";

// 高阶组件 解决组件的复用，组件需要复用，需要简单，功能单一，如果功能单一，组件就弱了，不能解决太多事情，即出现高阶组件 HOC
// Comp高阶组件
const withKaikeba = Comp => {
  // 获取name,name可能来自于接口或其他手段
  const name = "高阶组件";
  // props上级的属性,只关系扩展部分，其它不管
  // return props => <Com {...props} name={name} ></Com>
  console.log('执行withKaikeba');
  // 重建生命周期
  return class NewCom extends React.Component {
  // return class extends Component { // 匿名类
    componentDidMount() {
      console.log('do somgthing');
    }
    render() {
      return <Comp {...this.props} name={name} ></Comp>
    }
  }
}

const withLog = Comp => {
  console.log(`${Comp.name}渲染了`);
  return props => <Comp {...props} />;
}

// 执行函数
// const NewKaikeba = withKaikeba(Kaikeba);

// 链式调用
// const NewKaikeba = withLog(withKaikeba(withLog(Kaikeba)));

// 装饰器的使用，需要是一个class,从上往下，线性执行
@withLog
@withKaikeba
@withLog
class Kaikeba extends Component {
  render() {
    return <div>{this.props.stage}----{this.props.name}</div>
  }
}

export default class Hoc extends Component {
  render() {
    return (
      <div>
        <Kaikeba stage='React' />
        {/*} <NewKaikeba stage='React' />*/}
        {/*<Kaikeba stage='React'></Kaikeba>*/}
      </div>
    );
  }
}

// function Kaikeba(props) {
//   return <div>{props.stage}----{props.name}</div>
// }
// // 高阶组件 解决组件的复用，组件需要复用，需要简单，功能单一，如果功能单一，组件就弱了，不能解决太多事情，即出现高阶组件 HOC
// // Comp高阶组件

// const withKaikeba = Comp => {
//   // 获取name,name可能来自于接口或其他手段
//   const name = "高阶组件";
//   // props上级的属性,只关系扩展部分，其它不管
//   // return props => <Com {...props} name={name} ></Com>

//   // 重建生命周期
//   return class NewCom extends React.Component {
//   // return class extends Component { // 匿名类
//     componentDidMount() {
//       console.log('do somgthing');
//     }
//     render() {
//       return <Comp {...this.props} name={name} ></Comp>
//     }
//   }
// }

// const withLog = Comp => {
//   console.log(`${Comp.name}渲染了`);
//   return props => <Comp {...props} />;
// }

// // 执行函数
// // const NewKaikeba = withKaikeba(Kaikeba);

// // 链式调用
// const NewKaikeba = withLog(withKaikeba(withLog(Kaikeba)));

// export default class Hoc extends Component {
//   render() {
//     return (
//       <div>
//         <NewKaikeba stage='React' />
//         {/*<Kaikeba stage='React'></Kaikeba>*/}
//       </div>
//     );
//   }
// }


// const withKaikeba = Comp => {
//   // 获取name,name可能来自于接口或其他手段
//   const name = "高阶组件";
//   console.log("do something");
//   return class extends React.Component {
//     componentDidMount() {
      
//     }
//     render() {
//       return <Comp {...this.props} name={name} />;
//     }
//   };
// };

// const withLog = Comp => {
//   console.log(Comp.name + "渲染了");
//   return props => <Comp {...props} />;
// };

// @withLog
// @withKaikeba
// @withLog
// class Kaikeba extends Component {
//   render() {
//     return (
//       <div>
//         {this.props.stage}-{this.props.name}
//       </div>
//     );
//   }
// }

// // const NewKaikeba = withLog(withKaikeba(withLog(Kaikeba)));

// export default class Hoc extends Component {
//   render() {
//     return (
//       <div>
//         <Kaikeba stage="React" />
//       </div>
//     );
//   }
// }
