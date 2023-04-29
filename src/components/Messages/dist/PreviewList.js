"use strict";
exports.__esModule = true;
var Preview_1 = require("src/components/Messages/Preview");
var Card_1 = require("src/components/UI/Card");
var EmptyState_1 = require("src/components/UI/EmptyState");
var ErrorMessage_1 = require("src/components/UI/ErrorMessage");
var clsx_1 = require("clsx");
var constants_1 = require("src/constants");
var lens_1 = require("src/utils/lens");
var router_1 = require("next/router");
var react_1 = require("react");
var app_1 = require("src/store/app");
var message_1 = require("src/store/message");
var useMessagePreviews_1 = require("src/utils/hooks/useMessagePreviews");
var buildConversationId_1 = require("src/utils/functions/buildConversationId");
var conversationKey_1 = require("src/utils/functions/conversationKey");
var Loader_1 = require("src/components/UI/Loader");
var Modal_1 = require("src/components/UI/Modal");
var bi_1 = require("react-icons/bi");
var hi_1 = require("react-icons/hi");
var Following_1 = require("src/components/ProfilePage/Following");
var client_1 = require("@apollo/client");
var useDebounce_1 = require("src/utils/hooks/useDebounce");
var react_detect_click_outside_1 = require("react-detect-click-outside");
var bs_1 = require("react-icons/bs");
var PreviewList = function (_a) {
    var _b, _c;
    var className = _a.className, selectedConversationKey = _a.selectedConversationKey;
    var router = router_1.useRouter();
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    var addProfileAndSelectTab = message_1.useMessageStore(function (state) { return state.addProfileAndSelectTab; });
    var selectedTab = message_1.useMessageStore(function (state) { return state.selectedTab; });
    var setSelectedTab = message_1.useMessageStore(function (state) { return state.setSelectedTab; });
    var _d = react_1.useState(false), showSearchModal = _d[0], setShowSearchModal = _d[1];
    var _e = react_1.useState(''), keyword = _e[0], setKeyword = _e[1];
    var debouncedValue = useDebounce_1["default"](keyword, 500);
    var _f = react_1.useState(false), showResults = _f[0], setResults = _f[1];
    var _g = react_1.useState(lens_1.SearchRequestTypes.Profile), activeSearch = _g[0], setActiveSearch = _g[1];
    var _h = useMessagePreviews_1["default"](), authenticating = _h.authenticating, loading = _h.loading, messages = _h.messages, profilesToShow = _h.profilesToShow, requestedCount = _h.requestedCount, profilesError = _h.profilesError;
    var clearMessagesBadge = message_1.useMessagePersistStore(function (state) { return state.clearMessagesBadge; });
    var sortedProfiles = Array.from(profilesToShow).sort(function (_a, _b) {
        var _c, _d;
        var keyA = _a[0];
        var keyB = _b[0];
        var messageA = messages.get(keyA);
        var messageB = messages.get(keyB);
        return (((_c = messageA === null || messageA === void 0 ? void 0 : messageA.sent) === null || _c === void 0 ? void 0 : _c.getTime()) || 0) >= (((_d = messageB === null || messageB === void 0 ? void 0 : messageB.sent) === null || _d === void 0 ? void 0 : _d.getTime()) || 0) ? -1 : 1;
    });
    var _j = client_1.useLazyQuery(lens_1.SearchProfilesDocument), getProfiles = _j[0], _k = _j[1], searchResults = _k.data, searchLoading = _k.loading;
    var onDebounce = function () {
        if (keyword.trim().length) {
            getProfiles({
                variables: {
                    request: {
                        type: activeSearch,
                        query: keyword,
                        limit: 5
                    }
                }
            });
        }
    };
    react_1.useEffect(function () {
        onDebounce();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, activeSearch]);
    var clearSearch = function () {
        setKeyword('');
    };
    var onSearchProfile = (function (e) {
        if (e.target.value.length > 0) {
            setResults(true);
            setKeyword(e.target.value);
        }
        else {
            setResults(false);
            setKeyword('');
        }
    });
    react_1.useEffect(function () {
        if (!currentProfile) {
            return;
        }
        clearMessagesBadge(currentProfile.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProfile]);
    var showAuthenticating = currentProfile && authenticating;
    var showLoading = loading && (messages.size === 0 || profilesToShow.size === 0);
    var newMessageClick = function () {
        setShowSearchModal(true);
    };
    var onProfileSelected = function (profile) {
        var conversationId = buildConversationId_1["default"](currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.id, profile.id);
        var conversationKey = conversationKey_1.buildConversationKey(profile.ownedBy, conversationId);
        addProfileAndSelectTab(conversationKey, profile);
        router.push("/messages/" + conversationKey);
        setShowSearchModal(false);
    };
    var closeSearch = function () {
        setResults(false);
    };
    // @ts-ignore
    var searchProfiles = (_b = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search) === null || _b === void 0 ? void 0 : _b.items;
    var searchRef = react_detect_click_outside_1.useDetectClickOutside({ onTriggered: closeSearch, triggerKeys: ['Escape', 'x'] });
    return (React.createElement("div", { className: clsx_1["default"]('xs:h-[85vh] mb-0 sm:h-[76vh] md:w-1/3 md:h-[80vh] xl:h-[84vh]', className) },
        React.createElement(Card_1.Card, { className: "flex h-full flex-col justify-between !border-r-0 !rounded-tl-xl !rounded-bl-xl !rounded-none" },
            React.createElement("div", { className: "flex items-center justify-between border-b p-5 border-gray-700" },
                React.createElement("div", { className: "font-bold" }, "Messages"),
                currentProfile && !showAuthenticating && !showLoading && (React.createElement("button", { onClick: newMessageClick, type: "button" },
                    React.createElement(bi_1.BiPlusCircle, { className: "h-6 w-6" })))),
            React.createElement("div", { className: "flex" },
                React.createElement("div", { onClick: function () { return setSelectedTab('Following'); }, className: clsx_1["default"]('text-brand2-500 tab-bg m-2 ml-4 flex flex-1 cursor-pointer items-center justify-center rounded-full p-2 font-bold', selectedTab === 'Following' ? 'bg-brand2-100' : '') },
                    React.createElement(hi_1.HiOutlineUsers, { className: "mr-2 h-4 w-4" }),
                    "Following"),
                React.createElement("div", { onClick: function () { return setSelectedTab('Requested'); }, className: clsx_1["default"]('text-brand2-500 tab-bg m-2 mr-4 flex flex-1 cursor-pointer items-center justify-center rounded-full p-2 font-bold', selectedTab === 'Requested' ? 'bg-brand2-100' : '') },
                    "Requested",
                    requestedCount > 0 && (React.createElement("span", { className: "bg-brand2-200 ml-2 rounded-2xl px-3 py-0.5 text-sm font-bold" }, requestedCount > 99 ? '99+' : requestedCount)))),
            selectedTab === 'Requested' ? (React.createElement("div", { className: "mt-1 bg-yellow-100 p-2 px-5 text-sm text-yellow-800" }, "These conversations are from Lens profiles that you don't currently follow.")) : null,
            React.createElement("div", { className: "h-full overflow-y-auto overflow-x-hidden" }, showAuthenticating ? (React.createElement("div", { className: "flex h-full flex-grow items-center justify-center" },
                React.createElement(Loader_1["default"], null))) : showLoading ? (React.createElement("div", { className: "flex h-full flex-grow items-center justify-center" },
                React.createElement(Loader_1["default"], null))) : profilesError ? (React.createElement(ErrorMessage_1.ErrorMessage, { className: "m-5", title: "Failed to load messages", error: { message: constants_1.ERROR_MESSAGE, name: constants_1.ERROR_MESSAGE } })) : sortedProfiles.length === 0 ? (React.createElement("button", { className: "h-full w-full justify-items-center", onClick: newMessageClick, type: "button" },
                React.createElement(EmptyState_1.EmptyState, { message: "Start messaging your Lens frens", icon: React.createElement(bi_1.BiMessageRoundedDots, { className: "text-brand h-8 w-8" }), hideCard: true }))) : (sortedProfiles === null || sortedProfiles === void 0 ? void 0 : sortedProfiles.map(function (_a) {
                var key = _a[0], profile = _a[1];
                var message = messages.get(key);
                if (!message) {
                    return null;
                }
                return (React.createElement(Preview_1["default"], { isSelected: key === selectedConversationKey, key: key, profile: profile, conversationKey: key, message: message }));
            })))),
        React.createElement(Modal_1.Modal, { title: "New message", icon: React.createElement(bi_1.BiMessageRoundedDots, { className: "text-brand2 h-5 w-5" }), size: "sm", show: showSearchModal, onClose: function () { return setShowSearchModal(false); } },
            React.createElement("div", { className: "w-full px-4 pt-4" },
                React.createElement("div", { ref: searchRef, className: "relative w-full overflow-hidden border border-gray-300 cursor-default border-gray-700  rounded-full sm:text-sm" },
                    React.createElement("input", { className: "w-full py-3 pl-12 pr-4 text-sm bg-transparent focus:outline-none", onChange: function (e) { return onSearchProfile(e); }, placeholder: "Search for someone to message...", value: keyword }),
                    React.createElement("div", { className: "absolute inset-y-0 left-0 flex items-center pl-4" },
                        React.createElement(bs_1.BsSearch, { className: "w-4 h-4 text-gray-600", "aria-hidden": "true" })))),
            searchLoading && React.createElement("div", { className: "flex flex-row items-center py-8 justify-center" },
                React.createElement(Loader_1["default"], null)),
            showResults &&
                React.createElement("div", { className: "w-full py-4" },
                    React.createElement("div", { className: "flex flex-col divide-y divide-gray-700" }, ((_c = searchResults === null || searchResults === void 0 ? void 0 : searchResults.search) === null || _c === void 0 ? void 0 : _c.__typename) === 'ProfileSearchResult' && searchProfiles.length === 0 && (React.createElement("div", { className: "flex flex-col items-center justify-center" }, "No results found")))),
            !showResults && currentProfile &&
                React.createElement(Following_1["default"], { profile: currentProfile }))));
};
exports["default"] = PreviewList;
