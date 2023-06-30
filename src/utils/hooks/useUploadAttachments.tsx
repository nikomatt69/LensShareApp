import { usePublicationStore } from '@/store/publication';
import { NewLensshareAttachment } from '@/utils/custom-types2';
import { uploadIpfs } from '@/utils/functions/uploadToIPFS';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { uploadFilesToIPFS } from '../functions/uploadToIPFS2';

const useUploadAttachments = () => {
    const addAttachments = usePublicationStore((state) => state.addAttachments);
    const updateAttachments = usePublicationStore((state) => state.updateAttachments);
    const removeAttachments = usePublicationStore((state) => state.removeAttachments);
    const setIsUploading = usePublicationStore((state) => state.setIsUploading);

    const handleUploadAttachments = useCallback(
        async (attachments: any): Promise<NewLensshareAttachment[]> => {
            setIsUploading(true);
            const files = Array.from(attachments);
            const attachmentIds: string[] = [];


            const hasLargeAttachment = files.map((file: any) => {
                const isImage = file.type.includes('image');
                const isVideo = file.type.includes('video');
                const isAudio = file.type.includes('audio');

                if (isImage && file.size > 20000000) {
                    toast.error(`Image size should be less than 20MB`);
                    return false;
                }

                if (isVideo && file.size > 100000000) {
                    toast.error(`Video size should be less than 100MB`);
                    return false;
                }

                if (isAudio && file.size > 100000000) {
                    toast.error(`Audio size should be less than 100MB`);
                    return false;
                }

                return true;
            });

            addAttachments;
            let attachmentsIPFS: NewLensshareAttachment[] = [];
            try {
                if (hasLargeAttachment.includes(false)) {
                    setIsUploading(false);
                    removeAttachments(attachmentIds);
                    return [];
                }

                const attachmentsUploaded = await uploadFilesToIPFS(attachments);
                if (attachmentsUploaded) {
                    attachments = ((attachment: NewLensshareAttachment) => ({
                        ...attachment,
                        
                    }));
                    updateAttachments(attachmentsIPFS);
                }
            } catch {
                removeAttachments(attachmentIds);
                toast.error('Something went wrong while uploading!');
            }
            setIsUploading(false);

            return attachmentsIPFS;
        },
        [addAttachments, removeAttachments, updateAttachments, setIsUploading]
    );

    return { handleUploadAttachments };
};

export default useUploadAttachments;