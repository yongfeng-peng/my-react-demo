import React, { Component } from 'react'

// 展示组件负责根据props显示信息
// function Comment({data}) {
//   console.log('render comment'); // 执行了4次
//   return (
//     <div>
//       <div>{data.body}</div>
//       <div>---{data.author}</div>
//     </div>
//   );
// }

// class Comment extends React.Component{
//   // 生命周期进行比较 新状态nextProps 与 data比较
//   // 弊端： 比较累赘
//   shouldComponentUpdate(nextProps) {
//     if (nextProps.data.body === this.props.data.body &&
//       nextProps.data.author === this.props.data.author) {
//       return false;
//     }
//     return true;
//   }  

//   render() {
//     console.log('render comment'); // 执行了2次
//     return (
//       <div>
//         <p>{this.props.data.body}</p>
//         <p> --- {this.props.data.author}</p>
//       </div>
//     );
//   }
// }

// 使用PureComponent （15.3 版本） 浅比较，避免对象比较（引用类型），挖掘太深，也没有达到效果
// 解决 数据没有变 render函数不执行
// 传值类型、或者避免引用类型的地址不变（尽量一层）
// class Comment extends React.PureComponent{
//   render() {
//     console.log('render comment');
//     return (
//       <div>
//         <p>{this.props.body}</p>
//         <p> --- {this.props.author}</p>
//       </div>
//     );
//   }
// }

// memo高阶组件（也是一个函数，接收一个组件、返回一个全新的组件）,也是浅比较（实现原理和使用PureComponent一样，解决了以前函数组件不能使用PureComponent）
// React v16.6.0 之后的版本，可以使用 React.memo 让函数式的组件也有PureComponent的功能
const Comment = React.memo(function(props) {
  console.log('render Comment'); // 执行两次
  return (
    <div>
      <p>{props.body}</p>
      <p> --- {props.author}</p>
    </div>
  );
});

// 容器组件负责数据获取
export default class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    setTimeout(() => {
    // 不断轮询比较、耗费🆓
    // setInterval(() => { // 每次生成的是全新数组
      this.setState({
        comments: [
          { body: 'react is very good', author: 'facebook' },
          { body: 'vue is very good', author: 'youyuxi' }
        ]
      })
    }, 1000);
  }
  render() {
    return (
      <div>
        {
          this.state.comments.map((item, index) => (
            // <Comment data={item} key={index}></Comment>
            // <Comment key={index} body={item.body} author={item.author} />
            <Comment key={index} {...item} />
          ))
        }
      </div>
    );
  }
}



