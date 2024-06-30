import { Request, Response } from "express";
import { Expense, ExpenseInterface, ExpenseInterfaceRecord, expenseSchemaValidation } from "../../model/ExpenseModel.js";
import { nanoid } from "nanoid";

const expense = new Expense();
const ExpenseController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      let requestData: ExpenseInterfaceRecord = req.body;
      // console.log(requestData);
      
      requestData.id = nanoid()

      const validatedData = await expenseSchemaValidation(requestData)
      if (!validatedData.allPassed) {
        res.status(400).send({
          code: 400,
          message: validatedData.error
        })
      } else {
        await expense.addData(requestData)
        res.status(201).send({
          code:201,
          message: 'Added'
        })
      }

     
    } catch (error) {
      console.error(error+' ,model error : '+expense.getError());
      res.status(400).send({
        code:400,
        message: error+' ,model error = '+expense.getError()
      })
    }

  },
  index: async (req: Request, res: Response): Promise<void> => {
    try {
      const data  = await expense.getAllData()
      if (data) {
        res.status(200).send({
          code: 200,
          message: "data found for home",
          data: data
        })
      } else {
        res.status(404).send({
          code: 404,
          message: "data not found",
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: "internal server error",
      })
    }
  },
  show: async (req: Request, res: Response): Promise<void> => {
    // const expense = 
    try {
      const data  = await expense.getData(req.params.id)
      if (data) {
        res.status(200).send({
          code: 200,
          message: "data found by id",
          data: data
        })
      } else {
        res.status(404).send({
          code: 404,
          message: "data not found",
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: "internal server error",
      })
    }
  },
  showByDateRange: async (req: Request, res: Response): Promise<void> => {
    // const expense = 
    try {
      // console.log(req.query.from, req.query.to);
      
      const data  = await expense.getDataByDateRange(req.query.from as string, req.query.to as string)
      if (data && data.sum>0) {
        res.status(200).send({
          code: 200,
          message: "data found by range",
          data: {
            sum: data.sum.toLocaleString('id-ID',{
              style: 'currency',
              currency: 'IDR',
            }),
            "data in range":data["data in range"]
          }
        })
      } else {
        res.status(404).send({
          code: 404,
          message: "data not found",
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: "internal server error",
      })
    }
  },
  showByCategory: async (req: Request, res: Response): Promise<void> => {
    // const expense = 
    
    try {
      // console.log(req.query.from, req.query.to);
      
      const data  = await expense.getDataByCategory(req.params.category)
      if (data && data.sum>0) {
        // console.log('das\n',data);
        
        res.status(200).send({
          code: 200,
          message: "data found by category",
          data: {
            sum: data.sum.toLocaleString('id-ID',{
              style: 'currency',
              currency: 'IDR',
            }),
            "data in range":data["data in range"]
          }
        })
      } else {
        res.status(404).send({
          code: 404,
          message: "data not found",
        })
      }
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: "internal server error",
      })
    }
  },
} as const;

export { ExpenseController };
