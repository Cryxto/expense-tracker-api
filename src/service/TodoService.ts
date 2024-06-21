import { Router } from "express";

let TodoServiceRoute = Router();

TodoServiceRoute.use(
  "/todo",
  TodoServiceRoute.get("/", async (req, res) => {
    return res.status(200).json({ status: 200, message: res.message + "Hello todo" });
  }),
  TodoServiceRoute.get(
    "/cek",
    async (req, res, next) => {
      console.log("me todo");

      res.status(200).json({ status: 200, message: res.message + "Hello todo cek" });
      console.log("me after todo but not post request middleware");
      // next()
    }
  )
);

TodoServiceRoute.get("/todo", async (req, res) => {
  res.status(200).json({ status: 200, message: res.message + "Hello todo" });
});
export { TodoServiceRoute };
