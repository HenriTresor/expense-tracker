import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Expense } from "@/api/expenses";
import Colors from "@/constants/colors";
import { formatDate } from "@/utils/dateUtil";
import { formatCurrency } from "@/utils/currencyUtil";
import { Trash2 } from "lucide-react-native";

interface ExpenseCardProps {
  expense: Expense;
  onPress: () => void;
  onDelete: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  expense,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {expense.name}
          </Text>
          <Text style={styles.amount}>
            {formatCurrency(parseFloat(expense.amount))}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {expense.description}
        </Text>
        <Text style={styles.date}>{formatDate(expense.createdAt)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 size={20} color={Colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.primary,
  },
  description: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: Colors.mediumGray,
  },
  deleteButton: {
    padding: 8,
  },
});

export default ExpenseCard;
