import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as firebase from "firebase";

//* Components
import Home from "./Components/Home";

export default function App() {
  useEffect(() => {
    // Firebase config
    const firebaseConfig = {
      apiKey: "AIzaSyBXnFc6zofxYOIN9DJj3RSt1RTeBhFK5vU",
      authDomain: "taxi-app-d1e50.firebaseapp.com",
      databaseURL: "https://taxi-app-d1e50.firebaseio.com",
      projectId: "taxi-app-d1e50",
      storageBucket: "taxi-app-d1e50.appspot.com",
      messagingSenderId: "982201263694",
      appId: "1:982201263694:web:2028330686ba1bcedb851f",
      measurementId: "G-HSCYL8NMVF",
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  const updateUsers = (deviceId = "", data = {}) => {
    firebase
      .database()
      .ref("/users/" + deviceId)
      .set({ ...data })
      .then(() => {
        console.log("Success!");
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Home updateUsers={updateUsers} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});