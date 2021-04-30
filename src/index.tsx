import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>,
  value: Players
}

type Players = "X" | "O";

type Squares = Array<Players>

interface State {
  squares: Squares,
  nextPlayer: Players,
}


function Square(props: Props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      { props.value}
    </button>
  );
}



class Board extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextPlayer: 'X'
    };
  }

  handleClick(i: number) {
    console.log('clicked ' + i)

    if (!calculateWinner(this.state.squares)) {

      const squares = this.state.squares.slice();
      squares[i] = this.state.nextPlayer === 'X' ? "X" : "O";

      let nextPlayer: Players;
      if (this.state.nextPlayer === 'X') {
        nextPlayer = 'O';
      } else {
        nextPlayer = 'X';
      }

      this.setState({ squares: squares, nextPlayer: nextPlayer })
    }

  }


  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)
        }
      />
    );
  }

  render() {

    const winner = calculateWinner(this.state.squares);

    let status: string;

    if (winner) {
      status = 'The winner is: ' + winner;
    } else {
      status =
        'Next player:' + this.state.nextPlayer;
    }

    return (
      <div>
        <div className="status" > {status}</div>
        <div className="board-row" >
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row" >
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row" >
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



class Game extends React.Component {
  render() {
    return (
      <div className="game" >
        <div className="game-board" >
          <Board />
        </div>
        < div className="game-info" >
          <div>{/* status */} </div>
          < ol > {/* TODO */} </ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares: Squares) {
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