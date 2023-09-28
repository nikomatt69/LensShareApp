import { HttpLink } from '@apollo/client';
export const SNAPSHOT_HUB_URL = 
 'https://hub.snapshot.org'
const httpLink = new HttpLink({
  uri: `${SNAPSHOT_HUB_URL}/graphql`,
  fetchOptions: 'no-cors',
  fetch
});

export default httpLink;
