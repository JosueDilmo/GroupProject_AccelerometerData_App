import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
  const [studentNumber, setStudentNumber] = useState("");
  const [password, setPassword] = useState("");

  // function to simulate sign up
  const handleSignUp = () => {
    auth; // here I added the @email.com to be added to the student number
    createUserWithEmailAndPassword(auth, studentNumber + "@email.com", password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email); //printed 1234@email.com //on the firebase console I can see the user created
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Student Number"
          style={styles.input}
          value={studentNumber}
          onChangeText={(text) => setStudentNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {} /*handleLogin*/}
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
