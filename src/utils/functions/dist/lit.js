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
exports.__esModule = true;
var sdk_browser_1 = require("@lit-protocol/sdk-browser");
var client = new sdk_browser_1["default"].LitNodeClient({ alertWhenUnauthorized: true });
// For all EVM compatible chain
var chain = "mainnet";
var address1 = "FirstAddress";
var address2 = "SecondAddress";
var accessControlConditions = [
    {
        // check if the author of the post is in possession
        // of a specific wallet address
        // https://developer.litprotocol.com/AccessControlConditions/EVM/basicExamples
        contractAddress: "",
        standardContractType: "",
        chain: chain,
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
            comparator: "=",
            // post author address
            value: "0x1" || undefined
        }
    },
    { operator: "or" },
    {
        contractAddress: "",
        standardContractType: "",
        chain: "mainnet",
        method: "",
        parameters: [":userAddress"],
        returnValueTest: {
            comparator: "=",
            // comment author address
            value: "0x2"
        }
    },
];
var setAccessControlConditions = function (address_1, address_2) {
    console.log("Set access control conditions, address 1:", address_1);
    accessControlConditions[0].returnValueTest.value = address_1;
    accessControlConditions[2].returnValueTest.value = address_2;
    console.log("Access control conditions:", accessControlConditions);
    return accessControlConditions;
};
var Lit = /** @class */ (function () {
    function Lit() {
    }
    Lit.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        this.litNodeClient = client;
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log("Error while connecting to Lit nodes", err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Lit.prototype.encryptString = function (text, address1, address2) {
        return __awaiter(this, void 0, void 0, function () {
            var authSig, _a, encryptedString, symmetricKey, conditions, encryptedSymmetricKey;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("Encrypt string address 1:", address1);
                        if (!!this.litNodeClient) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, sdk_browser_1["default"].checkAndSignAuthMessage({ chain: chain })];
                    case 3:
                        authSig = _b.sent();
                        return [4 /*yield*/, sdk_browser_1["default"].encryptString(text)];
                    case 4:
                        _a = _b.sent(), encryptedString = _a.encryptedString, symmetricKey = _a.symmetricKey;
                        console.log("encrypted string:", encryptedString);
                        return [4 /*yield*/, setAccessControlConditions(address1, address2)];
                    case 5:
                        conditions = _b.sent();
                        return [4 /*yield*/, this.litNodeClient.saveEncryptionKey({
                                accessControlConditions: conditions,
                                symmetricKey: symmetricKey,
                                authSig: authSig,
                                chain: chain
                            })];
                    case 6:
                        encryptedSymmetricKey = _b.sent();
                        console.log("access control conditions", setAccessControlConditions(address1, address2));
                        return [2 /*return*/, {
                                encryptedFile: encryptedString,
                                encryptedSymmetricKey: sdk_browser_1["default"].uint8arrayToString(encryptedSymmetricKey, "base16")
                            }];
                }
            });
        });
    };
    Lit.prototype.decryptString = function (encryptedStr, encryptedSymmetricKey, address1, address2) {
        return __awaiter(this, void 0, void 0, function () {
            var authSig, symmetricKey, decryptedFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.litNodeClient) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, sdk_browser_1["default"].checkAndSignAuthMessage({ chain: chain })];
                    case 3:
                        authSig = _a.sent();
                        return [4 /*yield*/, this.litNodeClient.getEncryptionKey({
                                accessControlConditions: setAccessControlConditions(address1, address2),
                                toDecrypt: encryptedSymmetricKey,
                                chain: chain,
                                authSig: authSig
                            })];
                    case 4:
                        symmetricKey = _a.sent();
                        return [4 /*yield*/, sdk_browser_1["default"].decryptString(encryptedStr, symmetricKey)];
                    case 5:
                        decryptedFile = _a.sent();
                        // eslint-disable-next-line no-console
                        /*  console.log( {
                          decryptedFile,
                        }); */
                        return [2 /*return*/, { decryptedFile: decryptedFile }];
                }
            });
        });
    };
    return Lit;
}());
exports["default"] = new Lit();
