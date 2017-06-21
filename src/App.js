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
        <li className="ball__list-item">{this.renderBall(0)}</li>
        <li className="ball__list-item">{this.renderBall(1)}</li>
        <li className="ball__list-item">{this.renderBall(2)}</li>
        <li className="ball__list-item">{this.renderBall(3)}</li>
        <li className="ball__list-item">{this.renderBall(4)}</li>
        <li className="ball__list-item">{this.renderBall(5)}</li>
        <li className="ball__list-item">{this.renderBall(6)}</li>
        <li className="ball__list-item">{this.renderBall(7)}</li>
        <li className="ball__list-item">{this.renderBall(8)}</li>
        <li className="ball__list-item">{this.renderBall(9)}</li>
        <li className="ball__list-item">{this.renderBall(10)}</li>
        <li className="ball__list-item">{this.renderBall(11)}</li>
        <li className="ball__list-item">{this.renderBall(12)}</li>
        <li className="ball__list-item">{this.renderBall(13)}</li>
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
        <Teams/>
      </div>
    );
  }
}

class Teams extends Component {
  render() {
    const odds = [
      {
        name: "Twelfth",
        percent: 400
      },
      {
        name: "Eleventh",
        percent: 250
      },
      {
        name: "Tenth",
        percent: 150
      },
      {
        name: "Ninth",
        percent: 100
      },
      {
        name: "Eighth",
        percent: 60
      },
      {
        name: "Seventh",
        percent: 40
      },
      {
        name: "Redraw",
        percent: 1
      }
    ]

    let combos = combinations([1,2,3,4,5,6,7,8,9,10,11,12,13,14], 4);
    let teams = odds.slice();

    for(let team of teams) {
      team.combos = [];
      for(let i = 0; i < team.percent; i++) {
        team.combos.push(combos.pop());
      }
      team.percent = team.combos.length / 10;
    }

    const listItems = teams.map((team) =>
      <li className="team-list-item" key={team.name}>{team.name}: {team.percent}%</li>
    );

    return (
      <div className="teams">
        <h2>Odds</h2>
        <ul className="team__list">
          {listItems}
        </ul>
      </div>
    );
  }
}

function calculateWinner (balls) {
  return null
}

export default App;
