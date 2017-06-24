import React, { Component } from 'react'
import { find, cloneDeep } from 'lodash'
import Board from './Board'
import Winner from './Winner'
import Teams from './Teams'
import createTeams from '../helpers/createTeams'

import '../css/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      history: [{
        teams: createTeams(),
        Balls: Array(14).fill(false)
      }],
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const historyIndex = this.state.history.length - 1;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[historyIndex];
    const Balls = current.Balls.slice();
    Balls[i] = true;

    const teams = cloneDeep(current.teams)
    let updatePercents = false

    Balls.forEach(function(value, index) {
      if (value === true) {
        updatePercents = true
        let ball = index + 1

        for (let team of teams) {
          team.combos = team.combos.filter((combo) => combo.includes(ball))
        }
      }
    })

    if (updatePercents) {
      let remainingCombos = 0;
      for (let team of teams) {
        remainingCombos += team.combos.length
      }

      for (let team of teams) {
        team.percent = team.combos.length / remainingCombos
      }
    }


    this.setState({
      history: history.concat([{
        Balls,
        teams
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

    let boardNode = (
      <Board
        Balls={current.Balls}
        onClick={(i) => this.handleClick(i)}
      />
    )

    if (this.state.stepNumber === 4) {
      boardNode = <Winner name={find(current.teams, t => t.percent === 1).name} />
    }

    return (
      <div className="game">
        <div className="game-board">
            {boardNode}
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
        <Teams {...current} />
      </div>
    );
  }
}

function calculateWinner (balls) {
  return null
}

export default App;
