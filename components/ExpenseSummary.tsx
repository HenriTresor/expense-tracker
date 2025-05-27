import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Expense } from "@/api/expenses";
import Colors from "@/constants/colors";
import { formatCurrency } from "@/utils/currencyUtil";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const { total, average } = useMemo(() => {
    if (!expenses.length) {
      return { total: 0, average: 0 };
    }

    const totalAmount = expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    return {
      total: totalAmount,
      average: totalAmount / expenses.length,
    };
  }, [expenses]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Total Expenses</Text>
        <Text style={styles.value}>{formatCurrency(total)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Average Expense</Text>
        <Text style={styles.value}>{formatCurrency(average)}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Number of Expenses</Text>
        <Text style={styles.value}>{expenses.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
    textAlign: "center",
  },
  value: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "center",
  },
});

export default ExpenseSummary;
