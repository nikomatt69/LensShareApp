import React from 'react';

import DropZone from './DropZone';
import UploadSteps from './UploadSteps';
import { useAppStore } from '@/store/app';

const UploadPage = () => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);

  return uploadedVideo?.file ? <UploadSteps /> : <DropZone />;
};

export default UploadPage;
