import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Header from './components/Header'
// import Clients from './components/Clients'
// import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'


const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{ color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const Public = () => <h3>Public</h3>
  const Protected = () => <h3>Protected</h3>

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest} render={() => {
        return token
          ? children
          : <Redirect to='/login' />
      }} />
    )
  }

  return (
    <Router>
      <div>
        <Notify errorMessage={errorMessage} />
        {/* <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul> */}
        <Header />

        <Route path="/public" component={Public} />
        <Route path="/login">
          <LoginForm setToken={setToken} setError={notify} />
        </Route>
        <PrivateRoute path='/protected'>
         <Protected />
        </PrivateRoute>
      </div>
    </Router>
  )
}

export default App;
