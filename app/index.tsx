import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/utils/validationSchema";
import { loginUser } from "@/api/auth";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import Colors from "@/constants/colors";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      dispatch(loginStart());

      const user = await loginUser(data.username, data.password);

      if (user) {
        dispatch(loginSuccess(user));
        router.replace("/(tabs)");
      } else {
        dispatch(loginFailure("Invalid username or password"));
        setError("Invalid username or password");
      }
    } catch (err) {
      dispatch(loginFailure("An error occurred. Please try again."));
      setError("An error occurred. Please try again.");
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : undefined}
    // >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.title}>ABCD Finance</Text>
              <Text style={styles.subtitle}>Track your expenses with ease</Text>
            </View>

            <View style={styles.formContainer}>
              {error && (
                <ErrorMessage
                  message={error}
                  onDismiss={() => setError(null)}
                />
              )}

              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    error={errors.username?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                    error={errors.password?.message}
                  />
                )}
              />

              <Button
                title="Login"
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  formContainer: {
    width: "100%",
  },
  button: {
    marginTop: 16,
  },
  hint: {
    marginTop: 24,
    textAlign: "center",
    color: Colors.mediumGray,
    fontSize: 14,
  },
});
