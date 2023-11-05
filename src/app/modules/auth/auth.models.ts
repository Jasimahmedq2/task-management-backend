import { Schema, model } from "mongoose";
import { UserRoleConstant } from "./auth.constant";
import { IUser } from "./auth.interfaces";

const UserModel = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    enum: UserRoleConstant,
    type: String,
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const User = model<IUser>("user", UserModel);
