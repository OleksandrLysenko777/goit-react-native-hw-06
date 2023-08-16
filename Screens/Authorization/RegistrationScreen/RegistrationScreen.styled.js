import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

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
  title: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
    color: "#212121",
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 16,
    marginBottom: 16,
    color: "#212121",
    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },
  inputLast: {
    marginBottom: 0,
  },
  passWrapper: {
    marginBottom: 43,
  },
  btnPassShow: {
    position: "absolute",
    right: 0,
    top: 0,
    alignSelf: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  btnPassShowText: {
    color: "#1B4371",
  },

  btn: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
  },
  btnText: {
    color: "#ffffff",
  },

  link: {
    alignItems: "center",
    marginTop: 16,
  },
  linkText: {
    color: "#1B4371",
    marginBottom: 45,
  },
  linkTextUnderline: {
    textDecorationLine: "underline",
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
  avatar: {
    width: 120,
    height: 120,
  },
  btnAddAvatar: {
    position: "absolute",
    bottom: 14,
    right: -12.5,

    alignItems: "center",
    alignContent: "center",
    width: 25,
    height: 25,
    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  btnAddAvatarLoad: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    alignItems: "center",
    alignContent: "center",
    width: 25,
    height: 25,
    color: "#ff6c00",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    transform: [{ rotate: "45deg" }],
  },
  btnAddAvatarSvg: {
    fill: "#ff6c00",
    stroke: "#ff6c00",
    backgroundColor: "#ffffff",
  },
  btnAddAvatarSvgLoad: {
    fill: "#bdbdbd",
    stroke: "#e8e8e8",
    backgroundColor: "#ffffff",
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 60,
    marginRight: 16,
    paddingVertical: 10,
  },
});

export const {
  avatarWrapper,
  avatar,
  btnAddAvatar,
  btnAddAvatarLoad,
  btnAddAvatarSvg,
  btnAddAvatarSvgLoad,
} = styles;
