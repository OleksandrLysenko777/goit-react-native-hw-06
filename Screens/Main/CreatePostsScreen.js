import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

import {
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import Trash from "../../assets/svg/Trash";
import LocationSvg from "../../assets/svg/LocationSvg";
import LoadPost from "../../assets/svg/LoadPost";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [postImg, setPostImg] = useState("");
  const [postName, setPostName] = useState("");
  const [postAddress, setPostAddress] = useState("");
  const [postLocation, setPostLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [currentFocused, setCurrentFocused] = useState("");

  useEffect(() => {
    setPostImg("");
    setPostLocation(null);

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  const addImageLocation = async () => {
    try {
      const locationResult = await Location.geocodeAsync(postAddress);
      if (locationResult.length > 0) {
        const location = locationResult[0];
        const coords = {
          latitude: location.latitude,
          longitude: location.longitude,
        };
        setPostLocation(coords);
      } else {
        console.log("No coordinates found for the given address");
      }
    } catch (error) {
      console.error("Error while getting location:", error);
    }
  };

  const clearForm = () => {
    setPostImg("");
    setPostName("");
    setPostLocation("");
    setPostAddress("");
  };

  const onSubmitPost = () => {
    console.log("onSubmitPost called");
    if (!postImg || !postName || !postLocation) {
      console.warn("Будь-ласка, завантажте фото та заповніть поля");
      return;
    }

    console.log("Submitting post:", { postImg, postName, postLocation });

    handleKeyboardHide();
    const newPost = {
      id: "Oleksandr",
      postImg: postImg,
      postName: postName.trim(),
      postAddress: postAddress.trim(),
      postLocation: postLocation,
      commentCount: 0,
    };
    navigation.navigate("Posts", { newPost });
    clearForm();
  };

  const onLoadPostImg = async () => {
    console.log("onLoadPostImg called");
    if (cameraRef) {
      try {
        const { uri } = await cameraRef.takePictureAsync();
        await MediaLibrary.createAssetAsync(uri);
        console.log("Image URI:", uri);
        setPostImg(uri);
      } catch (error) {
        console.log("Error > ", error.message);
      }
    }
    addImageLocation();
  };

  const handleFocus = (currentFocusInput = "") => {
    setIsShowKeyboard(true);
    setCurrentFocused(currentFocusInput);
  };
  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    setCurrentFocused("");
    Keyboard.dismiss();
  };
  const handleGoBack = () => {
    clearForm();
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text> No access to camera</Text>;
  }
  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View
        style={{
          ...styles.container,
          justifyContent: isShowKeyboard ? "center" : "flex-start",
        }}
      >
        <View style={styles.loadWrapper}>
          <View style={styles.postImgWrapper}>
            {postImg ? (
              <>
                <ImageBackground
                  style={styles.bgImage}
                  source={{ uri: postImg }}
                />
                <TouchableOpacity
                  style={{
                    ...styles.loadBtn,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  onPress={onLoadPostImg}
                >
                  <LoadPost
                    style={styles.loadBtnContent}
                    fillColor={"#ffffff"}
                  />
                </TouchableOpacity>
              </>
            ) : (
              isFocused && (
                <Camera
                  style={styles.camera}
                  ratio="1:1"
                  zoom={0}
                  type={Camera.Constants.Type.back}
                  ref={setCameraRef}
                >
                  <TouchableOpacity
                    style={{
                      ...styles.loadBtn,
                      backgroundColor: postImg
                        ? "rgba(255, 255, 255, 0.3)"
                        : "#ffffff",
                    }}
                    onPress={onLoadPostImg}
                  >
                    <LoadPost
                      style={styles.loadBtnContent}
                      fillColor={postImg ? "#ffffff" : "#bdbdbd"}
                    />
                  </TouchableOpacity>
                </Camera>
              )
            )}
          </View>

          <Text style={styles.loadWrapperText}>
            {postImg ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View>
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  currentFocused === "postName" ? "#ff6c00" : "#e8e8e8",
              }}
              placeholderTextColor="#bdbdbd"
              placeholder="Назва..."
              autoComplete="off"
              autoCapitalize="none"
              value={postName}
              onChangeText={setPostName}
              onFocus={() => handleFocus("postName")}
            />
            <View
              style={{
                ...styles.locationInputWrapper,
                borderColor:
                  currentFocused === "location" ? "#ff6c00" : "#e8e8e8",
              }}
            >
              <LocationSvg style={styles.btnLoaction} />
              <TextInput
                style={styles.inputLocation}
                placeholderTextColor="#bdbdbd"
                placeholder="Місцевість..."
                autoComplete="off"
                autoCapitalize="none"
                value={postAddress}
                onChangeText={setPostAddress}
                onFocus={() => handleFocus("location")}
                onBlur={addImageLocation}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={{
            ...styles.btn,
            backgroundColor:
              !postImg || !postName || !postLocation ? "#FF6C00" : "#ff6c00",
          }}
          onPress={onSubmitPost}
        >
          <Text
            style={{
              ...styles.btnText,
              color:
                !postImg || !postName || !postLocation ? "#ffffff" : "#ffffff",
            }}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTrash} onPress={handleGoBack}>
          <Trash stroke={"#dbdbdb"} />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#fff",
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  loadWrapper: {
    marginBottom: 32,
  },
  bgImage: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    height: 240,
    maxHeight: 240,
    width: "100%",
    maxWidth: 342,
    backgroundColor: "#000",
  },
  loadBtn: {
    alignItems: "center",
    alignContent: "center",
    width: 60,
    height: 60,
    padding: 18,
    color: "#bdbdbd",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  loadBtnContent: {},
  loadWrapperText: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    textAlign: "center",
  },
  locationInputWrapper: {
    position: "relative",
    height: 50,
    paddingVertical: 16,
    alignContent: "center",
    color: "#212121",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingVertical: 16,
    marginBottom: 16,
    color: "#212121",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
  },
  inputLocation: {
    fontSize: 16,
    marginLeft: 28,
    color: "#212121",
    backgroundColor: "#ffffff",
  },
  btnLoaction: {
    position: "absolute",
    left: 0,
    bottom: 16,
    alignSelf: "center",
    backgroundColor: "transparent",
  },
  btn: {
    marginTop: 32,
    marginBottom: 120,
    paddingVertical: 16,
    backgroundColor: "#f6f6f6",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "Roboto_400Regular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
    color: "#bdbdbd",
  },
  postImgWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    maxHeight: 240,
    maxWidth: 342,
    marginBottom: 8,
    marginLeft: 18,
    backgroundColor: "#F6F6F6",
    border: "1px solid #E8E8E8",
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  btnTrash: {
    alignSelf: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
});
