import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// 项目启动会报错，存在问题 React Developer Tools版本问题，关了就OK

// class Square extends React.Component {
//   // 在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。
//   // 在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value: null,
      
//   //   };
//   // }
//   // onClick={() => { this.setState({value: 'X'}) }}
//   // 在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。
//   render() {
//     return (
//       <button 
//         className="square"
//         onClick={() => { this.props.onClick() }}
//       >
//         {/* TODO */}
//         { this.props.value }
//       </button>
//     );
//   }
// }

// 函数组件: 如果组件只包含一个 render 方法，并且不包含 state
function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value }
    </button>
  );
}

// class Board extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       squares: Array(9).fill(null),
//       xIsNext: true,
//     };
//   }
//   handClick(i) {
//     console.log(this.state.squares);
//     // slice() 方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。
//     // const squares = this.state.squares.slice();
//     // squares[i] = this.state.xIsNext ? 'X' : 'O';
//     // this.setState({
//     //   squares: squares,
//     //   xIsNext: !this.state.xIsNext
//     // })
//     const squares = this.state.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       squares: squares,
//       xIsNext: !this.state.xIsNext,
//     });
//   }
//   renderSquare(i) {
//     // 给子组件传递一个value值
//     return (
//       <Square 
//         value={this.state.squares[i]}
//         onClick={() => this.handClick(i)}
//       />
//     );
//     // 为了提高可读性，我们把返回的 React 元素拆分成了多行，同时在最外层加了小括号，
//     // 这样 JavaScript 解析的时候就不会在 return 的后面自动插入一个分号从而破坏代码结构了。
//   }

//   render() {
//     // const status = `Next player: (${this.state.xIsNext ? 'X' : 'O'})`;
//     const winner = calculateWinner(this.state.squares);
//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

class Board extends React.Component {
  // handleClick(i) {
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    // concat不会改变原数组
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );
