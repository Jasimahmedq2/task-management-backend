import express from "express";
import { TaskControllers } from "./task.controller";
import auth from "../../middleware/auth";
import { UserRoles } from "../../../enums/user.role";
const router = express.Router();

router.post(
  "/create-task",
  auth(UserRoles.ADMIN, UserRoles.USER),
  TaskControllers.crateTask
);
router.get(
  "/get-tasks",
  auth(UserRoles.ADMIN, UserRoles.USER),
  TaskControllers.retrieveAllTask
);
router.patch(
  "/update-task/:taskId",
  auth(UserRoles.ADMIN, UserRoles.USER),
  TaskControllers.updateTask
);
router.delete(
  "/remove-task/:taskId",
  auth(UserRoles.ADMIN, UserRoles.USER),
  TaskControllers.removeTask
);

export const TaskRoutes = router;
