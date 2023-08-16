import React, { useState } from "react";

import LocationSvg from "../../../assets/svg/LocationSvg";
import Comment from "../../../assets/svg/Comment";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const PostsItem = ({
  postImg,
  postName,
  postAddress,
  postLocation,
  commentCount,
}) => {
  const navigation = useNavigation();
  const [likeCount, setLikeCount] = useState(0);
  const handleToggleLike = () => {
    setLikeCount((likeCount) => (likeCount ? 0 : 1));
  };
  const goToComments = () => {
    navigation.navigate("Comments", { postImg: postImg });
  };

  const goToMap = () => {
    navigation.navigate("Map", { location: postLocation });
  };

  return (
    <View style={styles.postItem}>
      <Image style={styles.postImg} source={{ uri: postImg }} />
      <Text style={styles.postTitle}>{postName}</Text>
      <View style={{ ...styles.postsAdditionWrapper, ...styles.directionRow }}>
        <TouchableOpacity
          style={{ ...styles.comment, ...styles.directionRow }}
          onPress={goToComments}
        >
          <Comment />
          <Text style={styles.commentText}>{commentCount || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleLike} style={styles.iconWrapper}>
          <Icon
            name="thumbs-up"
            size={20}
            color={likeCount ? "orange" : "gray"}
            style={styles.icon}
          />
          <Text style={styles.likeCount}>{likeCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.location, ...styles.directionRow }}
          onPress={goToMap}
        >
          <LocationSvg width={22} height={22} fill="white" />
          <Text style={styles.locationText}>{postAddress}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostsItem;

const styles = StyleSheet.create({
  postItem: {
    marginBottom: 32,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -150,
  },
  icon: {
    marginRight: 4,
  },
  likeCount: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    color: "#BDBDBD",
  },
  postImg: {
    height: 240,
    maxWidth: 343,
    marginBottom: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  location: {
    alignItems: "center",
    marginBottom: 8,
    marginRight: 20,
  },
  postTitle: {
    fontFamily: "Roboto_500Medium",
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 8,
    color: "#212121",
  },
  directionRow: {
    flexDirection: "row",
    alignItems: "start",
  },
  postsAdditionWrapper: {
    justifyContent: "space-between",
  },
  commentText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    marginLeft: 6,
    color: "#bdbdbd",
  },
  locationText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    textDecorationLine: "underline",
    marginLeft: 4,
    color: "#212121",
  },
});
