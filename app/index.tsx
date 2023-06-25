import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import "expo-dev-client";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export default function App() {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  GoogleSignin.configure({
    webClientId:
      "759507507122-78dm3ij2mie3smcd6ou8iim6olc1v1s7.apps.googleusercontent.com",
  });

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const userSignedIn = auth().signInWithCredential(googleCredential);
    userSignedIn
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>🚀</Text>
        <Text style={styles.heading}>SiteFetch</Text>
        <Text style={styles.subHeading}>Please login</Text>
        <GoogleSigninButton
          style={styles.gSigninButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome 🎉</Text>
      <Text style={styles.subHeading}>{user.displayName}</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subHeading: {
    fontSize: 34,
    color: "#38434D",
    marginTop: 20,
  },
  gSigninButton: {
    marginTop: 20,
  },
  gSignoutButton: {
    marginTop: 30,
    backgroundColor: "blue",
    padding: 10,
  },
  gSignoutButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
