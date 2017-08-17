import React, {Component} from 'react'
import {sumBy} from 'lodash'

import '../css/Ready.css'

export default class Ready extends Component {
  render () {
    const totalPercent = sumBy(this.props.Teams, 'percent')
    const percentGoal = 1000
    const remainingPercent = (percentGoal - totalPercent) / 10
    const teams = this.props.Teams.length

    return (
      <div className="ready">
        <ReadyHint percent={remainingPercent} teams={teams} />
        <ReadyButton percent={remainingPercent} teams={teams} onClick={this.props.onClick} />
      </div>
    )
  }
}

function ReadyHint (props) {
  let hints = []

  if (props.teams === 0) {
    hints.push(`You need at least 2 teams`)
  } else if (props.teams === 1) {
    hints.push(`You need at least 1 more team`)
  }

  if (props.percent === 100) {
    hints.push(`Your teams' percents need to total 100%`)
  } else if (props.percent > 0) {
    hints.push(`You need ${props.percent}% more.`)
  } else if (props.percent < 0) {
    hints.push(`You're over by ${Math.abs(props.percent)}%.`)
  }

  const hintListItems = hints.map((hint, index) =>
    <li className="ready-hint__list-item" key={index}>
      {hint}
    </li>
  )

  return (
    <ol className="ready-hint__list">
      {hintListItems}
    </ol>
  )
}

function ReadyButton (props) {
  if (props.percent === 0 && props.teams > 1) {
    return (
      <button className="ready-button" onClick={props.onClick}>
        Ready
      </button>
    )
  } else {
    return false
  }
}
