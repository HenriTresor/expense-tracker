import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
} from "@/store/expenseSlice";
import { getExpenses } from "@/api/expenses";
import Colors from "@/constants/colors";
import ExpenseSummary from "@/components/ExpenseSummary";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
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
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
    return (
      <LoadingIndicator fullScreen message="Loading your financial data..." />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Hello, {user?.username.split("@")[0] || "User"}
        </Text>
        <Text style={styles.subheading}>Here's your financial summary</Text>
      </View>

      {error && <ErrorMessage message={error} />}

      {expenses.length === 0 ? (
        <EmptyState
          title="No expenses yet"
          description="Start tracking your expenses by adding your first expense."
          buttonTitle="Add Expense"
          onButtonPress={() => router.push("/add-expense")}
        />
      ) : (
        <>
          <ExpenseSummary expenses={expenses} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            {expenses.slice(0, 3).map((expense) => (
              <View key={expense.id} style={styles.activityItem}>
                <View style={styles.activityContent}>
                  <Text style={styles.activityName}>{expense.name}</Text>
                  <Text style={styles.activityAmount}>
                    $
                    {expense.amount ? parseFloat(expense.amount).toFixed(2) : 0}
                  </Text>
                </View>
                <Text style={styles.activityDescription} numberOfLines={1}>
                  {expense.description}
                </Text>
              </View>
            ))}

            {expenses.length > 3 && (
              <Text
                style={styles.viewAll}
                onPress={() => router.push("/expenses")}
              >
                View all expenses
              </Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
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
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
  },
  activityItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activityName: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  activityDescription: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  viewAll: {
    textAlign: "center",
    color: Colors.primary,
    fontWeight: "500",
    marginTop: 8,
    padding: 8,
  },
});
