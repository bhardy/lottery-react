import React, {Component} from 'react'
import numeral from 'numeral'
// import classnames from 'classnames'

import '../css/Setup.css'
import '../css/CreateTeams.css'

class TeamListItem extends Component {
  constructor () {
    super()
    this.state = {
      remainingPercent: 100
    }
  }

  render () {
    return (
      <li className="create-teams__list-item">
        <span className="create-teams__team-name">
          {this.props.name}
        </span>
        <span className="create-teams__team-percent">
          {numeral(this.props.percent / 1000).format('0.0%')}
        </span>
        <button
          onClick={() => this.props.remove(this.props.name)}
          className="create-teams__team-remove"
        >
          Remove
        </button>
      </li>
    )
  }
}

function Empty () {
  return <li className="create-teams__list-item--empty">Add some teams</li>
}

class AddTeam extends Component {
  createTeam (e) {
    e.preventDefault()

    this.props.onSubmit({
      name: this.refs.name.value,
      percent: this.refs.percentage.value * 10
    })

    this.refs.teamForm.reset()
    this.refs.name.focus()
  }

  render () {
    return (
      <form
        className="create-teams__form"
        ref="teamForm"
        onSubmit={this.createTeam.bind(this)}
      >
        <label className="create-teams__label">
          Team Name
          <input
            className="create-teams__input"
            ref="name"
            type="text"
            placeholder="Team 1"
            required
          />
        </label>
        <label className="create-teams__label">
          Percentage
          <input
            className="create-teams__input"
            ref="percentage"
            type="number"
            step=".1"
            min="0.1"
            max="99.9"
            placeholder="49.9"
            required
          />
        </label>
        <button className="create-teams__submit" type="submit">
          Add Team
        </button>
      </form>
    )
  }
}

export default class CreateTeams extends Component {
  render () {
    let teams = this.props.Teams

    const teamListItems = teams.map(team =>
      <TeamListItem
        name={team.name}
        percent={team.percent}
        key={team.name}
        remove={this.props.removeTeam}
      />
    )

    return (
      <div className="create-teams">
        <ul className="create-teams__list">
          {teamListItems.length > 0 ? teamListItems : <Empty />}
        </ul>
        <AddTeam onSubmit={this.props.addTeam} />
      </div>
    )
  }
}
