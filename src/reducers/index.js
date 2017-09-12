import { combineReducers } from 'redux'
import { reject } from 'lodash'

const teams = (state = [], action) => {
  switch (action.type) {
    case 'TEAM_ADDED':
      return [...state, action.payload.team]
    case 'TEAM_DELETE':
      return reject(state, team => team.name === action.payload.teamName)
    default:
      return state
  }
}

const balls = (state = [], action) => {
  switch (action.type) {
    case 'BALL_CLICKED':
      return [...state, action.payload.ball]
    default:
      return state
  }
}

const history = (state = [], action) => {
  switch (action.type) {
    default:
      return state
  }
}

const currentPage = (state = null, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return action.payload.page
    default:
      return state
  }
}

export default combineReducers({
  teams,
  balls,
  history,
  currentPage
})
