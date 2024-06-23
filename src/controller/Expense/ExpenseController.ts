import { Request, Response } from "express";
import { Expense, ExpenseInterface } from "../../model/ExpenseModel.js";
import { nanoid } from "nanoid";

const ExpenseController = {
  create: async (req: Request, res: Response): Promise<void> => {
    const expense = new Expense();
    try {
      let requestData: ExpenseInterface = req.body;
      console.log(requestData);
      
      requestData.id = nanoid()
      await expense.addData(requestData)
      res.status(201).send({
        code:201,
        message: 'Added'
      })
    } catch (error) {
      console.error(error+' ,model error : '+expense.getError());
      res.status(400).send({
        code:400,
        message: error+' ,model error = '+expense.getError()
      })
    }

  },
  index: async (req: Request, res: Response): Promise<void> => {
    res.locals.message = "Expense controller";
    req.message = "Expense controller";
    console.log("Expense");
    res.status(200).send("Expenses");
  },
} as const;

export { ExpenseController };
