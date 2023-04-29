import { ApolloClient, InMemoryCache } from '@apollo/client'
import { API_URL } from 'src/constants'

const getApolloClient = () => {
  return new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  })
}

export default getApolloClient