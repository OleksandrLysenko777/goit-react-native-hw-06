import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA3BYSCpbbXPQDwNY7RFopKD4OoTfjhCBo",
  authDomain: "react-native-goit-hw06.firebaseapp.com",
  projectId: "react-native-goit-hw06",
  storageBucket: "react-native-goit-hw06.appspot.com",
  messagingSenderId: "300385108323",
  appId: "1:300385108323:web:9305e44b3d6f920b821356",
  measurementId: "G-5WJK3GYP0J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, getReactNativePersistence(AsyncStorage));

export { auth };
export default app;