import React, {Component} from 'react'
import numeral from 'numeral'
import slugify from '../helpers/slugify'
import '../css/AddTeams.css'

class TeamListItem extends Component {
  render () {
    return (
      <li className="add-teams__list-item">
        <span className="add-teams__team-name">{this.props.name}</span>
        <span className="add-teams__team-percent">
          {numeral(this.props.percent / 1000).format('0.0%')}
        </span>
        <button
          onClick={() => this.props.remove(this.props.name)}
          className="add-teams__team-remove"
        >
          ×
          <span className="sr-only">Remove</span>
        </button>
      </li>
    )
  }
}

function Empty () {
  return <li className="add-teams__list-item--empty">Add some teams</li>
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
    let addDisabled = false
    if (this.props.totalPercent >= 1000) {
      addDisabled = true
    }
    return (
      <form
        className="add-teams__form"
        ref="teamForm"
        onSubmit={this.createTeam.bind(this)}
      >
        <label className="add-teams__label">
          <span className="add-teams__hint">Team Name</span>
          <input
            className="add-teams__input"
            ref="name"
            type="text"
            placeholder="Team 1"
            required
          />
        </label>
        <label className="add-teams__label">
          <span className="add-teams__hint">Percentage</span>
          <input
            className="add-teams__input"
            ref="percentage"
            type="number"
            step=".1"
            min="0.1"
            max="99.9"
            placeholder="49.9"
            required
          />
        </label>
        <button
          disabled={addDisabled}
          className="cool-button add-teams__submit"
          type="submit"
        >
          Add Team
        </button>
      </form>
    )
  }
}

export default class AddTeams extends Component {
  render () {
    let teams = this.props.Teams

    const teamListItems = teams.map(team => (
      <TeamListItem
        name={team.name}
        percent={team.percent}
        key={slugify(team.name)}
        remove={this.props.removeTeam}
      />
    ))

    return (
      <div className="create-teams">
        <ul className="add-teams__list">
          {teamListItems.length > 0 ? teamListItems : <Empty />}
        </ul>
        <AddTeam
          totalPercent={this.props.totalPercent}
          onSubmit={this.props.addTeam}
        />
      </div>
    )
  }
}
