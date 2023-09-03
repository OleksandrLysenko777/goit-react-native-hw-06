import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebaseConfig";
import { setPosts } from "../../redux/Post/postSlice";

import PostsItem from "../components/PostsItem/PostsItem";

const PostsScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [displayName, setDisplayName] = useState("Oleksandr Lysenko");
  const [displayMail, setDisplayMail] = useState("email@example.com");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setDisplayName(user.displayName || "Oleksandr Lysenko");
      setDisplayMail(user.email || "email@example.com");
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} />
        <View>
          <Text style={styles.avatarName}>{displayName}</Text>
          <Text style={styles.avatarEmail}>{displayMail}</Text>
        </View>
      </View>
      <FlatList
        style={styles.postsWrapper}
        data={posts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Comments", { postImg: item.postImg })
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
      <View style={styles.navTabs}></View>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,
    marginRight: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: "Roboto_700Bold",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  avatarEmail: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsWrapper: {
    position: "relative",
    maxWidth: 450,
    marginBottom: 8,
    marginLeft: 18,
  },
});
