import { config } from "dotenv";
import express from "express";
import { router } from "./router";
import { PreRequestMiddlewareRoute } from "./middleware/pre-request";
import { PostRequestMiddlewareRoute } from "./middleware/post-request";

config();

const port = process.env.APP_PORT || 5000;
export const app = express();

app.use(PreRequestMiddlewareRoute);
app.use(PostRequestMiddlewareRoute);
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`URL : http://localhost:${port}`);
});
