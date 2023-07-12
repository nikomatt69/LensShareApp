'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var uploadToIPFS_1 = require('./uploadToIPFS');
var html_entities_1 = require('html-entities');
var getTextNftUrl = function (content, username, timestamp) {
  return __awaiter(void 0, void 0, void 0, function () {
    var svg, blob, file, result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          svg =
            '<svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <style>\n      .content {\n        font: normal 14px sans-serif;\n        color: black;\n      }\n      .timestamp {\n        font: normal 13px sans-serif;\n        color: white;\n        opacity: 70%;\n      }\n      .username {\n        font: bold 15px sans-serif;\n        color: white;\n      }\n    </style>\n    <g clip-path="url(#clip0_1_2)">\n    <path d="M475 0H25C11.1929 0 0 11.1929 0 25V475C0 488.807 11.1929 500 25 500H475C488.807 500 500 488.807 500 475V25C500 11.1929 488.807 0 475 0Z" fill="white"/>\n    <foreignObject x="30" y="90" width="440" height="300">\n    <p class="content" xmlns="http://www.w3.org/1999/xhtml">' +
            html_entities_1.encode(content, {
              mode: 'nonAsciiPrintable',
              level: 'xml'
            }) +
            '}</p>\n    </foreignObject>\n    <path d="M0 25C0 11.1929 11.1929 0 25 0H475C488.807 0 500 11.1929 500 25V78H0V25Z" fill="#ec1e25" fill-opacity="0.90"/>\n    <path d="M500.06 474.236C500.026 488.043 488.806 499.208 474.999 499.174L24.9999 498.062C11.193 498.027 0.0276556 486.807 0.0617778 473L0.192759 420L500.191 421.236L500.06 474.236Z" fill="#ec1e25" fill-opacity="0.90"/>\n    <foreignObject x="350" y="440" width="440" height="300">\n    <p class="timestamp" xmlns="http://www.w3.org/1999/xhtml">' +
            timestamp +
            '</p>\n    </foreignObject>\n    <foreignObject x="30" y="15" width="440" height="300">\n    <p class="username" xmlns="http://www.w3.org/1999/xhtml">@' +
            username +
            '</p>\n    </foreignObject>\n    </g>\n    <defs>\n    <clipPath id="clip0_1_2">\n    <rect width="500" height="500" fill="white"/>\n    </clipPath>\n    </defs>\n</svg>\n';
          blob = new Blob([svg], { type: 'image/svg+xml' });
          file = new File([blob], 'post.svg', {
            lastModified: new Date().getTime(),
            type: blob.type
          });
          return [4 /*yield*/, uploadToIPFS_1.uploadToIPFS(file)];
        case 1:
          result = _a.sent();
          return [2 /*return*/, result ? result : ''];
      }
    });
  });
};
exports['default'] = getTextNftUrl;
