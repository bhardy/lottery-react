import React, {Component} from 'react'
import {find, cloneDeep, reject} from 'lodash'
import classnames from 'classnames'
import Board from './Board'
import Winner from './Winner'
import AddTeams from './AddTeams'
import Ready from './Ready'
import Teams from './Teams'
import Undo from './Undo'
import Restart from './Restart'
import createTeams from '../helpers/createTeams'
import slugify from '../helpers/slugify'

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
        {name: 'darlisa', percent: 70},
        {name: 'brant', percent: 30}
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

    if (find(teams, o => slugify(o.name) === slugify(team.name))) {
      alert('You cannot add 2 teams with the same name')
    } else {
      this.setState({
        teams: [...teams, team]
      })
    }
  }

  removeTeam (team) {
    // TODO: is this mutating?
    let teams = this.state.teams
    teams = reject(teams, {name: team})

    this.setState({
      teams: teams
    })
  }

  startGame () {
    this.setState({
      setup: false,
      history: [
        {
          teams: createTeams(this.state.teams),
          Balls: Array(14).fill(false)
        }
      ]
    })
  }

  restartGame () {
    this.setState({
      setup: true,
      stepNumber: 0,
      teams: reject(this.state.teams, {name: 're-draw'})
    })
  }

  render () {
    if (this.state.setup) {
      return (
        <div className="site-content">
          <div className="setup">
            <h1>Setup</h1>
            <AddTeams
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
          <li className="game-stage__list-item" key={move}>
            <button
              className="cool-button game-stage__button"
              onClick={() => this.jumpTo(move)}
            >
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
        <div
          className={classnames('site-content', {
            'site-content--game': !this.state.setup
          })}
        >
          <div className="game">
            {winnerNode}
            <h1 className="game-heading">Odds.cool Lottery Machine</h1>
            <div className="game-board">
              <h2 className="game__subheading">Draw</h2>
              <Board
                Balls={current.Balls}
                onClick={i => this.handleClick(i)}
                disableAll={
                  this.state.stepNumber < this.state.history.length - 1
                }
              />
            </div>
            <Teams {...current} />
            <nav className="game-stage">
              <h2 className="game-stage__heading">Game Stage</h2>
              <ol className="game-stage__list">
                {moves}
              </ol>
            </nav>
            <nav className="game-controls">
              <h2 className="game-controls__heading">Options</h2>
              <ul className="game-controls__list">
                {this.state.stepNumber
                  ? <li className="game-controls__list">
                      <Undo onClick={() => this.handleUndo()} />
                    </li>
                  : null}
                <li className="game-controls__list">
                  <Restart onClick={() => this.restartGame()} />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )
    }
  }
}

export default App
