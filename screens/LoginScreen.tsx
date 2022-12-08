import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  //sign up and login variables
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");
  const plusEmail = "@email.com";

  //navigation variable
  const navigation = useNavigation();

  // function to sign up
  const handleSignUp = () => {
    auth;
    // here the @email.com will be added to the student number (register with student number only)
    createUserWithEmailAndPassword(
      auth,
      studentNumber + plusEmail,
      password
    ).catch((error) => alert(error.message));
  };

  // function to log in
  const handleLogin = () => {
    auth;
    signInWithEmailAndPassword(auth, studentNumber + plusEmail, password).catch(
      (error) => alert(error.message)
    );
  };

  // if user is logged in, redirect to home screen
  // if user registers, redirect to home screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.dispatch(StackActions.replace("Home")); // redirect to home screen and clear stack
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Student Number"
          style={styles.input}
          value={studentNumber}
          onChangeText={(text) => setStudentNumber(text)} //setting the value of the student number
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)} //setting the value of the password
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin} //calling the function
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp} //calling the function
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
  },
  buttonContainer: {
    width: "64%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 8,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "bold",
    fontSize: 16,
  },
});
