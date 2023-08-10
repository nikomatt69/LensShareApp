
import { SPACES_WORKER_URL } from '@/constants';
import axios from 'axios';
import getBasicWorkerPayload from './getBasicWorkerPayload';

type CreateSpaceResponse = string;

const useCreateSpace = (): [createPoll: () => Promise<CreateSpaceResponse>] => {
  const createSpace = async (): Promise<CreateSpaceResponse> => {
    try {
      const response = await axios({
        url: `${SPACES_WORKER_URL}/createSpace`,
        method: 'POST',
        data: getBasicWorkerPayload()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return [createSpace];
};

export default useCreateSpace;