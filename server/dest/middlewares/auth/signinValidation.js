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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable require-atomic-updates */
var express_validator_1 = require("express-validator");
var crypto_1 = __importDefault(require("crypto"));
var db_1 = __importDefault(require("../../db"));
var errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
var signinValidation = [
    (0, express_validator_1.body)('username')
        .trim()
        .notEmpty()
        .withMessage('Username should not be empty'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty()
        .withMessage('Password should not be empty')
        .custom(function (value, _a) {
        var req = _a.req;
        return __awaiter(void 0, void 0, void 0, function () {
            var username, data, result, _b, userId, firstName, lastName, email, contact, address, password, salt, createdAt, updatedAt, name_1, url, fileName, hash, user, profile, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        username = req.body.username;
                        data = {
                            text: 'SELECT * FROM user_account INNER JOIN image USING(user_id) WHERE username=$1',
                            values: [username],
                        };
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.default.query(data)];
                    case 2:
                        result = _c.sent();
                        if (result.rowCount === 0)
                            throw (0, errorHandler_1.default)('You have not register,Please register', 400);
                        _b = result.rows[0], userId = _b.user_id, firstName = _b.first_name, lastName = _b.last_name, email = _b.email, contact = _b.contact, address = _b.address, password = _b.password, salt = _b.salt, createdAt = _b.created_at, updatedAt = _b.updated_at, name_1 = _b.name, url = _b.url, fileName = _b.file_name;
                        hash = crypto_1.default.pbkdf2Sync(value, salt, 1000, 64, 'sha512').toString('hex');
                        if (hash !== password)
                            throw (0, errorHandler_1.default)('Password is incorrect', 400);
                        user = {
                            userId: userId,
                            firstName: firstName,
                            lastName: lastName,
                            username: username,
                            email: email,
                            contact: contact,
                            address: address,
                            createdAt: createdAt,
                            updatedAt: updatedAt,
                        };
                        profile = url ? {
                            name: name_1,
                            url: url,
                            fileName: fileName,
                        } : undefined;
                        req.body.user = user;
                        req.body.profile = profile;
                        return [2 /*return*/, true];
                    case 3:
                        err_1 = _c.sent();
                        throw (0, errorHandler_1.default)(err_1.message, err_1.status);
                    case 4: return [2 /*return*/];
                }
            });
        });
    }),
];
exports.default = signinValidation;
