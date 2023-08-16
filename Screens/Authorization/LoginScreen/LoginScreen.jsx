import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {
  container,
  bgContainer,
  contentWrapper,
  keyboardView,
  title,
  input,
  inputLast,
  passWrapper,
  btnPassShow,
  btnPassShowText,
  btn,
  btnText,
  link,
  linkText,
  linkTextUnderline,
} from "../AuthPagesStyles";
import backgroundImg from "../../../assets/img/background.jpg";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const clearUserForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused("");
    Keyboard.dismiss();
  };
  const onSubmitUserRegister = () => {
    if (!email.trim() || !password.trim())
      return console.warn("Будь-ласка, заповніть поля");
    console.log({ email, password });

    handleKeyboardHide();
    navigation.navigate("Home", { user: { email, password } });
    clearUserForm();
  };
  const handleFocus = (currentFocusInput = "") => {
    setIsShowKeyboard(true);
    setCurrentFocused(currentFocusInput);
  };
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={container}>
        <ImageBackground source={backgroundImg} style={bgContainer}>
          <View
            style={[
              contentWrapper,
              { paddingBottom: isShowKeyboard ? 32 : 144 },
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={keyboardView}
            >
              <Text style={{ ...title, fontFamily: "Roboto_500Medium" }}>
                Увійти
              </Text>
              <TextInput
                style={{
                  ...input,
                  backgroundColor:
                    currentFocused === "email" ? "#ffffff" : "#f6f6f6",
                  borderColor:
                    currentFocused === "email" ? "#ff6c00" : "#e8e8e8",
                }}
                placeholder="Адреса електронної пошти"
                onFocus={handleFocus}
                placeholderTextColor="#bdbdbd"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <View
                style={{
                  ...passWrapper,
                  marginBottom: isShowKeyboard ? 323 : 43,
                }}
              >
                <TextInput
                  style={{
                    ...input,
                    ...inputLast,
                    backgroundColor:
                      currentFocused === "password" ? "#ffffff" : "#f6f6f6",
                    borderColor:
                      currentFocused === "password" ? "#ff6c00" : "#e8e8e8",
                  }}
                  secureTextEntry={!isShowPassword}
                  placeholderTextColor="#bdbdbd"
                  autoComplete="password"
                  autoCapitalize="none"
                  placeholder="Пароль"
                  onChangeText={setPassword}
                  onFocus={() => handleFocus("password")}
                />
                <TouchableOpacity
                  style={btnPassShow}
                  onPress={() =>
                    password !== "" && setIsShowPassword((p) => !p)
                  }
                >
                  <Text style={btnPassShowText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {!isShowKeyboard && (
              <View>
                <TouchableOpacity style={btn} onPress={onSubmitUserRegister}>
                  <Text style={btnText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={link}
                onPress={() => navigation.navigate("Registration")}
              
                >
                  <Text style={linkText}>
                    Немає акаунту?{" "}
                    <Text style={linkTextUnderline}>Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
