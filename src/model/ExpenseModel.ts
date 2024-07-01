import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
import { ExpenseCategory, ExpenseCategoryOutInterface, initialCategory, typeCashFlow } from "./ExpenseCategoryModel.js";
const expenseJSON = "./src/data/expense.json";

// enum theExpenseCategory {
//   salary = "salary",
//   food = "food",
//   transport = "transport",
// }

const theExpenseCategory = new ExpenseCategory();

export interface ExpenseDetailedInterface {
  id?: string;
  title: string;
  nominal: number;
  type: typeCashFlow;
  category: ExpenseCategoryOutInterface;
  date: Date | string;
}

export interface ExpenseRecordInterface {
  id?: string;
  title: string;
  nominal: number;
  type: typeCashFlow;
  category: string;
  date: Date | string;
}
export interface ExpenseRecordInterfaceNullable {
  id?: string;
  title?: string;
  nominal?: number;
  type?: typeCashFlow;
  category?: string;
  date?: Date | string;
}

export async function RecordToExpense(record: ExpenseRecordInterface): Promise<ExpenseDetailedInterface> {
  return {
    id: record.id,
    title: record.title,
    nominal: record.nominal,
    type: record.type,
    category: (await theExpenseCategory.getData(record.category)).data,
    date: record.date,
  };
}
export async function ExpenseToRecord(record: ExpenseDetailedInterface): Promise<ExpenseRecordInterface> {
  return {
    id: record.id,
    title: record.title,
    nominal: record.nominal,
    type: record.type,
    category: record.category.key,
    date: record.date,
  };
}

const initialData: ExpenseRecordInterface[] = [
  {
    id: nanoid(),
    title: "Monthly Salary",
    nominal: 10000000, // 10,000,000 IDR
    type: initialCategory["salary"].type,
    category: initialCategory["salary"].key,
    date: new Date("2024-01-01").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Groceries",
    nominal: 500000, // 500,000 IDR
    type: initialCategory["food"].type,
    category: initialCategory["food"].key,
    date: new Date("2024-02-15").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Bus Ticket",
    nominal: 3000, // 3,000 IDR
    type: initialCategory["transport"].type,
    category: initialCategory["transport"].key,
    date: new Date("2024-03-10").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Consulting Fee",
    nominal: 2000000, // 2,000,000 IDR
    type: initialCategory["salary"].type,
    category: initialCategory["salary"].key,
    date: new Date("2024-04-20").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Dining Out",
    nominal: 150000, // 150,000 IDR
    type: initialCategory["food"].type,
    category: initialCategory["food"].key,
    date: new Date("2024-05-05").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Taxi Ride",
    nominal: 50000, // 50,000 IDR
    type: initialCategory["transport"].type,
    category: initialCategory["transport"].key,
    date: new Date("2024-06-15").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Project Bonus",
    nominal: 5000000, // 5,000,000 IDR
    type: initialCategory["salary"].type,
    category: initialCategory["salary"].key,
    date: new Date("2024-07-20").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Weekly Groceries",
    nominal: 600000, // 600,000 IDR
    type: initialCategory["food"].type,
    category: initialCategory["food"].key,
    date: new Date("2024-08-25").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Train Ticket",
    nominal: 20000, // 20,000 IDR
    type: initialCategory["transport"].type,
    category: initialCategory["transport"].key,
    date: new Date("2024-09-30").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Freelance Work",
    nominal: 3000000, // 3,000,000 IDR
    type: initialCategory["salary"].type,
    category: initialCategory["salary"].key,
    date: new Date("2024-10-10").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Dinner at Restaurant",
    nominal: 200000, // 200,000 IDR
    type: initialCategory["food"].type,
    category: initialCategory["food"].key,
    date: new Date("2024-11-20").toLocaleDateString(),
  },
  {
    id: nanoid(),
    title: "Car Maintenance",
    nominal: 800000, // 800,000 IDR
    type: initialCategory["transport"].type,
    category: initialCategory["transport"].key,
    date: new Date("2024-12-25").toLocaleDateString(),
  },
];

const schemaExample = {
  id: nanoid(),
  title: "John Doe",
  nominal: 20000,
  type: typeCashFlow.income,
  category: { ...initialCategory["food"] },
  date: new Date(),
};

