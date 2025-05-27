import apiClient from "./client";

export interface Expense {
  id: string;
  name: string;
  amount: string;
  description: string;
  createdAt: string;
}

export interface CreateExpensePayload {
  name: string;
  amount: string;
  description: string;
}

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await apiClient.get("/expenses");
    return response.data;
  } catch (error) {
    console.error("Get expenses error:", error);
    throw error;
  }
};

export const getExpense = async (id: string): Promise<Expense> => {
  try {
    const response = await apiClient.get(`/expenses/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Get expense ${id} error:`, error);
    throw error;
  }
};

export const createExpense = async (
  expense: CreateExpensePayload
): Promise<Expense> => {
  try {
    const response = await apiClient.post("/expenses", expense);
    return response.data;
  } catch (error) {
    console.error("Create expense error:", error);
    throw error;
  }
};

export const deleteExpense = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/expenses/${id}`);
  } catch (error) {
    console.error(`Delete expense ${id} error:`, error);
    throw error;
  }
};
