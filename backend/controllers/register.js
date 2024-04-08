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
require("express-async-errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const user_1 = __importDefault(require("../models/user"));
const registerRouter = (0, express_1.Router)();
const handleNormalAuthRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('req.body:', req.body);
    const { email, password } = req.body;
    const passwordHash = yield bcryptjs_1.default.hash(password, 10);
    try {
        if (email === '' || password === '' || !passwordHash) {
            console.log('ERROR');
            return res.send({
                status: 400,
                success: false,
                message: 'All fields are required',
            });
        }
        const user = new user_1.default({
            email,
            passwordHash,
        });
        console.log('register user:', user);
        const savedUser = yield user.save();
        res.status(201).json({
            success: true,
            message: 'Registered successfully',
            user: savedUser,
        });
    }
    catch (error) {
        console.log('error:', error);
    }
});
const handleGoogleAuthRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { googleAccessToken } = req.body;
    const response = yield axios_1.default.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            Authorization: `Bearer ${googleAccessToken}`,
        },
    });
    const { email, username } = response.data;
    const existingUser = yield user_1.default.findOne({ email: email });
    console.log('loginRouter existingUser:', existingUser);
    if (existingUser) {
        console.log('registerRouter user exists');
        return res.send({
            status: 401,
            success: false,
            message: 'User already exists. Try logging in.',
        });
    }
    try {
        const user = new user_1.default({
            email,
            username,
        });
        console.log('register user:', user);
        const savedUser = yield user.save();
        const userForToken = {
            email: savedUser.email,
            id: savedUser._id,
        };
        const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET, {
            expiresIn: 60 * 60,
        });
        res.status(201).json({
            success: true,
            message: 'Registered successfully',
            user: savedUser,
            token: token,
        });
    }
    catch (error) {
        console.log('error:', error);
    }
});
registerRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Normal auth
    if (!req.body.googleAccessToken) {
        handleNormalAuthRegister(req, res);
        // Google auth
    }
    else {
        handleGoogleAuthRegister(req, res);
    }
}));
exports.default = registerRouter;
