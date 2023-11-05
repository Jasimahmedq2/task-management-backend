import { NextFunction, Request, Response } from "express";
import { TaskServices } from "./task.services";
import sendResponse from "../../../shared/sendResponse";
import { ObjectId } from "mongoose";

const retrieveAllTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = (req as any).user;
  try {
    const result = await TaskServices.retrieveAllTask(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully retrieve all tasks",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const crateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = (req as any).user;
  const { ...taskInfo } = req.body;
  try {
    const result = await TaskServices.createTask(userId, taskInfo);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully created a tasks",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params;
  const { ...taskInfo } = req.body;
  try {
    const result = await TaskServices.updateTask(taskId, taskInfo);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully updated a tasks",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const removeTask = async (req: Request, res: Response, next: NextFunction) => {
  const { taskId } = req.params;
  try {
    const result = await TaskServices.removeTask(taskId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "successfully removed a tasks",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const TaskControllers = {
  removeTask,
  crateTask,
  retrieveAllTask,
  updateTask,
};
