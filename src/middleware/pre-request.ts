import { RequestHandler, Router } from "express";
import { initiateData } from "../model/ExpenseModel.js";

const PreRequestMiddlewareRoute = Router();

const RequestHandlerStore: RequestHandler[] = [
  async function testPreMiddleware(req, res, next) {
    // req.message = "pre request middleware then ";
    // console.log('me test middleware pre req');
    next();
  },
  // async function intitTheData(req,res,next) {
  //   initiateData()
  //   next()
  // }
];

PreRequestMiddlewareRoute.use(...RequestHandlerStore);

export { PreRequestMiddlewareRoute };
