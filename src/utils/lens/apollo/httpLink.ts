import { API_URL } from '@/constants';
import { HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: API_URL,
  fetchOptions: 'no-cors',
  fetch
  
});

export default httpLink;
