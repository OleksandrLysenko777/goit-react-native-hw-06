import { addPost, setPosts } from "./postSlice";
import { firestore } from "../../firebaseConfig"; 

export const fetchPosts = (postData) => async (dispatch) => {
  try {
    const postsRef = firestore.collection("posts");
    await postsRef.add(postData);
    
    dispatch(addPost(postData));
  } catch (error) {
    console.error("Error creating posts:", error);
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
