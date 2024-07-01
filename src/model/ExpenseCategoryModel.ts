import { readFile, writeFile } from "fs/promises";
const expenseCategoryJSON = "./src/data/expense-category.json";

export enum typeCashFlow {
  income = "income",
  expense = "expense",
}

export interface ExpenseCategoryInterface {
  [key: string]: {
    name: string;
    type: typeCashFlow;
    key: string;
  };
}
export interface ExpenseCategoryOutInterface {
  key: string;
  name: string;
  type: typeCashFlow;
}

export const initialCategory: ExpenseCategoryInterface = {
  salary: { name: "salary", type: typeCashFlow.income, key: "salary" },
  food: { name: "food", type: typeCashFlow.expense, key: "food" },
  transport: { name: "transport", type: typeCashFlow.expense, key: "transport" },
};

export async function InitExpenseCategory(): Promise<void> {
  try {
    const jsonData = await readFile(expenseCategoryJSON, "utf-8");
    // console.log(jsonData);

    if (!jsonData) {
      await writeFile(expenseCategoryJSON, JSON.stringify(initialCategory));
    }
  } catch (error) {
    console.log("error wak");

    console.error(error);
  } finally {
    await writeFile(expenseCategoryJSON, JSON.stringify(initialCategory));
  }
}

export class ExpenseCategory {
  private data: ExpenseCategoryInterface = {};
  private error: any;
  // constructor() {
  //   // this.initData()
  //   this.refreshData();
  // }

  async refreshData(): Promise<void> {
    try {
      const jsonData = await readFile(expenseCategoryJSON, "utf-8");
      this.data = JSON.parse(jsonData);
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  }
  async initIfThisDataNotExist(): Promise<void > {
    try {
      if (Object.keys(this.data).length === 0) {
        const jsonData = await readFile(expenseCategoryJSON, "utf-8");
        this.data = JSON.parse(jsonData);
      }
    } catch (error) {
      this.error = error;
      console.error(error);
    }
  }

  async writeData(): Promise<void> {
    try {
      await writeFile(expenseCategoryJSON, JSON.stringify(this.data));
      await this.refreshData();
    } catch (error) {
      console.error(error);
      this.error = error;
    }
  }

  async initData() {
    try {
      const jsonData = await readFile(expenseCategoryJSON, "utf-8");
      if (!jsonData) {
        await writeFile(expenseCategoryJSON, JSON.stringify(initialCategory));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async addData(category: ExpenseCategoryInterface): Promise<boolean> {
    await this.refreshData();
    try {
      const key = Object.keys(category)[0];
      this.data[key] = category[key];
      await this.writeData();
      return true;
    } catch (error) {
      this.error = error;
      console.error(error);
      return false;
    }
  }

  async updateData(oldCategory: string, newCategory: ExpenseCategoryInterface): Promise<boolean> {
    await this.refreshData();
    try {
      const newKey = Object.keys(newCategory)[0];
      this.data[newKey] = newCategory[newKey];
      delete this.data[oldCategory];
      await this.writeData();
      return true;
    } catch (error) {
      this.error = error;
      console.error(error);
      return false;
    }
  }

  async deleteData(category: string): Promise<boolean> {
    await this.refreshData();
    try {
      delete this.data[category];
      await this.writeData();
      return true;
    } catch (error) {
      this.error = error;
      console.error(error);
      return false;
    }
  }

  async getData(category: string): Promise<{found:boolean,data:ExpenseCategoryOutInterface}> {
    // await this.refreshData();
    await this.initIfThisDataNotExist()
    if (this.data[category]) {
      return { found:true ,data:this.data[category] };
    }
    return { found:false ,data:this.data[category] };
  }

  async getDataAbsolutely(category: string): Promise<ExpenseCategoryOutInterface> {
    await this.initIfThisDataNotExist()
    await this.refreshData();
    return { ...this.data[category] };
  }

  async getAllData(): Promise<ExpenseCategoryInterface> {
    await this.initIfThisDataNotExist()
    // await this.refreshData();
    return this.data;
  }
}
