"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.Input = void 0;
var clsx_1 = require("clsx");
var react_1 = require("react");
exports.Input = react_1.forwardRef(function Input(_a, ref) {
    var label = _a.label, prefix = _a.prefix, _b = _a.type, type = _b === void 0 ? 'text' : _b, iconLeft = _a.iconLeft, iconRight = _a.iconRight, error = _a.error, _c = _a.className, className = _c === void 0 ? '' : _c, helper = _a.helper, props = __rest(_a, ["label", "prefix", "type", "iconLeft", "iconRight", "error", "className", "helper"]);
    var id = react_1.useId();
    var iconStyles = [
        'text-zinc-500 [&>*]:peer-focus:text-brand-500 [&>*]:h-5',
        { '!text-red-500 [&>*]:peer-focus:!text-red-500': error }
    ];
    return (React.createElement("label", { className: "w-full", htmlFor: id },
        label && (React.createElement("div", { className: "flex items-center mb-1 space-x-1.5" },
            React.createElement("div", { className: "font-medium text-gray-800 dark:text-gray-200" }, label))),
        React.createElement("div", { className: "flex" },
            prefix && (React.createElement("span", { className: "inline-flex items-center px-3 lt-text-gray-500 bg-gray-100 rounded-l-xl border border-r-0 border-gray-300 dark:bg-gray-900 " }, prefix)),
            React.createElement("div", { className: clsx_1["default"]({ '!border-red-500': error }, { 'focus-within:ring-1': !error }, { 'rounded-r-lg': prefix }, { 'rounded-lg': !prefix }, {
                    'opacity-60 bg-gray-500 bg-opacity-20': props.disabled
                }, 'flex items-center border bg-white  border-gray-300  w-full  ring-0 focus-within:ring-0 focus-visible:ring-0') },
                React.createElement("input", __assign({ id: id, className: clsx_1["default"]({ 'placeholder-red-500': error }, { 'rounded-r-lg': prefix }, { 'rounded-lg': !prefix }, 'peer border-none focus:ring-0 outline-none px-4 ring-0 focus-within:ring-0 focus-visible:ring-0 py-2 bg-transparent w-full', className), type: type, ref: ref }, props)),
                React.createElement("span", { tabIndex: -1, className: clsx_1["default"]({ 'order-first pl-3': iconLeft }, iconStyles) }, iconLeft),
                React.createElement("span", { tabIndex: -1, className: clsx_1["default"]({ 'order-last pr-3': iconRight }, iconStyles) }, iconRight)))));
});
