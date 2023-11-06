"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ["pending", "progress", "completed"],
        default: "pending",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("task", TaskSchema);
