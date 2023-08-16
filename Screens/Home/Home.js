import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../Main/CreatePostsScreen";
import ProfileScreen from "../Main/ProfileScreen";
import ArrowLeft from "../../assets/svg/ArrowLeft";
import LogOut from "../../assets/svg/LogOut";
import CirclePlus from "../../assets/svg/CirclePlus";
import Grid from "../../assets/svg/Grid";
import User from "../../assets/svg/User";

const ButtomTabs = createBottomTabNavigator();
const Home = (posts) => {
  const route = useRoute();
  const { params } = route;
  const initialPosts = params?.userPosts || [];
  return (
    <ButtomTabs.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: "#ff6c00",
        tabBarInactiveTintColor: "#212121",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        },
      })}
    >
      <ButtomTabs.Screen
        name="Posts"
        component={PostsScreen}
        initialParams={{ initialPosts }} 
        options={({ navigation }) => ({
          ...postsOptions,
          headerRight: () => (
            <LogOut
              onPress={() => navigation.navigate("Login")}
              title="Return back"
              color="#fff"
              style={styles.logOut}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.btnTab} />
          ),
          tabBarIcon: ({ color }) => {
            return <Grid stroke={color} />;
          },
        })}
      />
      <ButtomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation, route }) => ({
          ...createPostsOptions,
          headerLeft: () => (
            <ArrowLeft
              onPress={() => {
                navigation.navigate("Posts");
              }}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                backgroundColor: "#ff6c00",
              }}
            />
          ),
          tabBarIcon: () => {
            return <CirclePlus style={(fill = "#ffffff")} />;
          },
        })}
      />
      <ButtomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ initialPosts }} 
        options={({ navigation, route }) => ({
          ...createPostsProfile,
          headerLeft: () => (
            <ArrowLeft
              onPress={() => navigation.navigate("Posts")}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                marginRight: 0,
              }}
            />
          ),
          tabBarIcon: (props) => {
            return <User fill={props.color} size={props.size} />;
          },
        })}
      />
    </ButtomTabs.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 60,
    marginRight: 16,
    paddingVertical: 10,
  },
  btnTab: {
    alignSelf: "center",
    marginRight: 30,
    width: 40,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
});

const createPostsOptions = {
  title: "Створити публікацію",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
};
const createPostsProfile = {
  title: "Профіль",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
};
const postsOptions = {
  title: "Публікації",
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
};
