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

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isAvatar, setAvatar] = useState(null);

  const onLoadAvatar = async () => {
    console.log("onLoadAvatar called");
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    console.log("Avatar image:", avatarImg);
    if (avatarImg.type === "cancel") return setAvatar(null);
    setAvatar(avatarImg);
  };

  const [posts, setPosts] = useState([
    {
      postImg:
        "file:///var/mobile/Containers/Data/Application/63E6D4A1-49BC-4A70-A8A3-27B27B56BC2F/Library/Caches/ExponentExperienceData/%2540direst2010%252Fgoit-react-native-hw-3/Camera/6180ADA2-BA3A-4096-ABB1-D5D02B5B5F74.jpg",
      postName: "Grubas",
      postAddress: "Koci dom",
      postLocation: { latitude: 52.234982, longitude: 21.00849 },
      commentCount: 0,
    },
    {
      postImg:
        "file:///var/mobile/Containers/Data/Application/63E6D4A1-49BC-4A70-A8A3-27B27B56BC2F/Library/Caches/ExponentExperienceData/%2540direst2010%252Fgoit-react-native-hw-3/Camera/CB8F1366-4CB7-4A55-A65F-4EB209B10E0D.jpg",
      postLocation: { latitude: 41.8892943, longitude: 12.4935467 },
      postAddress: "Rome",
      postName: "vs",
      commentCount: 0,
    },
    {
      postImg:
        "file:///var/mobile/Containers/Data/Application/63E6D4A1-49BC-4A70-A8A3-27B27B56BC2F/Library/Caches/ExponentExperienceData/%2540direst2010%252Fgoit-react-native-hw-3/Camera/E22C4887-15E9-4E3C-B925-550FC26B9620.jpg",
      postLocation: { latitude: 52.5187416, longitude: 13.4080224 },
      postAddress: "Berlin",
      postName: "hi",
    },
  ]);

  useEffect(() => {
    const listener = new Animated.Value(0);
    listener.addListener(() => {});
    return () => {
      listener.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (route.params?.newPost) {
      setPosts([...posts, route.params.newPost]);
    }
  }, [route.params?.newPost]);

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
                onPress={() => navigation.navigate("Login")}
                style={{ logOut, marginLeft: 190, marginTop: -24 }}
              >
                <LogOut />
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
            Oleksandr Lysenko
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
