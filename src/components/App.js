import React, { Component } from 'react'
import { find, cloneDeep } from 'lodash'
import Board from './Board'
import Winner from './Winner'
import Teams from './Teams'
import Undo from './Undo'
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
    const current = this.state.history[this.state.history.length - 1]
    const Balls = cloneDeep(current.Balls)
    Balls[i] = true

    const teams = cloneDeep(current.teams)
    let updatePercents = false

    Balls.forEach(function(value, index) {
      if (value) {
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
      history: [...this.state.history, { Balls, teams }],
      stepNumber: this.state.history.length,
    });
  }

  jumpTo(stepNumber) {
    this.setState({ stepNumber })
  }

  handleUndo() {
    this.setState({
      history: this.state.history.slice(0, this.state.history.length - 1),
      stepNumber: this.state.stepNumber -1
    })
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
        disableAll={this.state.stepNumber < this.state.history.length - 1}
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
        { this.state.stepNumber ? <Undo onClick={() => this.handleUndo()} /> : null}
        <Teams {...current} />
      </div>
    );
  }
}

export default App;
