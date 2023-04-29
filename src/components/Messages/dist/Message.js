"use strict";
exports.__esModule = true;
var MetaTags_1 = require("src/components/UI/MetaTags");
var Card_1 = require("src/components/UI/Card");
var constants_1 = require("src/constants");
var router_1 = require("next/router");
var react_1 = require("react");
var _404_1 = require("src/pages/404");
var Composer_1 = require("./Composer");
var MessagesList_1 = require("./MessagesList");
var PreviewList_1 = require("./PreviewList");
var app_1 = require("src/store/app");
var useGetConversation_1 = require("src/utils/hooks/useGetConversation");
var message_1 = require("src/store/message");
var useGetMessages_1 = require("src/utils/hooks/useGetMessages");
var useSendMessage_1 = require("src/utils/hooks/useSendMessage");
var useStreamMessages_1 = require("src/utils/hooks/useStreamMessages");
var formatHandle_1 = require("src/utils/functions/formatHandle");
var Loader_1 = require("src/components/UI/Loader");
var conversationKey_1 = require("src/utils/functions/conversationKey");
var MessageHeader_1 = require("./MessageHeader");
var Navbar_1 = require("../Navbar");
var Message = function (_a) {
    var _b;
    var conversationKey = _a.conversationKey;
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    var profile = message_1.useMessageStore(function (state) { return state.messageProfiles.get(conversationKey); });
    var _c = useGetConversation_1["default"](conversationKey, profile), selectedConversation = _c.selectedConversation, missingXmtpAuth = _c.missingXmtpAuth;
    var _d = react_1.useState(new Map()), endTime = _d[0], setEndTime = _d[1];
    var _e = useGetMessages_1["default"](conversationKey, selectedConversation, endTime.get(conversationKey)), messages = _e.messages, hasMore = _e.hasMore;
    useStreamMessages_1["default"](conversationKey, selectedConversation);
    var sendMessage = useSendMessage_1["default"](selectedConversation).sendMessage;
    var fetchNextMessages = react_1.useCallback(function () {
        if (hasMore && Array.isArray(messages) && messages.length > 0) {
            var lastMsgDate = messages[messages.length - 1].sent;
            var currentEndTime = endTime.get(conversationKey);
            if (!currentEndTime || lastMsgDate <= currentEndTime) {
                endTime.set(conversationKey, lastMsgDate);
                setEndTime(new Map(endTime));
            }
        }
    }, [conversationKey, hasMore, messages, endTime]);
    if (!currentProfile) {
        return React.createElement(_404_1["default"], null);
    }
    var showLoading = !missingXmtpAuth && (!profile || !currentProfile || !selectedConversation);
    var userNameForTitle = (_b = profile === null || profile === void 0 ? void 0 : profile.name) !== null && _b !== void 0 ? _b : formatHandle_1["default"](profile === null || profile === void 0 ? void 0 : profile.handle);
    var title = userNameForTitle ? userNameForTitle + " :: " + constants_1.APP_NAME : constants_1.APP_NAME;
    return (React.createElement(React.Fragment, null,
        React.createElement(MetaTags_1["default"], { title: title }),
        React.createElement(Navbar_1["default"], null),
        React.createElement("div", { className: "flex w-full md:max-w-4xl mx-auto" },
            React.createElement(PreviewList_1["default"], { className: " sm:hidden md:hidden lg:block", selectedConversationKey: conversationKey }),
            React.createElement("div", { className: "xs:h-[765vh] mb-0 sm:h-[76vh]  md:h-[80vh] xl:h-[84vh]" },
                React.createElement(Card_1.Card, { className: "flex  flex-col justify !rounded-tr-xl !rounded-br-xl !rounded-none" }, showLoading ? (React.createElement("div", { className: "flex  flex-grow items-center justify-center" },
                    React.createElement(Loader_1["default"], null))) : (React.createElement(React.Fragment, null,
                    React.createElement(MessageHeader_1["default"], { profile: profile }),
                    React.createElement(MessagesList_1["default"], { currentProfile: currentProfile, profile: profile, fetchNextMessages: fetchNextMessages, messages: messages !== null && messages !== void 0 ? messages : [], hasMore: hasMore, missingXmtpAuth: missingXmtpAuth !== null && missingXmtpAuth !== void 0 ? missingXmtpAuth : false }),
                    React.createElement(Composer_1["default"], { sendMessage: sendMessage, conversationKey: conversationKey, disabledInput: missingXmtpAuth !== null && missingXmtpAuth !== void 0 ? missingXmtpAuth : false }))))))));
};
var MessagePage = function () {
    var currentProfileId = app_1.useAppStore(function (state) { var _a; return (_a = state.currentProfile) === null || _a === void 0 ? void 0 : _a.id; });
    var conversationKey = router_1.useRouter().query.conversationKey;
    // Need to have a login page for when there is no currentProfileId
    if (!conversationKey || !currentProfileId || !Array.isArray(conversationKey)) {
        return React.createElement(_404_1["default"], null);
    }
    var joinedConversationKey = conversationKey.join('/');
    var parsed = conversationKey_1.parseConversationKey(joinedConversationKey);
    if (!parsed) {
        return React.createElement(_404_1["default"], null);
    }
    var members = parsed.members;
    var profileId = members.find(function (member) { return member !== currentProfileId; });
    if (!profileId) {
        return React.createElement(_404_1["default"], null);
    }
    return React.createElement(Message, { conversationKey: joinedConversationKey });
};
exports["default"] = MessagePage;
