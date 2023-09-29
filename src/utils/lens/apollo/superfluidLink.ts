import { HttpLink } from '@apollo/client';

export const SUPERFLUID_SUBGRAPH =
  'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-matic';

const superfluidLink = new HttpLink({
  uri: SUPERFLUID_SUBGRAPH,
  fetchOptions: 'no-cors',
  fetch
});

export default superfluidLink;
