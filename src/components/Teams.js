import React, { Component } from 'react'
import numeral from 'numeral'

import '../css/Teams.css'

export default class Teams extends Component {
  render() {
    let teams = this.props.teams

    const teamListItems = teams.map((team) =>
      <li className="team__list-item" key={team.name}>
        {team.name}: {numeral(team.percent).format('0.0%')}
        <ul className="team-combo__list">
          {team.combos.map((combo) =>
            <li className="team-combo__list-item" key={combo.join('-')}>
              {combo.join(', ')}
            </li>
          )}
        </ul>
      </li>
    )

    return (
      <div className="teams">
        <h2>Odds</h2>
        <ul className="team__list">
          {teamListItems}
        </ul>
      </div>
    );
  }
}
