import { Request, Response } from "express";

const TodoController = {
  create: async (req: Request, res: Response): Promise<void> => {
    res.locals.message = "create todo controller";
    req.message = "create todo controller";
    console.log('create todo');
    res.status(200).send('Todo created');
  },
} as const;

export { TodoController };
