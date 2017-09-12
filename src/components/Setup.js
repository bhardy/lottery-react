import React, {Component} from 'react'
import {connect} from 'react-redux'
import {find, sumBy} from 'lodash'
import {addTeam, removeTeam} from '../actions'
import AddTeams from './AddTeams'
import Ready from './Ready'
import slugify from '../helpers/slugify'
import '../css/Setup.css'

class Setup extends Component {
  handleAddTeam (team) {
    if (find(this.props.teams, o => slugify(o.name) === slugify(team.name))) {
      alert('You cannot add 2 teams with the same name')
      return
    }
    this.props.addTeam(team)
  }

  render () {
    return (
      <section className="setup">
        <h1 className="setup__heading">Setup</h1>
        <AddTeams
          Teams={this.props.teams}
          addTeam={e => this.handleAddTeam(e)}
          removeTeam={e => this.props.removeTeam(e)}
          totalPercent={this.props.totalPercent}
        />
        <Ready
          Teams={this.props.teams}
          onClick={() => this.props.startGame()}
          totalPercent={this.props.totalPercent}
        />
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    teams: state.teams,
    totalPercent: sumBy(state.teams, 'percent')
  }
}

const mapDispatchToProps = {
  addTeam,
  removeTeam
}

export default connect(mapStateToProps, mapDispatchToProps)(Setup)
