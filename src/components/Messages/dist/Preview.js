"use strict";
exports.__esModule = true;
var clsx_1 = require("clsx");
var dayjs_1 = require("dayjs");
var relativeTime_1 = require("dayjs/plugin/relativeTime");
var router_1 = require("next/router");
var app_1 = require("src/store/app");
var formatHandle_1 = require("src/utils/functions/formatHandle");
var formatTime_1 = require("src/utils/functions/formatTime");
var Image_1 = require("src/utils/hooks/codecs/Image");
var Video_1 = require("src/utils/hooks/codecs/Video");
var getAvatar_1 = require("@/lib/getAvatar");
dayjs_1["default"].extend(relativeTime_1["default"]);
var Preview = function (_a) {
    var _b;
    var profile = _a.profile, message = _a.message, conversationKey = _a.conversationKey, isSelected = _a.isSelected;
    var router = router_1.useRouter();
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    var address = currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.ownedBy;
    var onConversationSelected = function (profileId) {
        router.push(profileId ? "/messages/" + conversationKey : '/messages');
    };
    return (React.createElement("div", { className: clsx_1["default"]('cursor-pointer py-3 hover:bg-gray-100 hover:bg-gray-800', isSelected && 'bg-gray-50 bg-gray-800'), onClick: function () { return onConversationSelected(profile.id); } },
        React.createElement("div", { className: "flex justify-between space-x-3 px-5" },
            React.createElement("img", { src: getAvatar_1["default"](profile.id), loading: "lazy", className: "h-10 w-10 rounded-full border bg-gray-200 border-gray-700", height: 40, width: 40, alt: formatHandle_1["default"](profile === null || profile === void 0 ? void 0 : profile.handle) }),
            React.createElement("div", { className: "w-full" },
                React.createElement("div", { className: "flex w-full justify-between space-x-1" },
                    React.createElement("div", { className: "flex max-w-sm items-center" },
                        React.createElement("div", { className: "line-clamp-1 text-md" }, (_b = profile === null || profile === void 0 ? void 0 : profile.name) !== null && _b !== void 0 ? _b : formatHandle_1["default"](profile.handle))),
                    message.sent && (React.createElement("span", { className: "lt-text-gray-500 min-w-fit pt-0.5 text-xs", title: formatTime_1["default"](message.sent) }, dayjs_1["default"](new Date(message.sent)).fromNow()))),
                React.createElement("span", { className: "lt-text-gray-500 line-clamp-1 break-all text-sm" },
                    address === message.senderAddress && 'You: ',
                    message.contentType.typeId == Image_1.ContentTypeImageKey.typeId ? 'Sent a Image' :
                        message.contentType.typeId == Video_1.ContentTypeVideoKey.typeId ? 'Sent a Video'
                            : message.content)))));
};
exports["default"] = Preview;
