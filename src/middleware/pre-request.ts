import { RequestHandler, Router } from "express";

let PreRequestMiddlewareRoute = Router();

const RequestHandlerStore: RequestHandler[] = [
  async function testPreMiddleware(req, res, next) {
    res.message = "pre request middleware then ";
    req.message = "pre request middleware then";
    console.log('me test middleware pre req');
    
    next();
  }
]
PreRequestMiddlewareRoute.use(
  ...RequestHandlerStore
);

export { PreRequestMiddlewareRoute };
