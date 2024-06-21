import { Router } from "express";
import { ExpenseRoute } from "./controller/Expense/ExpenseRoute";

let router = Router();

// router.get("/", async (req, res) => {
//   return res.status(200).json({ status: 200, message: res.message+"Hello dad" });
// });

// router.get("/hello", async (req, res) => {
//   console.log('me on request');

//   return res.status(200).json({ status: 200, message: "HelloHello" });
// });

router.use(ExpenseRoute)

// const api = router;

export { router };
