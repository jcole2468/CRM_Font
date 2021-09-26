import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_CLIENTS } from '../queries'

const Clients = () => {
  const [clients, setClients] = useState([])
  
  const result = useQuery(ALL_CLIENTS)

  useEffect(() => {
    if (result.data) {
      setClients(result.data.allClients)
    }
  }, [result])


  return (
    <div>
      <h1>Clients</h1>
      <table>
        <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Phone
            </th>
            <th>
              Email
            </th>
            <th>
              Address
            </th>
          </tr>
          {clients.map(c =>
            <tr key={c.name}>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.address.street}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Clients