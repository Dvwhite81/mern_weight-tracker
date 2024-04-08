"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const weightSchema = new mongoose_1.default.Schema({
    weight: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
});
weightSchema.set('toJSON', {
    transform: (document, returnedToDo) => {
        returnedToDo.id = returnedToDo._id.toString();
        delete returnedToDo._id;
        delete returnedToDo.__v;
    },
});
const ToDoModel = mongoose_1.default.model('ToDoModel', weightSchema);
exports.default = ToDoModel;
