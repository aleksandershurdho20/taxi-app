import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";

const Home = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [deviceId] = useState("0");
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    long: 0,
  });

  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const updateCurrentPosition = async () => {
    let location = await Location.getCurrentPositionAsync();
    setCoordinates({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      updateCurrentPosition();
    })();
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      postData(
        "https://europe-west3-merr-taxi.cloudfunctions.net/registerLocation",
        {
          deviceId,
          location: { ...coordinates },
        }
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merr Taxi</Text>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: "#ee5253", marginBottom: 50 },
        ]}
      >
        <Text style={styles.buttonTitle}>I Zene</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#10ac84" }]}>
        <Text style={styles.buttonTitle}>I Lire</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 75,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    textTransform: "uppercase",
    color: "#8395a7",
  },
});

export default Home;