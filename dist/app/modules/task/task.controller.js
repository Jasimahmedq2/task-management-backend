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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskControllers = void 0;
const task_services_1 = require("./task.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const retrieveAllTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    try {
        const result = yield task_services_1.TaskServices.retrieveAllTask(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully retrieve all tasks",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const crateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const taskInfo = __rest(req.body, []);
    try {
        const result = yield task_services_1.TaskServices.createTask(userId, taskInfo);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully created a tasks",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const taskInfo = __rest(req.body, []);
    try {
        const result = yield task_services_1.TaskServices.updateTask(taskId, taskInfo);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully updated a tasks",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const removeTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    try {
        const result = yield task_services_1.TaskServices.removeTask(taskId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "successfully removed a tasks",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.TaskControllers = {
    removeTask,
    crateTask,
    retrieveAllTask,
    updateTask,
};
