import { Router } from "express";
import { ExpenseController } from "./ExpenseController";

let ExpenseRoute = Router();

ExpenseRoute.use(
  "/expense",
  ExpenseRoute.get("/", ExpenseController.index),
  ExpenseRoute.get("/create", ExpenseController.create)
);

// ExpenseRoute.get("/Expense", async (req, res) => {
//   res.status(200).json({ status: 200, message: res.message + "Hello Expense" });
// });
export { ExpenseRoute };
