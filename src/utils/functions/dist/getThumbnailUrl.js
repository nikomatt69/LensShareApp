'use strict';
exports.__esModule = true;
var constants_1 = require('src/constants');
var sanitizeIpfsUrl_1 = require('./sanitizeIpfsUrl');
var getThumbnailUrl = function (publication) {
  var _a, _b, _c;
  var url =
    ((_b =
      (_a = publication.metadata) === null || _a === void 0
        ? void 0
        : _a.media[0]) === null || _b === void 0
      ? void 0
      : _b.original.url) ||
    ((_c = publication.metadata) === null || _c === void 0
      ? void 0
      : _c.image) ||
    constants_1.APP_NAME + '/fallbackThumbnail.png';
  return sanitizeIpfsUrl_1['default'](url);
};
exports['default'] = getThumbnailUrl;
