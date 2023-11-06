"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./task.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_role_1 = require("../../../enums/user.role");
const router = express_1.default.Router();
router.post("/create-task", (0, auth_1.default)(user_role_1.UserRoles.ADMIN, user_role_1.UserRoles.USER), task_controller_1.TaskControllers.crateTask);
router.get("/get-tasks", (0, auth_1.default)(user_role_1.UserRoles.ADMIN, user_role_1.UserRoles.USER), task_controller_1.TaskControllers.retrieveAllTask);
router.patch("/update-task/:taskId", (0, auth_1.default)(user_role_1.UserRoles.ADMIN, user_role_1.UserRoles.USER), task_controller_1.TaskControllers.updateTask);
router.delete("/remove-task/:taskId", (0, auth_1.default)(user_role_1.UserRoles.ADMIN, user_role_1.UserRoles.USER), task_controller_1.TaskControllers.removeTask);
exports.TaskRoutes = router;
