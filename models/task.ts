import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    id: String,
    text: String,
    completed: Boolean 
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;