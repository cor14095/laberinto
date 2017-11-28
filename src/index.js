import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import playerReducer from './ducks/player'
import AppContainer from './containers/App'

let store = createStore(
  playerReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store={ store } >
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);