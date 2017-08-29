import React, {Component} from 'react'
import {find} from 'lodash'
import classnames from 'classnames'
import Board from './Board'
import Restart from './Restart'
import Teams from './Teams'
import Undo from './Undo'
import Winner from './Winner'
import '../css/Game.css'

export default class Game extends Component {
  render () {
    const history = this.props.history
    const stepNumber = this.props.stepNumber
    const current = history[stepNumber]

    const moves = history.map((step, move) => {
      const desc = move ? 'Pull #' + move : 'Game start'
      return (
        <li className="game-stage__list-item" key={move}>
          <button
            className={classnames('cool-button game-stage__button', {
              'game-stage__button--active': stepNumber === move
            })}
            onClick={() => this.props.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      )
    })

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
          <ol className="game-stage__list">
            {moves}
          </ol>
        </nav>
        <nav className="game-controls">
          <h2 className="game-controls__heading">Options</h2>
          <ul className="game-controls__list">
            {this.props.stepNumber
              ? <li className="game-controls__list">
                  <Undo onClick={() => this.props.handleUndo()} />
                </li>
              : null}
            <li className="game-controls__list">
              <Restart onClick={() => this.props.restartGame()} />
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}
