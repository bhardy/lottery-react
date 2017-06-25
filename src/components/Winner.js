import React, { Component } from 'react'
import Confetti from 'react-confetti'
import '../css/Winner.css'

class Winner extends Component {
  render () {
    return (
      <div className="winner">
        <h2 className="winner__heading"><marquee>{this.props.name}</marquee></h2>
        <Confetti style={{'top': '-1px'}}/>
      </div>
    )
  }
}

export default Winner
