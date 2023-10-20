import { BASE_URL, SPACES_WORKER_URL } from '@/constants';
import axios from 'axios';
import getBasicWorkerPayload from './getBasicWorkerPayload';
import { useSpacesStore } from '@/store/spaces';
import { usePublicationStore } from '@/store/publication4';

type CreateSpaceResponse = string

const useCreateSpace = (): [createSpace: () => Promise<CreateSpaceResponse>] => {
  const publicationContent = usePublicationStore(
    (state) => state.publicationContent
  );

  const {
    isTokenGated,
    tokenGateConditionType,
    tokenGateConditionValue,
    spacesTimeInHour,
    spacesTimeInMinute
  } = useSpacesStore();
  
  let payload = {};
  const now = new Date();
  now.setHours(Number(spacesTimeInHour));
  now.setMinutes(Number(spacesTimeInMinute));
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedTime = new Date(
    now.toLocaleString('en-US', { timeZone: userTimezone })
  );
  const startTime = formattedTime.toISOString();
  const createSpace = async (): Promise<CreateSpaceResponse> => {
    if (isTokenGated) {
      payload = {
        ...getBasicWorkerPayload(),
        conditionType: tokenGateConditionType,
        conditionValue: tokenGateConditionValue,
        isTokenGated: isTokenGated,
        startTime: startTime
      };
    } else {
      payload = {
        ...getBasicWorkerPayload(),
        startTime: startTime
      };
    }
    try {
      const response = await axios({
        url: `${BASE_URL}/api/create-room`,
        method: 'POST',
        data: payload
      });
      
      
      return `${publicationContent}\n\n${response.data.spaceId}`;
    } catch (error) {
      throw error;
    }
  };

  return [createSpace];
};

export default useCreateSpace;
