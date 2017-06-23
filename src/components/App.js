import React, { Component } from 'react'

import Board from './Board'
import Teams from './Teams'

import '../css/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      history: [{
        Balls: Array(14).fill(false)
      }],
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const Balls = current.Balls.slice();
    // if (calculateWinner(Balls) || Balls[i]) {
    //   return;
    // }
    Balls[i] = true;
    this.setState({
      history: history.concat([{
        Balls: Balls
      }]),
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.Balls);
    // const winner = calculateWinner(history);

    const moves = history.map((step, move) => {
      const desc = move ?
      'Pull #' + move :
        'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Pull Another';
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            Balls={current.Balls}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <Teams
          Balls={current.Balls}
        />
      </div>
    );
  }
}

function calculateWinner (balls) {
  return null
}

export default App;
