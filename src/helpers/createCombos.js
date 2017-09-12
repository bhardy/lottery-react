import {shuffle} from 'lodash'
import combinations from './combinations'

export default function createTeams () {
  const teams = [
    {
      name: 'Communist Youth',
      percent: 300
    },
    {
      name: 'Big Shiny goons',
      percent: 220
    },
    {
      name: 'Nolan Bumgardeners',
      percent: 160
    },
    {
      name: 'Backes to the Future',
      percent: 115
    },
    {
      name: 'Wu Tanguay Clan',
      percent: 80
    },
    {
      name: 'MackysBedtimePlayers (via Oduya Halak Boyes)',
      percent: 55
    },
    {
      name: 'Timbersnakes (via Diana Krall-Stars)',
      percent: 40
    },
    {
      name: 'MackysBedtimePlayers',
      percent: 30
    },
    {
      name: 'Re-draw',
      percent: 1
    }
  ]

  const combos = shuffle(
    combinations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 4)
  )

  for (let team of teams) {
    team.combos = []
    for (let i = 0; i < team.percent; i++) {
      team.combos.push(combos.pop())
    }
    team.percent = team.combos.length / 1000
  }

  return teams
}
