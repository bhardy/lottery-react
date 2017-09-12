import React, {Component} from 'react'
import {connect} from 'react-redux'
import {cloneDeep, reject} from 'lodash'
import {setCurrentPage} from '../actions'
import Footer from './Footer'
import Game from './Game'
import Header from './Header'
import Help from './Help'
import Setup from './Setup'
import createTeams from '../helpers/createTeams'
import * as global from '../variables'

class App extends Component {
  constructor () {
    super()
    this.state = {
      stepNumber: 0
    }
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

  startGame () {
    this.setState({
      history: [
        {
          teams: createTeams(this.props.teams),
          Balls: Array(14).fill(false)
        }
      ]
    })
    this.props.setCurrentPage(global.PAGE_GAME)
  }

  restartGame () {
    this.setState({
      stepNumber: 0,
      teams: reject(this.state.teams, {name: 're-draw'})
    })
    this.props.setCurrentPage(global.PAGE_SETUP)
  }

  render () {
    let child = null

    switch (this.props.currentPage) {
      case global.PAGE_HELP:
        child = (
          <div className="site-content help-content">
            <Help />
          </div>
        )
        break
      case global.PAGE_SETUP:
        child = (
          <div className="site-content">
            <Setup startGame={() => this.startGame()} />
          </div>
        )
        break
      case global.PAGE_GAME:
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
        <Header />
        {child}
        <Footer />
      </main>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage,
    teams: state.teams
  }
}

const mapDispatchToProps = {
  setCurrentPage
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
