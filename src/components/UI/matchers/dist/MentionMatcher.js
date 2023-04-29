"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.MentionMatcher = exports.Mention = void 0;
var formatHandle_1 = require("src/utils/functions/formatHandle");
var interweave_1 = require("interweave");
var link_1 = require("next/link");
var react_1 = require("react");
exports.Mention = function (_a) {
    var props = __rest(_a, []);
    var profile = {
        __typename: 'Profile',
        handle: props === null || props === void 0 ? void 0 : props.display.slice(1),
        name: null,
        id: null
    };
    return (React.createElement(link_1["default"], { href: "/" + formatHandle_1["default"](props.display.slice(1)), onClick: function (event) {
            event.stopPropagation();
        } }));
};
var MentionMatcher = /** @class */ (function (_super) {
    __extends(MentionMatcher, _super);
    function MentionMatcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MentionMatcher.prototype.replaceWith = function (match, props) {
        return react_1.createElement(exports.Mention, props, match);
    };
    MentionMatcher.prototype.asTag = function () {
        return 'a';
    };
    MentionMatcher.prototype.match = function (value) {
        return this.doMatch(value, /@[\w.-]+/, function (matches) {
            return { display: matches[0] };
        });
    };
    return MentionMatcher;
}(interweave_1.Matcher));
exports.MentionMatcher = MentionMatcher;
