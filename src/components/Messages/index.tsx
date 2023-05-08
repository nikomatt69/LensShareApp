import MetaTags from 'src/components/UI/MetaTags';
import { Card } from 'src/components/UI/Card';
import { APP_NAME } from 'src/constants';
import type { NextPage } from 'next';
import Custom404 from 'src/pages/404';
import PreviewList from './PreviewList';
import {useAppStore} from 'src/store/app';
import ProfileRender from '../ProfilePage/ProfileRender';



const Messages: NextPage = () => {

    const currentProfile = useAppStore((state) => state.currentProfile);

    if (!currentProfile) {
        return <Custom404 />;
    }

    return (
        <>
            <MetaTags title={`Messages • ${APP_NAME}`} />
            <div className="flex-grow h-full xs:h-3/4 w-full rounded-3xl">
                <PreviewList />
                <div className="xs:w-3/4 rounded-xl sm:w-3/4 sm:hidden sm:h-[76vh] md:w-3/4 md:hidden md:h-[80vh] lg:block xl:h-[84vh]">
                    <Card className=" bg-grey-300 flex-grow xs:w-full xs:h-full !rounded-tr-xl !rounded-br-xl !rounded-none">
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Messages;