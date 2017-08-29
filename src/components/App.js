import React, {Component} from 'react'
import {find, cloneDeep, reject} from 'lodash'
import Footer from './Footer'
import Game from './Game'
import Header from './Header'
import Help from './Help'
import Setup from './Setup'
import createTeams from '../helpers/createTeams'
import slugify from '../helpers/slugify'

class App extends Component {
  constructor () {
    super()
    this.state = {
      teams: localStorage.getItem('teams')
        ? JSON.parse(localStorage.getItem('teams'))
        : [],
      help: false,
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
      localStorage.setItem('teams', JSON.stringify([...teams, team]))
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

  toggleHelp () {
    this.setState({
      help: !this.state.help
    })
  }

  render () {
    if (this.state.help) {
      return (
        <main className="site">
          <Header onClick={() => this.toggleHelp()} help={this.state.help} />
          <div className="site-content help-content">
            <Help />
          </div>
          <Footer />
        </main>
      )
    } else if (this.state.setup) {
      return (
        <main className="site">
          <Header onClick={() => this.toggleHelp()} help={this.state.help} />
          <div className="site-content">
            <Setup
              teams={this.state.teams}
              addTeam={team => this.addTeam(team)}
              removeTeam={team => this.removeTeam(team)}
              startGame={() => this.startGame()}
            />
          </div>
          <Footer />
        </main>
      )
    } else {
      return (
        <main className="site">
          <Header onClick={() => this.toggleHelp()} help={this.state.help} />
          <div className="site-content site-content--game">
            <Game
              history={this.state.history}
              stepNumber={this.state.stepNumber}
              handleClick={i => this.handleClick(i)}
              handleUndo={() => this.handleUndo()}
              restartGame={() => this.restartGame()}
              jumpTo={step => this.jumpTo(step)}
            />
          </div>
          <Footer />
        </main>
      )
    }
  }
}

export default App
