import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Main } from './pages/Main'
import AppState from './context/AppState'

export const App = () => {
  return (
    <>
      <AppState>
        <Router>
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path=''>
              <Redirect to='/' />
            </Route>
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </Router>
      </AppState>
    </>
  )
}
