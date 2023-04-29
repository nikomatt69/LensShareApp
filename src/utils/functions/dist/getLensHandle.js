"use strict";
exports.__esModule = true;
var constants_1 = require("src/constants");
var getLensHandle = function (handle) {
    var name = handle.replace('.lens', '').replace('.test', '');
    return name + "." + (constants_1.IS_MAINNET ? 'lens' : 'test');
};
exports["default"] = getLensHandle;
