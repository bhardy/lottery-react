import React, {Component} from 'react'

export default class Undo extends Component {
  render () {
    return (
      <button className="game-undo cool-button" onClick={this.props.onClick}>
        Undo Draw
      </button>
    )
  }
}
