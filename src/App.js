import React, { Component } from 'react';
import combinations from './combinations';
import './App.css';

function Ball(props) {
  return (
    <input
      name={props.index}
      type="checkbox"
      className="ball"
      onClick={props.onClick}
      checked={props.check}
    />
  );
}

class Board extends Component {
  renderBall (i) {
    return (
      <Ball
        index={i}
        check={this.props.Balls[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <ol className="ball__list">
        <li className="ball_list-item">{this.renderBall(0)}</li>
        <li className="ball_list-item">{this.renderBall(1)}</li>
        <li className="ball_list-item">{this.renderBall(2)}</li>
        <li className="ball_list-item">{this.renderBall(3)}</li>
        <li className="ball_list-item">{this.renderBall(4)}</li>
        <li className="ball_list-item">{this.renderBall(5)}</li>
        <li className="ball_list-item">{this.renderBall(6)}</li>
        <li className="ball_list-item">{this.renderBall(7)}</li>
        <li className="ball_list-item">{this.renderBall(8)}</li>
        <li className="ball_list-item">{this.renderBall(9)}</li>
        <li className="ball_list-item">{this.renderBall(10)}</li>
        <li className="ball_list-item">{this.renderBall(11)}</li>
        <li className="ball_list-item">{this.renderBall(12)}</li>
        <li className="ball_list-item">{this.renderBall(13)}</li>
      </ol>
    );
  }
}

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
      </div>
    );
  }
}

function calculateWinner (balls) {

  const teams = [
    {
      name: "Twelfth",
      combos: 400
    },
    {
      name: "Eleventh",
      combos: 250
    },
    {
      name: "Tenth",
      combos: 150
    },
    {
      name: "Ninth",
      combos: 100
    },
    {
      name: "Eighth",
      combos: 60
    },
    {
      name: "Seventh",
      combos: 40
    },
    {
      name: "Redraw",
      combos: 1
    }
  ]

  const combos = combinations([1,2,3,4,5,6,7,8,9,10,11,12,13,14], 4)

  return null
}

export default App;
