"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var app_1 = require("src/store/app");
var message_1 = require("src/store/message");
var conversationMatchesProfile_1 = require("src/utils/functions/conversationMatchesProfile");
var useXmtpClient_1 = require("src/utils/hooks/useXmtpClient");
var xmtp_js_1 = require("@xmtp/xmtp-js");
var link_1 = require("next/link");
var react_1 = require("react");
var bs_1 = require("react-icons/bs");
var MessageIcon = function () {
    var currentProfile = app_1.useAppStore(function (state) { return state.currentProfile; });
    var clearMessagesBadge = message_1.useMessagePersistStore(function (state) { return state.clearMessagesBadge; });
    var viewedMessagesAtNs = message_1.useMessagePersistStore(function (state) { return state.viewedMessagesAtNs; });
    var showMessagesBadge = message_1.useMessagePersistStore(function (state) { return state.showMessagesBadge; });
    var setShowMessagesBadge = message_1.useMessagePersistStore(function (state) { return state.setShowMessagesBadge; });
    var cachedClient = useXmtpClient_1["default"](true).client;
    var shouldShowBadge = function (viewedAt, messageSentAt) {
        if (!messageSentAt) {
            return false;
        }
        var viewedMessagesAt = xmtp_js_1.fromNanoString(viewedAt);
        return (!viewedMessagesAt ||
            (viewedMessagesAt.getTime() < messageSentAt.getTime() && messageSentAt.getTime() < new Date().getTime()));
    };
    react_1.useEffect(function () {
        if (!cachedClient || !currentProfile) {
            return;
        }
        var matcherRegex = conversationMatchesProfile_1["default"](currentProfile.id);
        var fetchShowBadge = function () { return __awaiter(void 0, void 0, void 0, function () {
            var convos, matchingConvos, topics, mostRecentMessages, mostRecentMessage, sentAt, showBadge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cachedClient.conversations.list()];
                    case 1:
                        convos = _a.sent();
                        matchingConvos = convos.filter(function (convo) { var _a; return ((_a = convo.context) === null || _a === void 0 ? void 0 : _a.conversationId) && matcherRegex.test(convo.context.conversationId); });
                        if (matchingConvos.length <= 0) {
                            return [2 /*return*/];
                        }
                        topics = matchingConvos.map(function (convo) { return convo.topic; });
                        return [4 /*yield*/, cachedClient.listEnvelopes(topics, function (e) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, e];
                            }); }); }, {
                                limit: 1,
                                direction: xmtp_js_1.SortDirection.SORT_DIRECTION_DESCENDING
                            })];
                    case 2:
                        mostRecentMessages = _a.sent();
                        mostRecentMessage = mostRecentMessages.length > 0 ? mostRecentMessages[0] : null;
                        sentAt = xmtp_js_1.fromNanoString(mostRecentMessage === null || mostRecentMessage === void 0 ? void 0 : mostRecentMessage.timestampNs);
                        showBadge = shouldShowBadge(viewedMessagesAtNs.get(currentProfile.id), sentAt);
                        showMessagesBadge.set(currentProfile.id, showBadge);
                        setShowMessagesBadge(new Map(showMessagesBadge));
                        return [2 /*return*/];
                }
            });
        }); };
        var messageStream;
        var closeMessageStream = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!messageStream) return [3 /*break*/, 2];
                        return [4 /*yield*/, messageStream["return"](undefined)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        // For v1 badging, only badge when not already viewing messages. Once we have
        // badging per-conversation, we can remove this.
        var newMessageValidator = function (profileId) {
            return !window.location.pathname.startsWith('/messages') && currentProfile.id === profileId;
        };
        var streamAllMessages = function (messageValidator) { return __awaiter(void 0, void 0, void 0, function () {
            var messageStream_1, messageStream_1_1, message, conversationId, isFromPeer, showBadge, e_1_1;
            var e_1, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, cachedClient.conversations.streamAllMessages()];
                    case 1:
                        messageStream = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 7, 8, 13]);
                        messageStream_1 = __asyncValues(messageStream);
                        _c.label = 3;
                    case 3: return [4 /*yield*/, messageStream_1.next()];
                    case 4:
                        if (!(messageStream_1_1 = _c.sent(), !messageStream_1_1.done)) return [3 /*break*/, 6];
                        message = messageStream_1_1.value;
                        if (messageValidator(currentProfile.id)) {
                            conversationId = (_b = message.conversation.context) === null || _b === void 0 ? void 0 : _b.conversationId;
                            isFromPeer = currentProfile.ownedBy !== message.senderAddress;
                            if (isFromPeer && conversationId && matcherRegex.test(conversationId)) {
                                showBadge = shouldShowBadge(viewedMessagesAtNs.get(currentProfile.id), message.sent);
                                showMessagesBadge.set(currentProfile.id, showBadge);
                                setShowMessagesBadge(new Map(showMessagesBadge));
                            }
                        }
                        _c.label = 5;
                    case 5: return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _c.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _c.trys.push([8, , 11, 12]);
                        if (!(messageStream_1_1 && !messageStream_1_1.done && (_a = messageStream_1["return"]))) return [3 /*break*/, 10];
                        return [4 /*yield*/, _a.call(messageStream_1)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        }); };
        fetchShowBadge();
        streamAllMessages(newMessageValidator);
        return function () {
            closeMessageStream();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cachedClient, currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.id]);
    return (React.createElement(link_1["default"], { href: "/messages", className: "hidden w-[40px] items-start justify-center rounded-full py-1.5 md:flex", onClick: function () {
            currentProfile && clearMessagesBadge(currentProfile.id);
        } },
        React.createElement(bs_1.BsEnvelope, { size: 24 }),
        showMessagesBadge.get(currentProfile === null || currentProfile === void 0 ? void 0 : currentProfile.id) ? (React.createElement("span", { className: "h-2 w-2 rounded-full bg-red-500" })) : null));
};
exports["default"] = MessageIcon;
