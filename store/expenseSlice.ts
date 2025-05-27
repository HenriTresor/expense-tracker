import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Expense } from "@/api/expenses";

interface ExpenseState {
  expenses: Expense[];
  selectedExpense: Expense | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  selectedExpense: null,
  isLoading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    fetchExpensesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchExpensesSuccess: (state, action: PayloadAction<Expense[]>) => {
      state.isLoading = false;
      state.expenses = action.payload;
      state.error = null;
    },
    fetchExpensesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectExpense: (state, action: PayloadAction<Expense>) => {
      state.selectedExpense = action.payload;
    },
    clearSelectedExpense: (state) => {
      state.selectedExpense = null;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  selectExpense,
  clearSelectedExpense,
  addExpense,
  removeExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
