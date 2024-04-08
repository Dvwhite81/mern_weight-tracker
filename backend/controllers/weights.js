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
const weight_1 = __importDefault(require("../models/weight"));
const weightsRouter = (0, express_1.Router)();
// Get All Weights
weightsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET');
    const weights = yield weight_1.default.find({}).populate('user', { username: 1 });
    console.log('weights:', weights);
    res.json(weights);
}));
// Get Weight by ID
weightsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const weight = yield weight_1.default.findById(req.params.id);
    if (weight)
        res.json(weight);
    else
        res.status(404).end();
}));
// Add Weight
weightsRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST');
    const { body, user } = req;
    if (!user) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    const weightObj = body.weight;
    const { weight, date } = weightObj;
    const newWeightModel = new weight_1.default({
        weight,
        date,
        user: user.id,
    });
    user.weights = user.weights.concat(newWeightModel);
    yield user.save();
    res.status(201).json({
        newWeightModel,
        success: true,
        message: 'Added weight successfully',
        weights: user.weights,
    });
}));
// Not sure if I need this -
// Right now weights are deleted through usersRouter,
// but might want to verify token
weightsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { user } = req;
    if (!user) {
        return res.status(401).json({
            error: 'missing or invalid token',
        });
    }
    const weightToDelete = yield weight_1.default.findById(id);
    if (((_a = weightToDelete === null || weightToDelete === void 0 ? void 0 : weightToDelete.user) === null || _a === void 0 ? void 0 : _a.toString()) !== user.id.toString()) {
        res.status(401).end();
    }
    else {
        yield weight_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
}));
// Edit Weight
weightsRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { weight, date } = req.body;
    const weightObj = {
        weight,
        date,
    };
    const updatedWeightModel = yield weight_1.default.findByIdAndUpdate(id, weightObj, {
        new: true,
    });
    res.json(updatedWeightModel);
}));
exports.default = weightsRouter;
