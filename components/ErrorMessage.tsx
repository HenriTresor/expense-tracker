import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "@/constants/colors";
import { AlertCircle, X } from "lucide-react-native";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <AlertCircle size={20} color="#fff" />
      </View>
      <Text style={styles.message}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <X size={20} color={Colors.mediumGray} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.error,
    borderRadius: 20,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  message: {
    color: Colors.error,
    fontSize: 14,
    flex: 1,
  },
  dismissButton: {
    padding: 4,
  },
});

export default ErrorMessage;
