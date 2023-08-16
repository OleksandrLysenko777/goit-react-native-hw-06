import { useState } from "react";
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
import * as DocumentPicker from "expo-document-picker";

import {
  container,
  bgContainer,
  keyboardView,
  contentWrapper,
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
import {
  avatarWrapper,
  avatar,
  btnAddAvatar,
  btnAddAvatarLoad,
  btnAddAvatarSvg,
  btnAddAvatarSvgLoad,
} from "./RegistrationScreen.styled";
import backgroundImg from "../../../assets/img/background.jpg";
import CirclePlus from "../../../assets/svg/CirclePlus";
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
   const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isAvatar, setAvatar] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");

  const handleFocus = (currentFocusInput = '') => {
    setIsShowKeyboard(true);
     setCurrentFocused(currentFocusInput);
  };
  const clearUserForm = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };
  const onSubmitUserRegister = () => {
    if (!login || !email || !password)
      return console.warn("Будь-ласка, заповніть поля");

    console.log({ login, email, password, avatar });

    handleKeyboardHide();
    navigation.navigate('Home', { user: { login, email, password } });
    clearUserForm();
  };
  const onLoadAvatar = async () => {
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (avatarImg.type === "cancel") return setAvatar(null);
    setAvatar(avatarImg);
  };

  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={container}>
        <ImageBackground source={backgroundImg} style={bgContainer}>
          <View
            style={{ ...contentWrapper, minHeight: "61%", maxHeight: "80%" }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={keyboardView}
            >
              <View style={avatarWrapper}>
                <Image style={avatar} />
                <TouchableOpacity
                  style={isAvatar ? btnAddAvatarLoad : btnAddAvatar}
                  onPress={onLoadAvatar}
                >
                  <CirclePlus
                    style={isAvatar ? btnAddAvatarSvgLoad : btnAddAvatarSvg}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  ...title,
                  fontFamily: "Roboto_500Medium",
                  marginTop: 92,
                }}
              >
                Реєстрація
              </Text>
              <TextInput
                style={input}
                placeholder="Логін"
                autoComplete="username"
                autoCapitalize="none"
                value={login}
                onChangeText={setLogin}
                onFocus={() => handleFocus("login")}
              />
              <TextInput
                style={input}
                placeholder="Адреса електронної пошти"
                autoComplete="email"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                onFocus={() => handleFocus("email")}
              />
              <View
                style={{
                  ...passWrapper,
                  marginBottom: isShowKeyboard ? 323 : 43,
                }}
              >
                <TextInput
                  style={{ ...input, ...inputLast }}
                  secureTextEntry={!isShowPassword}
                  placeholder="Пароль"
                  autoComplete="password"
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => handleFocus("password")}
                />
                <TouchableOpacity
                  style={btnPassShow}
                  onPress={() => setIsShowPassword((p) => !p)}
                >
                  <Text style={btnPassShowText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {!isShowKeyboard && (
              <View>
                <TouchableOpacity style={btn} onPress={onSubmitUserRegister}>
                  <Text style={btnText}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={link} onPress={() => navigation.navigate('Login')}>
                  <Text style={linkText}>
                    Вже є акаунт?
                    <Text style={linkTextUnderline}>Увійти</Text>
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

export default RegistrationScreen;
