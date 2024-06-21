import { RequestHandler, Router } from "express";

let PostRequestMiddlewareRoute = Router();

const RequestHandlerStore: RequestHandler[] = [
  async function testPostMiddleware(req, res, next) {
    console.info('me after middleware post request');
    next();
  }
];

// PostRequestMiddlewareRoute.use((req, res, next) => {
//   res.on('finish', () => {
//     for (const middleware of RequestHandlerStore) {
//       middleware(req, res, next);
//     }
//   });
//   next();
// });

PostRequestMiddlewareRoute.use(...RequestHandlerStore);

export { PostRequestMiddlewareRoute };
