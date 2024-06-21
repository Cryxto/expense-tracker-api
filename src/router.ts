import { Router } from "express";
import { TodoRoute } from "./controller/Todo/TodoRoute";

let router = Router();

router.get("/", async (req, res) => {
  return res.status(200).json({ status: 200, message: res.message+"Hello dad" });
});

router.get("/hello", async (req, res) => {
  console.log('me on request');

  return res.status(200).json({ status: 200, message: "HelloHello" });
});

router.use(TodoRoute)

// const api = router;

export { router };
