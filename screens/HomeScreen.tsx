import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function HomeScreen() {
  const navigation = useNavigation();

  // function to log out
  const handleLogout = () => {
    auth
      .signOut() //log user out
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
        <Text>Full name</Text>
        <Text>Course</Text>
        <Text>Year</Text>
        <Text>Data</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.textEmail}>Please, update your details:</Text>
        <TextInput placeholder="Name" style={styles.textInput} />
        <TextInput placeholder="Course" style={styles.textInput} />
        <TextInput placeholder="Year" style={styles.textInput} />
        <Text style={styles.textInput}>Your Accelerometer data</Text>
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
  },
  textEmail: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
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
