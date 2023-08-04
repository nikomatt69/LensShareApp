import axios from 'axios';
import type { PublicationMetadataV2Input } from '@/utils/lens/generatedLenster';
import toast from 'react-hot-toast';

import { METADATA_WORKER_URL } from '@/constants';
import type { ProfileMetadata } from '../custom-types';
import { logger } from '@/logger';

const uploadToAr = async (
  data: PublicationMetadataV2Input | ProfileMetadata
): Promise<{ url: string | null }> => {
  try {
    const response = await axios.post(METADATA_WORKER_URL, data);
    const { id } = response.data;
    return { url: `ar://${id}` };
  } catch (error) {
    logger.error('[Error AR Data Upload]', error);
    toast.error('Failed to upload metadata!');
    return { url: null };
  }
};

export default uploadToAr;
