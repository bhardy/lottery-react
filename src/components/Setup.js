import React, {Component} from 'react'
import AddTeams from './AddTeams'
import Ready from './Ready'
import '../css/Setup.css'

export default class Setup extends Component {
  render () {
    return (
      <section className="setup">
        <h1 className="setup__heading">Setup</h1>
        <AddTeams
          Teams={this.props.teams}
          addTeam={e => this.props.addTeam(e)}
          removeTeam={e => this.props.removeTeam(e)}
        />
        <Ready
          Teams={this.props.teams}
          onClick={() => this.props.startGame()}
        />
      </section>
    )
  }
}
