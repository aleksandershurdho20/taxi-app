import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [dataIsLoading, setDataIsLoading] = useState(false);

  const [object, setObject] = useState({
    deviceId: "string",
    location: {
      lat: "",
      lng: ""
    }
  });

  useEffect(() => {
   
    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    } else {
        setDataIsLoading(true);
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          console.log(status);
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
  
          let location = await Location.getCurrentPositionAsync({});
          console.log(location);
          setLocation(location);
        })();
          setDataIsLoading(false);
    }

    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      setObject({
        deviceId: "string",
        location: {
          lat: location.latitude ,
          lng: location.longitude
        }
      });
    }, 6000);
    return () => clearInterval(interval)
    ;
  }, []);

  return (
    <View className="App">
      <Text>
       {object.location.lat} {seconds}
       </Text>
    </View>
  );
};
export default Home