import { config } from "dotenv";
import express, { json } from "express";
import { router } from "./router.js";
import { PreRequestMiddlewareRoute } from "./middleware/pre-request.js";
import { PostRequestMiddlewareRoute } from "./middleware/post-request.js";
import { initiateData } from "./model/ExpenseModel.js";
import { ErrorRequestMiddlewareRoute } from "./middleware/error-request.js";

config();

const port = process.env.APP_PORT || 5000;
export const app = express();
app.use(json())
app.use(PreRequestMiddlewareRoute);
app.use(PostRequestMiddlewareRoute);
app.use("/api/v1", router);
app.use(ErrorRequestMiddlewareRoute)

app.listen(port, () => {
  initiateData()
  console.log(`Example app listening on port ${port}`);
  console.log(`URL : http://localhost:${port}`);
});
