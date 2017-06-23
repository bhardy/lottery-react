import React, { Component } from 'react'
import combinations from './combinations'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default class Teams extends Component {
  render() {
    const odds = [
      {
        name: "Communist Youth",
        percent: 300
      },
      {
        name: "Big Shiny Goons",
        percent: 220
      },
      {
        name: "Nolan Bumgardeners",
        percent: 160
      },
      {
        name: "Backes to the Future",
        percent: 110
      },
      {
        name: "Wu Tanguay Clan",
        percent: 80
      },
      {
        name: "MackysBedtimePlayers (via Oduya Halak Boyes)",
        percent: 60
      },
      {
        name: "Timbersnakes (via Diana Krall-Stars)",
        percent: 40
      },
      {
        name: "MackysBedtimePlayers",
        percent: 30
      },
      {
        name: "Redraw",
        percent: 1
      }
    ]

    const combos = combinations([1,2,3,4,5,6,7,8,9,10,11,12,13,14], 4);
    // TODO: this can't run every time!
    // let shuffledCombos = shuffleArray(combos)

    let teams = odds.slice();

    for(let team of teams) {
      team.combos = [];
      for(let i = 0; i < team.percent; i++) {
        team.combos.push(combos.pop());
      }
      team.percent = team.combos.length / 10;
    }

    let updatePercents = false

    this.props.Balls.forEach(function(value, index) {
      if (value === true) {
        updatePercents = true
        let ball = index + 1

        for (let team of teams) {
          team.combos = team.combos.filter(function(combo) {
            if (combo.includes(ball)) {
              return combo
            }
          })
        }
      }
    })

    if (updatePercents) {
      let remainingCombos = 0;
      for (let team of teams) {
        remainingCombos += team.combos.length
      }

      for (let team of teams) {
        team.percent = parseInt(team.combos.length / remainingCombos * 100)
      }
    }

    const teamListItems = teams.map((team) =>
      <li className="team__list-item" key={team.name}>
        {team.name}: {team.percent}%
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
