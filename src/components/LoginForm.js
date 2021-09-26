import React, { useState, useEffect } from 'react'
import { LOGIN } from '../queries'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const LoginForm = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(result)
      props.setError(error.graphQLErrors[0].messgage)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      console.log(token)
      props.setToken(token)
      localStorage.setItem('crm-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    console.log('clicked')
    login({ variables: { email, password }})
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Email <input
            value={email}
            onChange={({ target }) => setEmail(target.value)
            }
            />
        </div>
        <div>
          Password <input
            value={password}
            onChange={({ target }) => setPassword(target.value)
            }
            />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm