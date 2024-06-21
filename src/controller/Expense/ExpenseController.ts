import { Request, Response } from "express";

const ExpenseController = {
  create: async (req: Request, res: Response): Promise<void> => {
    res.message = 'me res message'
    console.log(res.message);
    req.message += "create Expense controller";
    console.log(req.message);
    res.status(200).send({code:200, message:req.message});
  },
  index: async (req: Request, res: Response): Promise<void> => {
    res.locals.message = "Expense controller";
    req.message = "Expense controller";
    console.log('Expense');
    res.status(200).send('Expenses');
  },
} as const;

export { ExpenseController };
