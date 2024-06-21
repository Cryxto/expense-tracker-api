import { Router } from "express";
import { TodoController } from "./TodoController";

let TodoRoute = Router();

TodoRoute.use(
  "/todo",
  TodoRoute.get("/", TodoController.index),
  TodoRoute.get("/create", TodoController.create)
);

// TodoRoute.get("/todo", async (req, res) => {
//   res.status(200).json({ status: 200, message: res.message + "Hello todo" });
// });
export { TodoRoute };
