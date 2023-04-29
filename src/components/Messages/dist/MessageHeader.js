"use strict";
exports.__esModule = true;
var FollowButton_1 = require("src/components/Buttons/FollowButton");
var UnfollowButton_1 = require("src/components/Buttons/UnfollowButton");
var router_1 = require("next/router");
var react_1 = require("react");
var bi_1 = require("react-icons/bi");
var getAvatar_1 = require("@/lib/getAvatar");
var MessageHeader = function (_a) {
    var profile = _a.profile;
    var router = router_1.useRouter();
    var _b = react_1.useState(true), following = _b[0], setFollowing = _b[1];
    var onBackClick = function () {
        router.push('/messages');
    };
    react_1.useEffect(function () {
        var _a;
        setFollowing((_a = profile === null || profile === void 0 ? void 0 : profile.isFollowedByMe) !== null && _a !== void 0 ? _a : false);
    }, [profile === null || profile === void 0 ? void 0 : profile.isFollowedByMe, profile]);
    if (!profile) {
        return null;
    }
    return (React.createElement("div", { className: "flex items-center justify-between border-b-[1px] px-4 py-2 border-gray-700" },
        React.createElement("div", { className: "flex items-center" },
            React.createElement(bi_1.BiChevronLeft, { onClick: onBackClick, className: "mr-1 h-6 w-6 cursor-pointer lg:hidden" })),
        React.createElement("img", { 
            // @ts-ignore
            src: getAvatar_1["default"](profile), className: "mr-2 h-10 w-10 rounded-full border  border-gray-700", alt: (profile === null || profile === void 0 ? void 0 : profile.handle) }),
        !following ? (React.createElement(FollowButton_1["default"], { profile: profile, setFollowing: setFollowing })) : (React.createElement(UnfollowButton_1["default"], { profile: profile, setFollowing: setFollowing }))));
};
exports["default"] = MessageHeader;
