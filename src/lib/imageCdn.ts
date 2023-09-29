import { IMAGE_TRANSFORMATIONS, LENS_MEDIA_SNAPSHOT_URL } from '@/constants';

export const imageCdn = (
  url: string,
  type?: keyof typeof IMAGE_TRANSFORMATIONS
): string => {
  if (!url) {
    return url;
  }

  if (url.includes(LENS_MEDIA_SNAPSHOT_URL)) {
    const splitedUrl = url.split('/');
    const path = splitedUrl[splitedUrl.length - 1];

    return type
      ? `${LENS_MEDIA_SNAPSHOT_URL}/${IMAGE_TRANSFORMATIONS}/${path}`
      : url;
  }

  return url;
};
