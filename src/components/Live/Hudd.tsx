import { iframeApi, useEventListner } from "@huddle01/iframe";
import { HuddleIframe } from "@huddle01/iframe";


const Hudd = () => {

    useEventListner("lobby:initialized", () => {
        iframeApi.initialize({
          redirectUrlOnLeave: "https://lenshareapp.xyz",
          wallets: ['metamask','lens', 'walletconnect'],

        });
    });
    useEventListner("lobby:joined", (data) => console.log({ data }));

    return (
        <div className="h-full mt-30 w-full">
            <HuddleIframe roomUrl="https://iframe.huddle01.com/" className="w-full mt-30 h-[90vh] aspect-ratio:9/16 rounded-xl justify-center " />
        </div>
    );

};

export default Hudd;
 
