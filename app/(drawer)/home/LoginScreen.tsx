import { instance } from "@/apis/AxiosInstance";
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text, PaperProvider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LoginAPI } from "@/apis/Auth";

export default function LoginScreen() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();
  const params = useLocalSearchParams();

  const handleLogin = async () => {
    try {
      const res = await LoginAPI(email, password);
      await SecureStore.setItemAsync("token", res.access_token);
      router.replace({
        pathname: "/(drawer)/home/HomeScreen"
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const checkLogin = async () => {
      const { exception }= params;
      if (typeof exception === 'string' && parseInt(exception) === 401) {
        await SecureStore.deleteItemAsync('token');
        return;
      }
      const access_token = await SecureStore.getItemAsync("token");
      if (access_token) {
        router.replace({
          pathname: "/(drawer)/home/HomeScreen"
        });
      }
    };
    checkLogin();
  }, []);
  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.bg} behavior="padding">
        <View style={styles.container}>
          <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Đăng nhập</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            left={<TextInput.Icon icon="email" />}
            placeholder="Nhập email của bạn"
          />
          <TextInput
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            placeholder="Nhập mật khẩu"
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            contentStyle={{ paddingVertical: 8 }}
            labelStyle={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}
          >
            Đăng nhập
          </Button>
          <View style={styles.signupContainer}>
            <Text style={{ color: "#888" }}>Chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => router.push("/(drawer)/home/SignUpScreen")}>
              <Text style={styles.signupText}> Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#e0e7ef",
    justifyContent: "center"
  },
  container: {
    marginHorizontal: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    alignItems: "center"
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 18
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#22223b",
    textAlign: "center"
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#f4f6fb",
    borderRadius: 12,
    color: "#22223b"
  },
  button: {
    width: "100%",
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: "#22223b"
  },
  error: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
    width: "100%"
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 8
  },
  forgotText: {
    color: "#4f8cff",
    fontSize: 14
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 18,
    alignItems: "center"
  },
  signupText: {
    color: "#4f8cff",
    fontWeight: "bold",
    fontSize: 15
  }
});
