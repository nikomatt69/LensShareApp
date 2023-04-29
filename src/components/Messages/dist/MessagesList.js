"use strict";
exports.__esModule = true;
/* eslint-disable @next/next/no-img-element */
var InterweaveContent_1 = require("src/components/UI/InterweaveContent");
var Card_1 = require("src/components/UI/Card");
var getProfilePicture_1 = require("src/utils/functions/getProfilePicture");
var clsx_1 = require("clsx");
var dayjs_1 = require("dayjs");
var react_1 = require("react");
var react_infinite_scroll_component_1 = require("react-infinite-scroll-component");
var formatHandle_1 = require("src/utils/functions/formatHandle");
var formatTime_1 = require("src/utils/functions/formatTime");
var hi_1 = require("react-icons/hi");
var Image_1 = require("src/utils/hooks/codecs/Image");
var MessageMedia_1 = require("./MessageMedia");
var Video_1 = require("src/utils/hooks/codecs/Video");
var message_1 = require("src/store/message");
var Loader_1 = require("src/components/UI/Loader");
var isOnSameDay = function (d1, d2) {
    return dayjs_1["default"](d1).format('YYYYMMDD') === dayjs_1["default"](d2).format('YYYYMMDD');
};
var formatDate = function (d) { return dayjs_1["default"](d).format('MMMM D, YYYY'); };
var MessageTile = function (_a) {
    var _b, _c;
    var message = _a.message, profile = _a.profile, currentProfile = _a.currentProfile;
    var address = currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.ownedBy;
    return (React.createElement("div", { className: clsx_1["default"](address === message.senderAddress ? 'mr-4 items-end' : 'items-start', 'mx-auto mb-4 flex flex-col') },
        React.createElement("div", { className: clsx_1["default"]('flex', message.contentType.typeId == Video_1.ContentTypeVideoKey.typeId ? 'w-full max-w-[60%]' : 'max-w-[60%]') },
            address !== message.senderAddress && (React.createElement("img", { 
                // @ts-ignore
                src: getProfilePicture_1["default"](profile), className: "mr-2 h-10 w-10 rounded-full border  border-gray-700", alt: formatHandle_1["default"](profile === null || profile === void 0 ? void 0 : profile.handle) })),
            React.createElement("div", { className: clsx_1["default"](address === message.senderAddress ? 'bg-brand2-500' : '', 'w-full', message.contentType.typeId == Image_1.ContentTypeImageKey.typeId ? 'rounded-2xl' : 'rounded-full', message.contentType.typeId == Image_1.ContentTypeImageKey.typeId || message.contentType.typeId == Video_1.ContentTypeVideoKey.typeId ? 'p-0' : 'px-4 py-2') }, message.error
                ? "Error: " + ((_b = message.error) === null || _b === void 0 ? void 0 : _b.message)
                : message.contentType.typeId == Image_1.ContentTypeImageKey.typeId ? React.createElement(MessageMedia_1["default"], { message: message, type: 'image' })
                    : message.contentType.typeId == Video_1.ContentTypeVideoKey.typeId ? React.createElement(MessageMedia_1["default"], { message: message, type: 'video' })
                        : (_c = React.createElement("span", { className: clsx_1["default"](address === message.senderAddress && 'text-black', 'text-md linkify-message block break-words') },
                            React.createElement(InterweaveContent_1["default"], { content: message.content }))) !== null && _c !== void 0 ? _c : '')),
        React.createElement("div", { className: clsx_1["default"](address !== message.senderAddress ? 'ml-12' : '') },
            React.createElement("span", { className: "place-self-end text-xs text-gray-400", title: formatTime_1["default"](message.sent) }, dayjs_1["default"](message.sent).fromNow()))));
};
var AttachmentMessageTile = function (_a) {
    var _b;
    var attachment = _a.attachment, profile = _a.profile, currentProfile = _a.currentProfile;
    return (React.createElement("div", { className: 'mr-4 items-end mx-auto mb-4 flex flex-col' },
        React.createElement("div", { className: 'flex max-w-[60%] relative' },
            React.createElement("div", { className: 'w-full rounded-2xl p-0' },
                React.createElement("img", { src: attachment.item, alt: (_b = attachment.altTag) !== null && _b !== void 0 ? _b : '', className: 'w-full rounded-2xl cursor-pointer' })),
            React.createElement("div", { className: 'absolute  flex items-center justify-center w-full h-full rounded-2xl' },
                React.createElement(Loader_1["default"], null)))));
};
var DateDividerBorder = function (_a) {
    var children = _a.children;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "h-0.5 grow 300/25" }),
        children,
        React.createElement("div", { className: "h-0.5 grow 300/25" })));
};
var DateDivider = function (_a) {
    var date = _a.date;
    return (React.createElement("div", { className: "align-items-center flex items-center p-4 pt-0 pl-2" },
        React.createElement(DateDividerBorder, null,
            React.createElement("span", { className: "mx-11 flex-none text-sm font-semibold text-gray-300" }, formatDate(date)))));
};
var MissingXmtpAuth = function () { return (React.createElement(Card_1.Card, { as: "aside", className: "mb-2 mr-4 space-y-2.5 border-gray-400  !bg-opacity-20 p-5" },
    React.createElement("div", { className: "flex items-center space-x-2 font-bold" },
        React.createElement(hi_1.HiOutlineEmojiSad, { className: "h-5 w-5" }),
        React.createElement("p", null, "This fren hasn't enabled DMs yet")),
    React.createElement("p", { className: "text-sm leading-[22px]" }, "You can't send them a message until they enable DMs."))); };
