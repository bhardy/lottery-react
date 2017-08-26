import React, {Component} from 'react'

export default class Restart extends Component {
  render () {
    return (
      <button className="game-restart cool-button" onClick={this.props.onClick}>
        Change Teams
      </button>
    )
  }
}
