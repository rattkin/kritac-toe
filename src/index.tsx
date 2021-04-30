import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>,
  value: Players
}

type Players = "X" | "O";

interface State {
  squares: Array<Players>,
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
    return (
      <div>
        <div className="status" > Next player: {this.state.nextPlayer}</div>
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
