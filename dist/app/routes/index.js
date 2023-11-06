"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const task_routes_1 = require("../modules/task/task.routes");
const router = express_1.default.Router();
const CoreRoutes = [
    {
        path: "/auth",
        element: auth_route_1.AuthRoutes,
    },
    {
        path: "/task",
        element: task_routes_1.TaskRoutes,
    },
];
CoreRoutes.forEach((route) => router.use(route.path, route.element));
exports.default = router;
