import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      value
    }
  }
`

export const ALL_CLIENTS = gql`
  query {
  allClients {
    name
    phone
    email
    address {
      street
      city
      state
      zip
    }
    id
  }
}
`