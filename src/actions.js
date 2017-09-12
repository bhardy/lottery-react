export const addTeam = team => {
  return {
    type: 'TEAM_ADDED',
    payload: {
      team
    }
  }
}

export const removeTeam = teamName => {
  return {
    type: 'TEAM_DELETE',
    payload: {
      teamName
    }
  }
}

export const setCurrentPage = page => {
  return {
    type: 'SET_PAGE',
    payload: {
      page
    }
  }
}
