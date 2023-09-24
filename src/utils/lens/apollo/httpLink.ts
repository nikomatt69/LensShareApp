import { HttpLink } from '@apollo/client';

export const API_URL = 'https://api.lens.dev';
const httpLink = new HttpLink({
  uri: API_URL,
  fetchOptions: 'no-cors',
  fetch
  
});

export default httpLink;
