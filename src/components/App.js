import React, {Component} from 'react'
import {find, cloneDeep, reject} from 'lodash'
import Board from './Board'
import Winner from './Winner'
import CreateTeams from './CreateTeams'
import Ready from './Ready'
import Teams from './Teams'
import Undo from './Undo'
import createTeams from '../helpers/createTeams'

import '../css/App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      // teams: [],
      // Debug Set
      teams: [
        {name: 'dustin', percent: 500},
        {name: 'derrick', percent: 400},
        {name: 'brant', percent: 100}
      ],
      setup: true,
      stepNumber: 0
    }
  }

  handleClick (i) {
    const current = this.state.history[this.state.history.length - 1]
    const Balls = cloneDeep(current.Balls)
    Balls[i] = true

    const teams = cloneDeep(current.teams)
    let updatePercents = false

    Balls.forEach(function (value, index) {
      if (value) {
        updatePercents = true
        let ball = index + 1

        for (let team of teams) {
          team.combos = team.combos.filter(combo => combo.includes(ball))
        }
      }
    })

    if (updatePercents) {
      let remainingCombos = 0
      for (let team of teams) {
        remainingCombos += team.combos.length
      }

      for (let team of teams) {
        team.percent = team.combos.length / remainingCombos * 1000
      }
    }

    this.setState({
      history: [...this.state.history, {Balls, teams}],
      stepNumber: this.state.history.length
    })
  }

  jumpTo (stepNumber) {
    this.setState({stepNumber})
  }

  handleUndo () {
    this.setState({
      history: this.state.history.slice(0, this.state.history.length - 1),
      stepNumber: this.state.stepNumber - 1
    })
  }

  addTeam (team) {
    let teams = this.state.teams

    if (find(teams, {name: team.name})) {
      alert('You cannot add 2 teams with the same name')
    } else {
      teams.push(team)

      this.setState({
        teams: teams
      })
    }
  }

  removeTeam (team) {
    let teams = this.state.teams
    teams = reject(teams, {name: team})

    this.setState({
      teams: teams
    })
  }

  startGame () {
    let teams = this.state.teams
    teams = createTeams(teams)

    this.setState({
      setup: false,
      history: [
        {
          teams: teams,
          Balls: Array(14).fill(false)
        }
      ]
    })
  }

  render () {
    if (this.state.setup) {
      return (
        <div className="site-content">
          <div className="setup">
            <h1>Setup</h1>
            <CreateTeams
              Teams={this.state.teams}
              addTeam={e => this.addTeam(e)}
              removeTeam={e => this.removeTeam(e)}
            />
            <Ready Teams={this.state.teams} onClick={() => this.startGame()} />
          </div>
        </div>
      )
    } else {
      const history = this.state.history
      const current = history[this.state.stepNumber]

      const moves = history.map((step, move) => {
        const desc = move ? 'Pull #' + move : 'Game start'
        return (
          <li className="game-info__list-item" key={move}>
            <button onClick={() => this.jumpTo(move)}>
              {desc}
            </button>
          </li>
        )
      })

      let winnerNode
      if (this.state.stepNumber === 4) {
        winnerNode = (
          <Winner name={find(current.teams, t => t.percent === 1000).name} />
        )
      }

      return (
        <div className="site-content">
          <div className="game">
            {winnerNode}
            <h1 className="game-heading">Draw</h1>
            <div className="game-board">
              <Board
                Balls={current.Balls}
                onClick={i => this.handleClick(i)}
                disableAll={
                  this.state.stepNumber < this.state.history.length - 1
                }
              />
            </div>
            <Teams {...current} />
            <div className="game-info">
              <ol className="game-info__list">
                {moves}
              </ol>
            </div>
            {this.state.stepNumber
              ? <Undo onClick={() => this.handleUndo()} />
              : null}
          </div>
        </div>
      )
    }
  }
}

export default App
