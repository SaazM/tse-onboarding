import { RequestHandler } from "express";
import TaskModel from "src/models/task";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().sort("-dateCreated");
    res.status(200).json(tasks);
    // your code here
  } catch (error) {
    next(error);
  }
};
