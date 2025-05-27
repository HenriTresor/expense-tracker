import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { getExpense, deleteExpense } from "@/api/expenses";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { removeExpense } from "@/store/expenseSlice";
import Colors from "@/constants/colors";
import Button from "@/components/Button";
import LoadingIndicator from "@/components/LoadingIndicator";
import { formatCurrency } from "@/utils/currencyUtil";
import { formatDateTime } from "@/utils/dateUtil";

export default function ExpenseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [expense, setExpense] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenseDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getExpense(id);
        setExpense(data);
      } catch (err) {
        setError("Failed to load expense details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchExpenseDetails();
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteExpense(id);
              dispatch(removeExpense(id));
              router.replace("/expenses");
            } catch (err) {
              Alert.alert("Error", "Failed to delete expense");
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingIndicator fullScreen message="Loading expense details..." />;
  }

  if (error || !expense) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || "Expense not found"}</Text>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          style={styles.errorButton}
        />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: !error ? "Expense Details" : "Something went wrong",
          headerBackTitle: "Back",

          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontWeight: "600",
            color: Colors.text,
          },
          headerTintColor: "white",
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.card}>
          <Text style={styles.title}>{expense.name}</Text>
          <Text style={styles.amount}>
            {formatCurrency(parseFloat(expense.amount))}
          </Text>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>{expense.description}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {formatDateTime(expense.createdAt)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>ID</Text>
            <Text style={styles.detailValue}>{expense.id}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Delete Expense"
            onPress={handleDelete}
            variant="danger"
            style={styles.deleteButton}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
  },
  buttonContainer: {
    marginTop: 8,
  },
  deleteButton: {
    width: "100%",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    marginBottom: 16,
    textAlign: "center",
  },
  errorButton: {
    minWidth: 120,
  },
});
