import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto";
import LoginScreen from "./Screens/Authorization/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/Authorization/RegistrationScreen/RegistrationScreen";
import Home from "./Screens/Home/Home";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import CreatePostsScreen from "./Screens/Main/CreatePostsScreen";
import CommentsScreen from "./Screens/PostsScreen/CommentsScreen";
import MapScreen from "./Screens/PostsScreen/MapScreen";

const MainStack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (fontsLoaded) {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <MainStack.Screen name="Registration" component={RegistrationScreen} />
            <MainStack.Screen name="Login" component={LoginScreen} />
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="PostsScreen" component={PostsScreen} />
            <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} />
            <MainStack.Screen name="Comments" component={CommentsScreen} />
            <MainStack.Screen name="Map" component={MapScreen} />
          </MainStack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
