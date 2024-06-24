import { Router } from "express";
import { ExpenseController } from "./ExpenseController.js";

let ExpenseRoute = Router();

ExpenseRoute.use(
  "/expense",
  ExpenseRoute.get("/", ExpenseController.index),
  ExpenseRoute.post("/create", ExpenseController.create),
  ExpenseRoute.get("/show", ExpenseController.showByDateRange),
  ExpenseRoute.get("/show/:id", ExpenseController.show)
);

// ExpenseRoute.get("/Expense", async (req, res) => {
//   res.status(200).json({ status: 200, message: res.message + "Hello Expense" });
// });
export { ExpenseRoute };
