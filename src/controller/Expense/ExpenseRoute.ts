import { Router } from "express";
import { ExpenseController } from "./ExpenseController.js";

let ExpenseRoute = Router();

ExpenseRoute.get("/", ExpenseController.index);
ExpenseRoute.post("/create", ExpenseController.create);
ExpenseRoute.put("/update", ExpenseController.update);
ExpenseRoute.get("/show/category/:category", ExpenseController.showByCategory);
ExpenseRoute.get("/show/category/", ExpenseController.showByCategory);
ExpenseRoute.get("/show/range", ExpenseController.showByDateRange);
ExpenseRoute.get("/show/:id", ExpenseController.show);
ExpenseRoute.delete("/delete/:id", ExpenseController.delete);

// ExpenseRoute.get("/Expense", async (req, res) => {
//   res.status(200).json({ status: 200, message: res.message + "Hello Expense" });
// });
export { ExpenseRoute };
