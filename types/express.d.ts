import { Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      message?: string;
    }

    interface Response {
      message?: string;
    }
  }
}
