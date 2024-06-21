import { Request, Response } from "express";

const TodoController = {
  create: async (req: Request, res: Response): Promise<void> => {
    res.message = 'me res message'
    console.log(res.message);
    req.message += "create todo controller";
    console.log(req.message);
    res.status(200).send({code:200, message:req.message});
  },
  index: async (req: Request, res: Response): Promise<void> => {
    res.locals.message = "Todo controller";
    req.message = "Todo controller";
    console.log('Todo');
    res.status(200).send('Todos');
  },
} as const;

export { TodoController };
