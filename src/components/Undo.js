import React, { Component } from 'react'

export default class Undo extends Component {
  render() {
    return (
      <button className="undo" onClick={this.props.onClick}>
        Undo
      </button>
    )
  }
}
