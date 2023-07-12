'use strict';
exports.__esModule = true;
var constants_1 = require('src/constants');
var sanitizeIpfsUrl_1 = require('./sanitizeIpfsUrl');
var getVideoCoverUrl = function (publication) {
  var _a, _b;
  var url =
    ((_b =
      (_a = publication.metadata.cover) === null || _a === void 0
        ? void 0
        : _a.original) === null || _b === void 0
      ? void 0
      : _b.url) || constants_1.APP_NAME + '/fallbackThumbnail.png';
  return sanitizeIpfsUrl_1['default'](url);
};
exports['default'] = getVideoCoverUrl;
