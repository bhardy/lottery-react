import React, {Component} from 'react'
import numeral from 'numeral'
import classnames from 'classnames'

import '../css/Teams.css'

class Team extends Component {
  constructor () {
    super()
    this.state = {opened: false}
  }

  render () {
    return (
      <li
        className={classnames('team__list-item', {
          'team__list-item--opened': this.state.opened
        })}
        onClick={() => this.setState({opened: !this.state.opened})}
      >
        <span className="team__name">
          {this.props.name}
        </span>
        <span className="team__percent">
          {numeral(this.props.percent / 1000).format('0.0%')}
        </span>
        <ul className="team-combo__list">
          {this.props.combos.map(combo =>
            <li className="team-combo__list-item" key={combo.join('-')}>
              {combo.join(', ')}
            </li>
          )}
        </ul>
      </li>
    )
  }
}

export default class TeamList extends Component {
  render () {
    let teams = this.props.teams

    const teamListItems = teams.map(team =>
      <Team
        name={team.name}
        percent={team.percent}
        combos={team.combos}
        key={team.name}
      />
    )

    return (
      <div className="teams">
        <h2 className="game__subheading">Teams</h2>
        <ul className="team__list">
          {teamListItems}
        </ul>
      </div>
    )
  }
}
