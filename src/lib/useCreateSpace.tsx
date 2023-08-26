
import { SPACES_WORKER_URL } from '@/constants';
import axios from 'axios';
import getBasicWorkerPayload from './getBasicWorkerPayload';

type CreateSpaceResponse = string;

const useCreateSpace = (): [createSpace: () => Promise<CreateSpaceResponse>] => {
  const createSpace = async (): Promise<CreateSpaceResponse> => {
    try {
      const response = await axios.post(
       `${SPACES_WORKER_URL}/createSpace`,
      
        getBasicWorkerPayload(),

        
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return [createSpace];
};

export default useCreateSpace;