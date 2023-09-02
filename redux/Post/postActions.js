import { addPost, setPosts } from "./postSlice";
import { firestore } from "../../firebaseConfig"; 

export const fetchPosts = () => async (dispatch) => {
  try {
    const postsRef = firestore.collection("posts");
    const snapshot = await postsRef.get();
    const posts = [];

    snapshot.forEach((doc) => {
      posts.push(doc.data());
    });

    dispatch(setPosts(posts));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const postsRef = firestore.collection("posts");
    await postsRef.add(postData);
    dispatch(addPost(postData));
  } catch (error) {
    console.error("Error creating post:", error);
  }
};
