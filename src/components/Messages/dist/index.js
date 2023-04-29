"use strict";
exports.__esModule = true;
var MetaTags_1 = require("src/components/UI/MetaTags");
var Card_1 = require("src/components/UI/Card");
var constants_1 = require("src/constants");
var _404_1 = require("src/pages/404");
var PreviewList_1 = require("./PreviewList");
var app_1 = require("src/store/app");
var NoConversationSelected = function () {
    return (React.createElement("div", { className: "flex h-full flex-col text-center" },
        React.createElement("div", { className: "m-auto" },
            React.createElement("span", { className: "text-center text-5xl" }, "\uD83D\uDC4B"),
            React.createElement("h3", { className: "mt-3 mb-2 text-lg" }, "Select a conversation"),
            React.createElement("p", { className: "text-md lt-text-gray-500 max-w-xs" }, "Choose an existing conversation or create a new one to start messaging"))));
};
var Messages = function () {
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    if (!currentProfile) {
        return React.createElement(_404_1["default"], null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(MetaTags_1["default"], { title: "Messages :: " + constants_1.APP_NAME }),
        React.createElement("div", { className: "flex w-full md:max-w-6xl mx-auto" },
            React.createElement(PreviewList_1["default"], null),
            React.createElement("div", { className: "xs:hidden sm:hidden sm:h-[76vh] md:w-3/4 md:hidden md:h-[80vh] lg:block xl:h-[84vh]" },
                React.createElement(Card_1.Card, { className: " flex h-full w-full !rounded-tr-xl !rounded-br-xl !rounded-none" },
                    React.createElement(NoConversationSelected, null))))));
};
exports["default"] = Messages;
