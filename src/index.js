import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {throttle} from 'lodash'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import lotteryApp from './reducers'
import {loadState, saveState} from './helpers/localStorage'
import * as global from './variables'

import './css/App.css'

const persistedState = loadState()
const store = createStore(lotteryApp, {
  ...persistedState,
  currentPage: global.PAGE_SETUP
})

store.subscribe(
  throttle(() => {
    saveState({
      teams: store.getState().teams
    })
  }, 1000)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
