import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index.js'
import { Provider } from 'react-redux'
import middlewareLogger from './middleware/middleware-logger'
import thunkMiddleware from 'redux-thunk'

console.log(localStorage)
let retrievedState
try {
  retrievedState = {
    user: JSON.parse(localStorage['phaseThreeReduxStore'])
  }
  if (!retrievedState.user){
    retrievedState = {}
  }
} catch (err) {
  retrievedState = {}
}

const store = createStore(rootReducer, retrievedState, applyMiddleware(middlewareLogger, thunkMiddleware))

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  )
}

render(App)

//ESLINT
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
