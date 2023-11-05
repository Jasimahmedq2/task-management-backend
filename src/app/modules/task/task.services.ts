import { Types } from "mongoose";
import { ITask } from "./task.interface";
import { Task } from "./task.model";
import ApiError from "../../../errors/apiError";

const createTask = async (
  userId: Types.ObjectId,
  payload: ITask
): Promise<ITask> => {
  payload.user = userId;
  const result = await Task.create(payload);
  return result;
};

const retrieveAllTask = async (
  userId: Types.ObjectId
): Promise<ITask[] | null> => {
  const result = await Task.find({ user: userId });
  return result;
};

const updateTask = async (
  taskId: string,
  payload: Partial<ITask>
): Promise<ITask | null> => {
  const findTask = await Task.findById(taskId);
  if (!findTask) {
    throw new ApiError(400, "task not found");
  }
  const result = await Task.findByIdAndUpdate(taskId, payload, {
    new: true,
  });
  return result;
};

const removeTask = async (taskId: string): Promise<ITask | null> => {
  const findTask = await Task.findById(taskId);
  if (!findTask) {
    throw new ApiError(400, "task not found");
  }
  const result = await Task.findByIdAndRemove(taskId);
  return result;
};

export const TaskServices = {
  createTask,
  removeTask,
  retrieveAllTask,
  updateTask,
};
