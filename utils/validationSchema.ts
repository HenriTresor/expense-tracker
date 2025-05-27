import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const expenseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Amount must be a positive number" }
  ),
  description: z.string().min(1, "Description is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ExpenseFormData = z.infer<typeof expenseSchema>;
