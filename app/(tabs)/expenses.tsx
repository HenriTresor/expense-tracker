import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  removeExpense,
} from "@/store/expenseSlice";
import { getExpenses, deleteExpense } from "@/api/expenses";
import Colors from "@/constants/colors";
import ExpenseCard from "@/components/ExpenseCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";

export default function ExpensesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { expenses, isLoading, error } = useAppSelector(
    (state) => state.expenses
  );
  const [refreshing, setRefreshing] = useState(false);

  const loadExpenses = async () => {
    try {
      dispatch(fetchExpensesStart());
      const data = await getExpenses();
      dispatch(fetchExpensesSuccess(data));
    } catch (err) {
      dispatch(fetchExpensesFailure("Failed to load expenses"));
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  const handleExpensePress = (id: string) => {
    router.push(`/expense-details/${id}`);
  };

  const handleDeleteExpense = (id: string) => {
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
            } catch (err) {
              Alert.alert("Error", "Failed to delete expense");
            }
          },
        },
      ]
    );
  };

  if (isLoading && !refreshing && expenses.length === 0) {
    return <LoadingIndicator fullScreen message="Loading expenses..." />;
  }

  return (
    <View style={styles.container}>
      {error && <ErrorMessage message={error} />}

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onPress={() => handleExpensePress(item.id)}
            onDelete={() => handleDeleteExpense(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="No expenses found"
            description="Start tracking your expenses by adding your first expense."
            buttonTitle="Add Expense"
            onButtonPress={() => router.push("/add-expense")}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
});
