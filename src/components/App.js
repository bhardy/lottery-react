import React, {Component} from 'react'
import {cloneDeep, find, reject, sumBy} from 'lodash'
import Footer from './Footer'
import Game from './Game'
import Header from './Header'
import Help from './Help'
import Setup from './Setup'
import createTeams from '../helpers/createTeams'
import slugify from '../helpers/slugify'

const PAGE_SETUP = 'setup'
const PAGE_HELP = 'help'
const PAGE_GAME = 'game'

class App extends Component {
  constructor () {
    super()
    let teams = localStorage.getItem('teams')
      ? JSON.parse(localStorage.getItem('teams'))
      : []
    this.state = {
      teams: teams,
      currentPage: PAGE_SETUP,
      lastPage: PAGE_SETUP,
      totalPercent: sumBy(teams, 'percent'),
      stepNumber: 0
    }
    this.setCurrentPage = this.setCurrentPage.bind(this)
    this.toggleHelp = this.toggleHelp.bind(this)
  }

  handleBallPicked (i) {
    const current = this.state.history[this.state.history.length - 1]
    const Balls = cloneDeep(current.Balls)
    Balls[i] = true

    const teams = cloneDeep(current.teams)

    let remainingCombos = 0
    for (let team of teams) {
      team.combos = team.combos.filter(combo => combo.includes(i + 1))
      remainingCombos += team.combos.length
    }

    for (let team of teams) {
      team.percent = team.combos.length / remainingCombos * 1000
    }

    this.setState({
      history: [...this.state.history, {Balls, teams}],
      stepNumber: this.state.history.length
    })
  }

  jumpToStep (stepNumber) {
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
      let newTeams = [...teams, team]
      this.setState({
        teams: newTeams,
        totalPercent: sumBy(newTeams, 'percent')
      })
      localStorage.setItem('teams', JSON.stringify([...teams, team]))
    }
  }

  removeTeam (team) {
    let teams = reject(this.state.teams, {name: team})
    this.setState({
      teams: teams,
      totalPercent: sumBy(teams, 'percent')
    })
    localStorage.setItem('teams', JSON.stringify(teams))
  }

  startGame () {
    this.setState({
      currentPage: PAGE_GAME,
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
      currentPage: PAGE_SETUP,
      stepNumber: 0,
      teams: reject(this.state.teams, {name: 're-draw'})
    })
  }

  toggleHelp () {
    if (this.state.currentPage === PAGE_HELP) {
      this.setCurrentPage(this.state.lastPage)
    } else {
      this.setCurrentPage(PAGE_HELP)
    }
  }

  setCurrentPage (page) {
    this.setState({
      lastPage: this.state.currentPage,
      currentPage: page
    })
  }

  render () {
    let child = null

    switch (this.state.currentPage) {
      case PAGE_HELP:
        child = (
          <div className="site-content help-content">
            <Help />
          </div>
        )
        break
      case PAGE_SETUP:
        child = (
          <div className="site-content">
            <Setup
              teams={this.state.teams}
              totalPercent={this.state.totalPercent}
              addTeam={team => this.addTeam(team)}
              removeTeam={team => this.removeTeam(team)}
              startGame={() => this.startGame()}
            />
          </div>
        )
        break
      case PAGE_GAME:
        child = (
          <div className="site-content site-content--game">
            <Game
              history={this.state.history}
              stepNumber={this.state.stepNumber}
              handleClick={i => this.handleBallPicked(i)}
              handleUndo={() => this.handleUndo()}
              restartGame={() => this.restartGame()}
              jumpTo={step => this.jumpToStep(step)}
            />
          </div>
        )
        break
      default:
        break
    }

    return (
      <main className="site">
        <Header
          onClick={this.toggleHelp}
          currentPage={this.state.currentPage}
        />
        {child}
        <Footer />
      </main>
    )
  }
}

export default App
