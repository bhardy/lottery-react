import React, {Component} from 'react'
import classnames from 'classnames'

export default class Moves extends Component {
  render () {
    return (
      <ol className="game-stage__list">
        {this.props.history.map((step, index) => {
          const desc = index ? 'Pull #' + index : 'Game start'
          return (
            <li className="game-stage__list-item" key={index}>
              <button
                className={classnames('cool-button game-stage__button', {
                  'game-stage__button--active': this.props.stepNumber === index
                })}
                onClick={() => this.props.jumpTo(index)}
              >
                {desc}
              </button>
            </li>
          )
        })}
      </ol>
    )
  }
}
