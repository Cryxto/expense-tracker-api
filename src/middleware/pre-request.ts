import { RequestHandler, Router } from "express";

const PreRequestMiddlewareRoute = Router();

const RequestHandlerStore: RequestHandler[] = [
  async function testPreMiddleware(req, res, next) {
    req.message = "pre request middleware then ";
    console.log('me test middleware pre req');
    next();
  }
];

PreRequestMiddlewareRoute.use(...RequestHandlerStore);

export { PreRequestMiddlewareRoute };
