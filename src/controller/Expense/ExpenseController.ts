import { Request, Response } from "express";
import { Expense, ExpenseDetailedInterface, ExpenseRecordInterface, expenseSchemaValidation, expenseSchemaValidationNullable } from "../../model/ExpenseModel.js";
import { nanoid } from "nanoid";

const expense = new Expense();
const ExpenseController = {
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      let requestData: ExpenseRecordInterface = req.body;
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
  delete: async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!(await expense.getData(req.params.id!)).found) {
        return res.status(404).send({
          code:404,
          message: "id not found"
        })
      }
      const afterDeleted = await expense.deleteData(req.params.id!)
      if (afterDeleted) {
        return res.status(201).send({
          code:200,
          message: 'Deleted'
        })
      }
      return res.status(500).send({
        code:500,
        message: 'Unexpected behaviour'
      })
    } catch (error) {
      console.error(error+' ,model error : '+expense.getError());
      return res.status(400).send({
        code:400,
        message: error+' ,model error = '+expense.getError()
      })
    }

  },
  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      let requestData: ExpenseRecordInterface = req.body;
      // console.log(requestData);
      
      // requestData.id = nanoid()
      

      const validatedData = await expenseSchemaValidationNullable(requestData)
      
      if (!(await expense.getData(requestData.id!)).found) {
        return res.status(404).send({
          code:404,
          message: "id not found"
        })
      }
      if (!validatedData.allPassed) {
        return res.status(400).send({
          code: 400,
          message: validatedData.error
        })
      } else {
        const updateState = await expense.updateData(requestData)
        if (!updateState) {
          return res.status(404).send({
            code:404,
            message: expense.getError()
          })
        }
        return res.status(201).send({
          code:201,
          message: 'Updated'
        })
      }

     
    } catch (error) {
      console.error(error+' ,model error : '+expense.getError());
      return res.status(400).send({
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
      if (data.found) {
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
            "data_in_range":data["data_in_range"]
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
      if (data && data.sum!==0) {
        // console.log('das\n',data);
        res.status(200).send({
          code: 200,
          message: "data found by category",
          data: {
            sum: data.sum.toLocaleString('id-ID',{
              style: 'currency',
              currency: 'IDR',
            }),
            "data_in_range":data["data_in_range"]
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
