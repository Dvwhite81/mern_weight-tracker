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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const user_1 = __importDefault(require("../models/user"));
const loginRouter = (0, express_1.Router)();
const handleNormalAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req:', req);
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email: email });
    console.log('loginRouter user:', user);
    const correctPassword = user === null
        ? false
        : yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!user || !correctPassword) {
        console.log('loginRouter returning error');
        return res.send({
            status: 401,
            success: false,
            message: 'Invalid email or password',
        });
    }
    console.log('loginRouter after error');
    const userForToken = {
        email: user.email,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET, {
        expiresIn: 60 * 60,
    });
    res.status(200).send({
        token,
        success: true,
        message: 'Logged in successfully',
        user: user,
        weights: user.weights,
    });
});
const handleGoogleAuthLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { googleAccessToken } = req.body;
    const response = yield axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${googleAccessToken}`,
        },
    });
    const { email } = response.data;
    const user = yield user_1.default.findOne({ email: email });
    console.log('loginRouter user:', user);
    if (!user) {
        console.log('loginRouter returning error');
        return res.send({
            status: 401,
            success: false,
            message: 'Invalid username or password',
        });
    }
    const userForToken = {
        email: user.email,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET, {
        expiresIn: 60 * 60,
    });
    res.status(200).send({
        token,
        success: true,
        message: 'Logged in successfully',
        user: user,
        weights: user.weights,
    });
});
loginRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Normal auth
    if (!req.body.googleAccessToken) {
        console.log('normal');
        handleNormalAuthLogin(req, res);
        // Google auth
    }
    else {
        console.log('google');
        handleGoogleAuthLogin(req, res);
    }
}));
exports.default = loginRouter;
