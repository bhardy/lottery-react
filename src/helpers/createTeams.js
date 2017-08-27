import combinations from './combinations'
import {reduce, shuffle, orderBy} from 'lodash'

export default function createTeams (teams) {
  let total = reduce(
    teams,
    function (sum, team) {
      return sum + team.percent
    },
    0
  )

  if (total === 1000) {
    teams.push({name: 're-draw', percent: 1})
    const combos = shuffle(
      combinations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 4)
    )

    for (let team of teams) {
      team.combos = []
      for (let i = 0; i < team.percent; i++) {
        team.combos.push(combos.pop())
      }
      team.percent = team.combos.length
    }
  }

  teams = orderBy(teams, ['percent', 'name'], ['desc', 'asc'])

  return teams
}
