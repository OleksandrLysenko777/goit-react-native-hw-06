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

import PostsItem from "../components/PostsItem/PostsItem";

const PostsScreen = ({ route }) => {
  const navigation = useNavigation();
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
    if (route.params?.newPost) {
      setPosts([...posts, route.params.newPost]);
    }
  }, [route.params?.newPost]);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} />
        <View>
          <Text style={styles.avatarName}>Oleksandr Lysenko</Text>
          <Text style={styles.avatarEmail}>email@example.com</Text>
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
