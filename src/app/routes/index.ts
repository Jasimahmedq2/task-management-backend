import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { TaskRoutes } from "../modules/task/task.routes";

const router = express.Router();

const CoreRoutes = [
  {
    path: "/auth",
    element: AuthRoutes,
  },
  {
    path: "/task",
    element: TaskRoutes,
  },
];

CoreRoutes.forEach((route) => router.use(route.path, route.element));

export default router;
