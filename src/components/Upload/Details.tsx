import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import Category from './Category';
import CollectModule from './CollectModule';
import ReferenceModule from './ReferenceModule';
import Video from './Video';
import { useAppStore } from '@/store/app';
import { checkIsBytesVideo } from './checkIsBytesVideo';
import { zodResolver } from '@hookform/resolvers/zod';
import InputMentions from '../UI/InputMentions';

import { Button } from '../UI/Button';

import { Tooltip } from '../UI/Tooltip';
import ChooseThumbnail from './ChooseThumbnail';
import { AiFillCloseCircle } from 'react-icons/ai';
import Alert from './Alert';

const ContentAlert = ({ message }: { message: ReactNode }) => (
  <div className="mt-6">
    <Alert variant="danger">
      <span className="inline-flex items-center text-sm">
        <AiFillCloseCircle className="mr-3 text-xl text-red-500" />
        {message}
      </span>
    </Alert>
  </div>
);

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: `Title should be atleast 5 characters` })
    .max(100, { message: `Title should not exceed 100 characters` }),
  description: z
    .string()
    .trim()
    .max(5000, { message: `Description should not exceed 5000 characters` }),
  isSensitiveContent: z.boolean()
});

export type VideoFormData = z.infer<typeof formSchema>;

type Props = {
  onUpload: (data: VideoFormData) => void;
  onCancel: () => void;
};

const Details: FC<Props> = ({ onUpload, onCancel }) => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);

  const {
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm<VideoFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isSensitiveContent: uploadedVideo.isSensitiveContent ?? false,
      title: uploadedVideo.title,
      description: uploadedVideo.description
    }
  });

  const onSubmitForm = (data: VideoFormData) => {
    onUpload(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="grid h-full gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <div className="relative">
              <InputMentions
                label={`Title`}
                placeholder={`Title that describes your video`}
                autoComplete="off"
                validationError={errors.title?.message}
                value={watch('title')}
                onContentChange={(value) => {
                  setValue('title', value);
                  clearErrors('title');
                }}
                mentionsSelector="input-mentions-single"
              />
              <div className="absolute right-1 top-0 mt-1 flex items-center justify-end">
                <span
                  className={clsx('text-[10px] opacity-50', {
                    'text-red-500 !opacity-100': watch('title')?.length > 100
                  })}
                >
                  {watch('title')?.length}/100
                </span>
              </div>
            </div>
            <div className="relative mt-4">
              <InputMentions
                label={`Description`}
                placeholder={`Describe more about your video, can be @channels, #hashtags or chapters (00:20 - Intro)`}
                autoComplete="off"
                validationError={errors.description?.message}
                value={watch('description')}
                onContentChange={(value) => {
                  setValue('description', value);
                  clearErrors('description');
                }}
                rows={5}
                mentionsSelector="input-mentions-textarea"
              />
              <div className="absolute bottom-1.5 right-1.5"></div>
              <div className="absolute right-1 top-0 mt-1 flex items-center justify-end">
                <span
                  className={clsx(
                    'text-[10px]',
                    watch('description')?.length > 5000
                      ? 'text-red-500'
                      : 'opacity-50'
                  )}
                >
                  {watch('description')?.length}/5000
                </span>
              </div>
            </div>

            <div className="mt-4">
              <CollectModule />
            </div>
            <div className="mt-4"></div>
            <div className="mt-4">
              <ReferenceModule />
            </div>
            <div className="mt-4">
              <ChooseThumbnail label="Thumbnail" file={uploadedVideo.file} />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between">
          <Video />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end space-x-2">
        <Button type="button" onClick={() => onCancel()}>
          Reset
        </Button>
        <Button
          loading={uploadedVideo.loading || uploadedVideo.uploadingThumbnail}
          type="submit"
        >
          {uploadedVideo.uploadingThumbnail
            ? 'Uploading thumbnail'
            : uploadedVideo.buttonText}
        </Button>
      </div>
    </form>
  );
};

export default Details;
