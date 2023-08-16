import React, { useState, useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
  Keyboard,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
import { Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "../../assets/svg/ArrowLeft";

const CommentItem = ({ comment, date, isAuthor }) => {
  return (
    <View
      style={[
        styles.commentItem,
        isAuthor ? styles.commentItemRight : styles.commentItemLeft,
      ]}
    >
      <View
        style={[
          isAuthor ? styles.otherAvatar : styles.authorAvatar,
          comment ? styles.avatarCenter : null,
        ]}
      ></View>
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>{comment}</Text>
        <Text style={styles.commentDate}>{date}</Text>
      </View>
    </View>
  );
};

const CommentsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { postImg } = route.params;
  const isFocused = useIsFocused();
  const [commentText, setCommentText] = useState("");
  const [commentedPosts, setCommentedPosts] = useState([]);
  const [comments, setComments] = useState([
    {
      authorAvatar: "",
      comment: "Comment 1sknnn",
      date: "09 червня, 2020 | 08:40",
      isAuthor: false,
    },
    {
      otherAvatar: "",
      comment: "Comment 2sknnn",
      date: "09 червня, 2020 | 08:40",
      isAuthor: true,
    },
    {
      authorAvatar: "",
      comment: "Comment 3sknnn",
      date: "09 червня, 2020 | 08:40",
      isAuthor: true,
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        title: "Коментарі",
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
        tabBarStyle: { display: "none" },
        headerShown: true,
      });
      const loadComments = async () => {
        try {
          const storedComments = await AsyncStorage.getItem(
            `comments_${postImg}`
          );
          if (storedComments) {
            setComments(JSON.parse(storedComments));
          }
        } catch (error) {
          console.error("Error loading comments:", error);
        }
      };

      loadComments();
    }
  }, [isFocused]);

  useEffect(() => {
    const listener = new Animated.Value(0);
    listener.addListener(() => {});
    return () => {
      listener.removeAllListeners();
    };
  }, []);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      console.warn("Будь-ласка, напишіть коментар");
      return;
    }

    const newComment = {
      postId: postImg,
      authorAvatar: "",
      comment: commentText,
      date: format(new Date(), "dd MMMM, yyyy | HH:mm"),
    };

    const updatedComments = [...comments, newComment];

    try {
      await AsyncStorage.setItem(
        `comments_${postImg}`,
        JSON.stringify(updatedComments)
      );
      setComments(updatedComments);
      setCommentText("");
    } catch (error) {
      console.error("Error saving comments:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
        >
          <Image style={styles.postImg} source={{ uri: postImg }} />
          {comments.map((item, idx) => (
            <CommentItem
              key={idx.toString()}
              comment={item.comment}
              date={item.date}
              isAuthor={item.isAuthor}
            />
          ))}
        </ScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={[styles.commentInput, { paddingRight: commentText ? 55 : 20 }]}
          placeholder="Коментувати..."
          placeholderTextColor="#bdbdbd"
          autoCompleteType="off"
          value={commentText}
          onChangeText={setCommentText}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.commentBtn} onPress={handleAddComment}>
          <ArrowLeft style={styles.svgArrow} stroke="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 0,
    backgroundColor: "#fff",
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  postImg: {
    marginTop: 10,
    height: 240,
    width: "100%",
    marginBottom: 28,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  commentList: {
    maxHeight: 312,
    marginBottom: 28,
  },
  commentItemRight: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 25,
    borderColor: "#e8e8e8",
    borderRadius: 100,
    padding: 10,
  },
  commentItemLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    marginRight: 25,
    borderColor: "#e8e8e8",
    borderRadius: 100,
    padding: 10,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#F6F6F6",
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#ff600c",
    marginLeft: 5,
  },
  otherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#bdbdbd",
    marginRight: 5,
  },
  avatarCenter: {
    alignSelf: "center",
  },

  commentText: {
    fontSize: 16,
    color: "#212121",
    marginBottom: 8,
    marginLeft: 8,
    flexWrap: "wrap",
  },
  commentDate: {
    fontSize: 12,
    color: "#757575",
    marginLeft: 8,
    marginRight: 8,
  },
  commentInput: {
    flex: 1,
    height: 60,
    padding: 20,

    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 100,
  },

  commentBtnText: {
    color: "#fff",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  commentBtn: {
    position: "absolute",
    right: 20,
    top: 12,

    paddingHorizontal: 6,
    paddingVertical: 6,

    backgroundColor: "#ff600c",

    borderRadius: 100,
  },
  commentInputContainer: {
    marginBottom: 95,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  svgArrow: {
    height: 10,
    width: 10,

    transform: [{ rotate: "90deg" }],
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
    flexDirection: "column",
  },
});

export default CommentsScreen;
