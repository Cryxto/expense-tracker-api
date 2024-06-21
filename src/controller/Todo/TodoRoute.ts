import { Router } from "express";
import { TodoController } from "./TodoController";

let TodoRoute = Router();

TodoRoute.use(
  "/todo",
  TodoRoute.get("/", async (req, res) => {
    return res.status(200).json({ status: 200, message: res.message + "Hello todo" });
  }),
  TodoRoute.get("/create", TodoController.create)
);

// TodoRoute.get("/todo", async (req, res) => {
//   res.status(200).json({ status: 200, message: res.message + "Hello todo" });
// });
export { TodoRoute };
