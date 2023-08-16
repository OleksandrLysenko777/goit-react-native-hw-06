import MapView, { Marker } from "react-native-maps";
import { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import ArrowLeft from "../../assets/svg/ArrowLeft";

const MapScreen = ({ route, navigation }) => {
  const { longitude, latitude } = route.params.location;

  useEffect(() => {
    navigation.setOptions({
      title: "Мапа",
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
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker title="I am here" coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
