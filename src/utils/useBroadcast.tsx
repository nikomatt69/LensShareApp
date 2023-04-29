import type { ApolloCache } from '@apollo/client';
import toast from 'react-hot-toast';
import * as Apollo from '@apollo/client';
import { BroadcastDocument, BroadcastMutation, BroadcastMutationVariables } from '@/types/lens';

interface Props {
  onCompleted?: (data: any) => void;
  update?: (cache: ApolloCache<any>) => void;
}

const useBroadcast = ({ onCompleted, update }: Props): { broadcast: any; data: any; loading: boolean } => {
    const ERRORS = {
        notMined:
        'A previous transaction may not been mined yet or you have passed in a invalid nonce. You must wait for that to be mined before doing another action, please try again in a few moments. Nonce out of sync.'
    };

    function useBroadcastMutation(
        baseOptions?: Apollo.MutationHookOptions<BroadcastMutation, BroadcastMutationVariables>
      ) {
        const options = { ...baseOptions };
        return Apollo.useMutation<BroadcastMutation, BroadcastMutationVariables>(BroadcastDocument, options);
    }

  const [broadcast, { data, loading }] = useBroadcastMutation({
    onCompleted,
    update,
    onError: (error) => {
      if (error.message === ERRORS.notMined) {
        toast.error(error.message);
      }
    }
  });

  return {
    broadcast: ({ request }: any) => broadcast({ variables: { request } }),
    data,
    loading
  };
};

export default useBroadcast;