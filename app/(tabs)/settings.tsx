import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/authSlice";
import Colors from "@/constants/colors";
import Button from "@/components/Button";
import {
  LogOut,
  User,
  Bell,
  Shield,
  HelpCircle,
  Info,
} from "lucide-react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
          router.replace("/");
        },
      },
    ]);
  };

  const showFeatureAlert = (feature: string) => {
    Alert.alert(
      "Coming Soon",
      `The ${feature} feature will be available in a future update.`,
      [{ text: "OK" }]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileSection}>
        <View style={styles.profileImagePlaceholder}>
          <Text style={styles.profileInitial}>
            {user?.username.charAt(0).toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.username}>{user?.username || "User"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showFeatureAlert("Profile")}
        >
          <User size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showFeatureAlert("Notifications")}
        >
          <Bell size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showFeatureAlert("Privacy")}
        >
          <Shield size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Privacy & Security</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showFeatureAlert("Help")}
        >
          <HelpCircle size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showFeatureAlert("About")}
        >
          <Info size={20} color={Colors.primary} />
          <Text style={styles.menuItemText}>About</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        style={styles.logoutButton}
        textStyle={styles.logoutButtonText}
      />

      <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 16,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  profileInitial: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.darkGray,
    marginBottom: 16,
    paddingLeft: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  logoutButton: {
    marginTop: 16,
    borderColor: Colors.error,
  },
  logoutButtonText: {
    color: Colors.error,
  },
  versionText: {
    textAlign: "center",
    color: Colors.mediumGray,
    marginTop: 24,
    fontSize: 12,
  },
});
