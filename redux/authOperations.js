
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { setUser, clearUser } from "./authReducer";
import {auth} from "../firebaseConfig";

const auth = getAuth(auth);

export const signUpUser = ({ email, password, displayName, photo }) => async (dispatch) => {
  try {
    console.log("Начало регистрации пользователя...");
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;

    await user.updateProfile({
      displayName,
      photoURL: photo,
    });
  console.log("Регистрация успешно завершена.");
    dispatch(setUser(user));
  } catch (error) {
   console.error("Ошибка регистрации:", error);
  }
};

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    dispatch(setUser(user));
  } catch (error) {
    console.error("Sign In Error:", error);
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(clearUser());
  } catch (error) {
    console.error("Sign Out Error:", error);
  }
};
