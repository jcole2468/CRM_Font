import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
  const history = useHistory
  const token = localStorage.getItem('crm-user-token')
  return (
    <Navbar>
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/clients">Clients</Link>
        </div>
        <div>
          {token ? (
            <div onclick={() => {
              localStorage.removeItem('crm-user-token')
              history.push('/')
               }}
            > logout
            </div>
          ) : (
            <Link to="/login" >
              <LoginForm setToken={token} />
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  )
}

export default Header