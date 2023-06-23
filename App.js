import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "expo-dev-client";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export default function App() {
  GoogleSignin.configure({
    webClientId:
      "759507507122-78dm3ij2mie3smcd6ou8iim6olc1v1s7.apps.googleusercontent.com",
  });

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userSignedIn = auth().signInWithCredential(googleCredential);
    userSignedIn
      .then((user) => {
        console.log(user);
      })
      .cathc((err) => {
        console.log(err);
      });
  };

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
});