var ConversationBeginningNotice = function () { return (React.createElement("div", { className: "align-items-center mt-6 flex justify-center pb-4" },
    React.createElement("span", { className: "text-sm font-semibold text-gray-300" }, "This is the beginning of the conversation"))); };
var LoadingMore = function () { return (React.createElement("div", { className: "mt-6 p-1 text-center text-sm font-bold text-gray-300" }, "Loading...")); };
var MessagesList = function (_a) {
    var messages = _a.messages, fetchNextMessages = _a.fetchNextMessages, profile = _a.profile, currentProfile = _a.currentProfile, hasMore = _a.hasMore, missingXmtpAuth = _a.missingXmtpAuth;
    var lastMessageDate;
    var isUploading = message_1.useMessageStore(function (state) { return state.isUploading; });
    var attachment = message_1.useMessageStore(function (state) { return state.attachment; });
    return (React.createElement("div", { className: "flex h-[75%] flex-grow" },
        React.createElement("div", { className: "relative flex h-full w-full pl-4" },
            React.createElement("div", { id: "scrollableMessageListDiv", className: "flex h-full w-full flex-col-reverse overflow-y-auto" },
                missingXmtpAuth && React.createElement(MissingXmtpAuth, null),
                React.createElement(react_infinite_scroll_component_1["default"], { dataLength: messages.length, next: fetchNextMessages, className: "flex flex-col-reverse overflow-y-auto overflow-x-hidden", inverse: true, endMessage: React.createElement(ConversationBeginningNotice, null), hasMore: hasMore, loader: React.createElement(LoadingMore, null), scrollableTarget: "scrollableMessageListDiv" },
                    isUploading && (attachment === null || attachment === void 0 ? void 0 : attachment.id) !== '' ? (React.createElement("div", { className: 'attachmentMessage' },
                        React.createElement(AttachmentMessageTile, { currentProfile: currentProfile, profile: profile, attachment: attachment }))) : null, messages === null || messages === void 0 ? void 0 :
                    messages.map(function (msg, index) {
                        var dateHasChanged = lastMessageDate ? !isOnSameDay(lastMessageDate, msg.sent) : false;
                        var messageDiv = (React.createElement("div", { className: 'message', key: msg.id + "_" + index },
                            React.createElement(MessageTile, { currentProfile: currentProfile, profile: profile, message: msg }),
                            dateHasChanged ? React.createElement(DateDivider, { date: lastMessageDate }) : null));
                        lastMessageDate = msg.sent;
                        return messageDiv;
                    }))))));
};
exports["default"] = react_1.memo(MessagesList);