export async function initiateData() {
  try {
    const jsonData = await readFile(expenseJSON, "utf-8");
    // console.log(Object.keys(initialCategory['transport']));

    if (!jsonData) {
      await writeFile(expenseJSON, JSON.stringify(initialData));
    }
  } catch (error) {
    console.log(error);
  }
}

export async function expenseSchemaValidation(record: ExpenseRecordInterface) {
  let message = { allPassed: true, error: {} };
  for (var key in record) {
    if (key !== "type" && key !== "category" && key !== "date") {
      if (
        typeof record[key as keyof ExpenseDetailedInterface] !==
        typeof schemaExample[key as keyof ExpenseDetailedInterface]
      ) {
        message.allPassed = false;
        message.error = { ...message.error, [key]: "wrong type of schema key" };
      } else {
        if (typeof new Date(record.date) !== typeof schemaExample.date) {
          message.allPassed = false;
          message.error = { ...message.error, date: "wrong type of date type" };
        }
        const categoryCurrent = await theExpenseCategory.getData(record.category);
        if (!categoryCurrent.found) {
          // console.log(await theExpenseCategory.getData(record.category));

          message.allPassed = false;
          message.error = { ...message.error, category: "the category does not exist" };
        }
        if (record.type !== categoryCurrent.data.type) {
          message.allPassed = false;
          message.error = { ...message.error, type: "wrong type of cashflow type" };
        }
      }
    }
  }

  return message;
}

export async function expenseSchemaValidationNullable(record: ExpenseRecordInterfaceNullable) {
  let message = { allPassed: true, error: {} as Record<string, string> };

  for (const key in record) {
    if (record.hasOwnProperty(key)) {
      const value = record[key as keyof ExpenseRecordInterfaceNullable];

      if (key !== "type" && key !== "category" && key !== "date") {
        if (value !== undefined && typeof value !== typeof schemaExample[key as keyof ExpenseDetailedInterface]) {
          message.allPassed = false;
          message.error[key] = "wrong type of schema key";
        }
      } else if (key === "date" && value !== undefined && typeof new Date(value).getTime() !== "number") {
        message.allPassed = false;
        message.error.date = "wrong type of date type";
      }
    }
  }

  if (record.category !== undefined) {
    const categoryCurrent = await theExpenseCategory.getData(record.category);
    if (!categoryCurrent.found) {
      message.allPassed = false;
      message.error.category = "the category does not exist";
    }
    if (record.type !== undefined && record.type !== categoryCurrent.data.type) {
      message.allPassed = false;
      message.error.type = "wrong type of cashflow type";
    }
  }

  return message;
}

export class Expense {
  private data: ExpenseRecordInterface[] = [];
  private error: any;
  constructor() {
    // this.initData();
    // this.getAllData();
    this.refreshData();
  }

