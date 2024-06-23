import { readFile, writeFile } from "fs/promises";
import { nanoid } from "nanoid";
const expenseJSON = "./src/data/expense.json";

enum typeCashFlow {
  income = "income",
  expense = "expense",
}

enum categoryNeeds {
  salary = "salary",
  food = "food",
  transport = "transport",
}

export interface ExpenseInterface {
  id?: string;
  title: string;
  nominal: number;
  type: typeCashFlow;
  category: categoryNeeds;
  date: Date;
}

const initialData: ExpenseInterface[] = [
  {
    id: nanoid(),
    title: "John Doe",
    nominal: 20000,
    type: typeCashFlow.income,
    category: categoryNeeds.food,
    date: new Date(),
  },
];

export async function initiateData() {
  try {
    const jsonData = await readFile(expenseJSON, "utf-8");
    // console.log(jsonData);

    if (!jsonData) {
      await writeFile(expenseJSON, JSON.stringify(initialData));
    }
  } catch (error) {
    console.log(error);
  }
}

export class Expense {
  private data: ExpenseInterface[] = [];
  private error : any
  constructor() {
    this.initData()
    this.getAllData()
  }

  public getError(){
    return this.error
  }
  public async initData(){
    try {
      const jsonData = await readFile(expenseJSON, "utf-8");
      if (!jsonData) {
        await writeFile(expenseJSON, JSON.stringify(initialData));
      }
    } catch (error) {
      console.error(error);
      this.error = error
    }
  }

  public async getAllData(): Promise<ExpenseInterface[]> {
    try {
      const jsonData = await readFile(expenseJSON, "utf-8");
      if (jsonData) {
        this.data = JSON.parse(jsonData);
      }
    } catch (error: any) {
      console.error(error);
      this.error = error
    }
    return this.data;
  }

  public async addData(record:ExpenseInterface) {
    try {
      // const data = this.data
      await this.getAllData().then(()=>this.data.push(record)).catch(e=>{this.error=e})
      // this.data = data
      await writeFile(expenseJSON, JSON.stringify(this.data))
      return true
    } catch (error) {
      this.error = error
      console.error(error);
      return false
    }
  }
}
