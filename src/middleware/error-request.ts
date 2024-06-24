import { RequestHandler, Router } from "express";
import { initiateData } from "../model/ExpenseModel.js";

const ErrorRequestMiddlewareRoute = Router();

const RequestHandlerStore: RequestHandler[] = [
  async function testErrorMiddleware(req, res, next) {
    // req.message = "Error request middleware then ";
    res.status(404).send({
      message:'Not Found',
      code:404
    })
    // console.log('me test middleware Error req');
    // next();
  },
];
// ErrorRequestMiddlewareRoute.use((req, res, next) => {
//   res.on('error', () => {
//     for (const middleware of RequestHandlerStore) {
//       middleware(req, res, next);
//     }
//   });
//   // next();
// });
ErrorRequestMiddlewareRoute.use(...RequestHandlerStore);

export { ErrorRequestMiddlewareRoute };