  public getError() {
    return this.error;
  }
  public async initData() {
    try {
      const jsonData = await readFile(expenseJSON, "utf-8");
      if (!jsonData) {
        await writeFile(expenseJSON, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  }
  async writeData(): Promise<void | boolean> {
    try {
      await writeFile(expenseJSON, JSON.stringify(this.data));
      await this.refreshData();
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  }
  public async refreshData(): Promise<void> {
    try {
      const jsonData = await readFile(expenseJSON, "utf-8");
      if (jsonData) {
        this.data = JSON.parse(jsonData);
      }
    } catch (error: any) {
      console.error(error);
      this.error = error;
    }
  }
  public async getAllData(): Promise<ExpenseRecordInterface[]> {
    return this.data;
  }
  public async getData(id: string): Promise<{ found: boolean; expenseData: ExpenseRecordInterfaceNullable }> {
    await this.refreshData();

    let theData: ExpenseRecordInterfaceNullable = {};
    try {
      const data = this.data.filter((e) => e.id === id);
      // console.log(this.data);
      
      if (data.length>0) {
        theData = { ...data[0] };
        return { found: true, expenseData: theData };
      }
      // return { found: false, expenseData: theData };
    } catch (error: any) {
      console.error(error);
      this.error = error;
    }
    return { found: false, expenseData: theData };
  }
  public async getDataByDateRange(
    from: string,
    to: string
  ): Promise<{ data_in_range: ExpenseRecordInterface[]; sum: number }> {
    await this.refreshData();
    let theData: ExpenseRecordInterface[] = [];
    let sum: number = 0;
    try {
      const dateFrom = new Date(from);
      const dateTo = new Date(to);
      // console.log("Date on model : ", dateFrom, dateTo);

      // const jsonData = await readFile(expenseJSON, "utf-8");
      // if (jsonData) {
      //   this.data = JSON.parse(jsonData);
      // }
      if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
        if (!isNaN(dateFrom.getTime())) {
          theData = this.data.filter((e) => {
            const dataDate = new Date(e.date);
            if (dataDate >= dateFrom) {
              if (e.type === typeCashFlow.income) {
                sum += e.nominal;
              } else {
                sum -= e.nominal;
              }
              return e;
            }
          });
        } else if (!isNaN(dateTo.getTime())) {
          theData = this.data.filter((e) => {
            const dataDate = new Date(e.date);
            if (dataDate <= dateTo) {
              if (e.type === typeCashFlow.income) {
                sum += e.nominal;
              } else {
                sum -= e.nominal;
              }
              return e;
            }
          });
        } else {
          theData = await this.getAllData();
        }
      } else {
        theData = this.data.filter((e) => {
          const dataDate = new Date(e.date);
          if (dataDate <= dateTo && dataDate >= dateFrom) {
            if (e.type === typeCashFlow.income) {
              sum += e.nominal;
            } else {
              sum -= e.nominal;
            }
            return e;
          }
        });
      }
      // const data = this.data.filter((e) => {
      //   const dataDate = new Date(e.date);
      //   if (dataDate <= dateTo && dataDate >= dateFrom) {
      //     return e;
      //   }
      // });
      // theData = data;
    } catch (error: any) {
      console.error(error);
      this.error = error;
    }
    return { sum, data_in_range: theData };
  }

  public async getDataByCategory(category: string): Promise<{ data_in_range: ExpenseRecordInterface[]; sum: number }> {
    await this.refreshData();
    let theData: ExpenseRecordInterface[] = [];
    let sum: number = 0;
    try {
      // const jsonData = await readFile(expenseJSON, "utf-8");
      // if (jsonData) {
      //   this.data = JSON.parse(jsonData);
      // }
      const data = this.data.filter((e) => {
        if (e.category === category) {
          if (e.type === typeCashFlow.income) {
            sum += e.nominal;
          } else {
            sum -= e.nominal;
          }
          return e;
        }
      });
      theData = data;
    } catch (error: any) {
      console.error(error);
      this.error = error;
    }
    return { sum, data_in_range: theData };
  }

  /**
   * deleteData
   */
  public async deleteData(id: string) {
    try {
      await this.refreshData()
      const afterDelete = this.data.filter(e=>e.id!==id)
      this.data = afterDelete
      await this.writeData()
      return true
    } catch (error) {
      this.error = error
      console.error(error);
      return false
    }
  }

  public async addData(record: ExpenseRecordInterface) {
    try {
      theExpenseCategory.refreshData();
      // const transformed = await RecordToExpense(record)
      // this.data.push(transformed)
      this.data.push(record);

      this.writeData();
      return true;
    } catch (error) {
      this.error = error;
      console.error(error);
      return false;
    }
  }
  public async updateData(record: ExpenseRecordInterfaceNullable) {
    try {
      await theExpenseCategory.refreshData();
      // const transformed = await RecordToExpense(record)
      const recordKeys = Object.keys(record);

      if (!recordKeys.find((e) => e === "id") && recordKeys.length <= 1) {
        this.error = "data not found";
        return false;
      }
      const updatedData = this.data.map((e) => {
        const keys = Object.keys(e) as Array<keyof ExpenseRecordInterface>;
        if (e.id === record.id) {
          keys.forEach((key) => {
            if (key !== "id" && record[key as keyof ExpenseRecordInterface] !== undefined) {
              (e[key] as string | number | Date) = record[key] as string | number | Date;
            }
          });
        }
        return e;
      });
      // console.log(updatedData);

      this.data = updatedData;
      this.writeData();
      return true;
    } catch (error) {
      this.error = error;
      console.error(error);
      return false;
    }
  }

  
}
