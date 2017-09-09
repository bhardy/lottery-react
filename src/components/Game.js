import React, {Component} from 'react'
import {find} from 'lodash'
import Board from './Board'
import Teams from './Teams'
import Winner from './Winner'
import Moves from './Moves'
import '../css/Game.css'

export default class Game extends Component {
  render () {
    const history = this.props.history
    const stepNumber = this.props.stepNumber
    const current = history[stepNumber]

    let winnerNode
    if (this.props.stepNumber === 4) {
      winnerNode = (
        <Winner name={find(current.teams, t => t.percent === 1000).name} />
      )
    }

    return (
      <section className="game">
        {winnerNode}
        <div className="game-board">
          <h2 className="game__subheading">Draw</h2>
          <Board
            Balls={current.Balls}
            onClick={i => this.props.handleClick(i)}
            disableAll={this.props.stepNumber < this.props.history.length - 1}
          />
        </div>
        <Teams {...current} />
        <nav className="game-stage">
          <h2 className="game-stage__heading">Game Stage</h2>
          <Moves
            stepNumber={this.props.stepNumber}
            history={this.props.history}
            jumpTo={this.props.jumpTo}
          />
        </nav>
        <nav className="game-controls">
          <h2 className="game-controls__heading">Options</h2>
          <ul className="game-controls__list">
            {this.props.stepNumber ? (
              <li className="game-controls__list">
                <button
                  className="game-undo cool-button"
                  onClick={() => this.props.handleUndo()}
                >
                  Undo Draw
                </button>
              </li>
            ) : null}
            <li className="game-controls__list">
              <button
                className="game-restart cool-button"
                onClick={() => this.props.restartGame()}
              >
                Change Teams
              </button>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}
