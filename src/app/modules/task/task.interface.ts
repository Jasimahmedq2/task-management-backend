import { Types } from "mongoose";

export type ITask = {
  title: string;
  description: string;
  dueDate: Date;
  completed: "pending" | "progress" | "completed";
  user: Types.ObjectId;
};
