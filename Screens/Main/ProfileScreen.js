import * as DocumentPicker from "expo-document-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { ImageBackground } from "react-native";
import backgroundImg from "../../assets/img/background.jpg";
import { Animated } from "react-native";
import { TouchableOpacity, FlatList } from "react-native";
import CirclePlus from "../../assets/svg/CirclePlus";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { authSignOut } from "../../redux/authReducer"; 
import {
  container,
  bgContainer,
  contentWrapper,
  title,
} from "../Authorization/AuthPagesStyles";
import {
  avatarWrapper,
  avatar,
  btnAddAvatar,
  btnAddAvatarLoad,
  btnAddAvatarSvg,
  btnAddAvatarSvgLoad,
  logOut,
} from "../Authorization/RegistrationScreen/RegistrationScreen.styled";
import LogOut from "../../assets/svg/LogOut";
import PostsItem from "../components/PostsItem/PostsItem";
import { setPosts } from "../../redux/Post/postSlice";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isAvatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState("Oleksandr Lysenko");
  const dispatch = useDispatch();
   const posts = useSelector((state) => state.posts.posts);
 const user = useSelector((state) => {
  console.log(state); 
  return state.auth.user;
});

  useEffect(() => {
    console.log("Компонент ProfileScreen монтируется...");
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "Oleksandr Lysenko");
    }
  }, []);
  const onLoadAvatar = async () => {
    console.log("onLoadAvatar called");
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log("Avatar image:", avatarImg);

    if (avatarImg.type === "cancel") return setAvatar(null);

    setAvatar(avatarImg);

    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: user.displayName || "defaultDisplayName",
        });
        console.log("Профіль успушно оновлений!");
      } catch (error) {
        console.error("Помилка оновлення:", error);
      }
    }
  };

   const handleLogout = async () => {
  try {
    await dispatch(authSignOut());
    navigation.navigate("Login");
    console.log("Выход из системы выполнен успешно.");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

 

  useEffect(() => {
    const listener = new Animated.Value(0);
    listener.addListener(() => {});
    return () => {
      listener.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (route.params?.newPost) {
      if (!Array.isArray(posts)) {
        posts = [];
      }
      dispatch(setPosts([...posts, route.params.newPost]));

      navigation.setParams({ newPost: null });
    }
  }, [route.params?.newPost, posts]);

  console.log("posts:", posts);
  return (
    <View style={container}>
      <ImageBackground source={backgroundImg} style={bgContainer}>
        <View style={{ ...contentWrapper, minHeight: "80%", maxHeight: "80%" }}>
          <View style={avatarWrapper}>
            <Image style={avatar} />
            <TouchableOpacity
              style={isAvatar ? btnAddAvatarLoad : btnAddAvatar}
              onPress={onLoadAvatar}
            >
              <CirclePlus
                style={isAvatar ? btnAddAvatarSvgLoad : btnAddAvatarSvg}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                
                style={{ logOut, marginLeft: 190, marginTop: -24 }}
              >
                <LogOut onPress={handleLogout}/>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...title,
              fontFamily: "Roboto_500Medium",
              marginTop: 92,
            }}
          >
            {displayName}
          </Text>

          <FlatList
            style={styles.postsWrapper}
            data={posts}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Posts", { selectedPost: item })
                }
              >
                <PostsItem
                  postName={item.postName}
                  postImg={item.postImg}
                  postAddress={item.postAddress}
                  postLocation={item.postLocation}
                  navigation={navigation}
                  commentCount={item.commentCount}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  bgContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    resizeMode: "cover",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  contentWrapper: {
    paddingHorizontal: 16,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrapper: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  keyboardView: {
    flex: 1,
  },
  postsWrapper: {
    position: "relative",
    maxWidth: 450,
    marginBottom: 8,
    marginLeft: 18,
  },
});
