import MetaTags from 'src/components/UI/MetaTags';
import { Card } from 'src/components/UI/Card';
import { APP_NAME } from 'src/constants';
import type { NextPage } from 'next';
import Custom404 from 'src/pages/404';

import PreviewList from './PreviewList';
import {useAppStore} from 'src/store/app';

const NoConversationSelected = () => {
    return (
        <div className="flex hidden h-full flex-col text-center">
            <div className="m-auto">
                <span className="text-center text-5xl">👋</span>
                <h3 className="mt-3 mb-2 text-lg">
                    Select a conversation
                </h3>
                <p className="text-md lt-text-gray-500 max-w-xs">
                    Choose an existing conversation or create a new one to start messaging
                </p>
            </div>
        </div>
    );
};

const Messages: NextPage = () => {

    const currentProfile = useAppStore((state) => state.currentProfile);

    if (!currentProfile) {
        return <Custom404 />;
    }

    return (
        <>
            <MetaTags title={`${APP_NAME} :: Messages`} />
            <div className="flex-grow w-full h-full xs:h-3/4 w-full rounded-3xl">
                <PreviewList />
                <div className="xs:w-3/4 sm:h-[50-vh] rounded-xl sm:w-3/4 sm:hidden sm:h-[76vh] md:w-3/4 md:hidden md:h-[80vh] lg:block xl:h-[84vh]">
                    <Card className=" bg-grey-300 flex-grow xs:w-full xs:h-full !rounded-tr-xl !rounded-br-xl !rounded-none">
                        
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Messages;