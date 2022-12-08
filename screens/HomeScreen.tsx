import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../firebaseConfig";
import { StackActions, useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

export default function HomeScreen() {
  const navigation = useNavigation();

  // function to log out
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.dispatch(StackActions.replace("Login")); // redirect to login screen and clear stack
      })
      .catch((error: any) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Text style={styles.textEmail}>
          Logged in as: {auth.currentUser?.email}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  internalContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: "99%",
  },
  textEmail: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "40%",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "8%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
