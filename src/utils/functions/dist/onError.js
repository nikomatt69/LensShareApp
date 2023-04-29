"use strict";
exports.__esModule = true;
var constants_1 = require("src/constants");
var react_hot_toast_1 = require("react-hot-toast");
var onError = function (error) {
    var _a, _b, _c;
    react_hot_toast_1["default"].error((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) !== null && _b !== void 0 ? _b : error === null || error === void 0 ? void 0 : error.message) !== null && _c !== void 0 ? _c : constants_1.ERROR_MESSAGE);
};
exports["default"] = onError;
