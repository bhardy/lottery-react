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
        className="team__list-item"
        onClick={() => this.setState({opened: !this.state.opened})}
      >
        {this.props.name}: {numeral(this.props.percent / 1000).format('0.0%')}
        <ul
          className={classnames('team-combo__list', {
            'team-combo__list--opened': this.state.opened
          })}
        >
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
        <ul className="team__list">
          {teamListItems}
        </ul>
      </div>
    )
  }
}
