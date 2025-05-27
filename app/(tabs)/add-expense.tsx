import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenseSchema, ExpenseFormData } from "@/utils/validationSchema";
import { createExpense } from "@/api/expenses";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { addExpense } from "@/store/expenseSlice";
import Colors from "@/constants/colors";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";

export default function AddExpenseScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      amount: "",
      description: "",
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const newExpense = await createExpense(data);
      dispatch(addExpense(newExpense));

      reset();
      Alert.alert("Success", "Expense added successfully", [
        { text: "OK", onPress: () => router.push("/expenses") },
      ]);
    } catch (err) {
      setError("Failed to add expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Expense Name"
                placeholder="Enter expense name"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Amount"
                placeholder="Enter amount"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                error={errors.amount?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Description"
                placeholder="Enter description"
                value={value}
                onChangeText={onChange}
                multiline
                error={errors.description?.message}
              />
            )}
          />

          <View style={styles.buttonContainer}>
            <Button
              title="Add Expense"
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              style={styles.button}
            />

            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="outline"
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    width: "100%",
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    width: "100%",
  },
});
