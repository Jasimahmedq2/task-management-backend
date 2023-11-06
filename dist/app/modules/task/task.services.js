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
exports.TaskServices = void 0;
const task_model_1 = require("./task.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const createTask = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.user = userId;
    const result = yield task_model_1.Task.create(payload);
    return result;
});
const retrieveAllTask = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.find({ user: userId });
    return result;
});
const updateTask = (taskId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const findTask = yield task_model_1.Task.findById(taskId);
    if (!findTask) {
        throw new apiError_1.default(400, "task not found");
    }
    const result = yield task_model_1.Task.findByIdAndUpdate(taskId, payload, {
        new: true,
    });
    return result;
});
const removeTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    const findTask = yield task_model_1.Task.findById(taskId);
    if (!findTask) {
        throw new apiError_1.default(400, "task not found");
    }
    const result = yield task_model_1.Task.findByIdAndRemove(taskId);
    return result;
});
exports.TaskServices = {
    createTask,
    removeTask,
    retrieveAllTask,
    updateTask,
};
