import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function SettingsScreen(props: any) {
  // Navigation variable
  const navigation = useNavigation();
  // Student information variables
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [year, setYear] = useState();
  // Getting student number from home screen
  const studentNumber = props.route.params.studentNumber;
  // Setting the doc/data structure to read from Firestore
  const studentDoc = doc(firestore, "Users", studentNumber);
  // Setting data structure to update/upload to Firestore
  const studentData = {
    name: name,
    course: course,
    year: year,
  };

  // Function to update/upload student details to Firestore
  const handleUpdateDetails = () => {
    // Checking if all fields are filled
    if (name == "" || course == "" || year == "") {
      alert("Please fill in all fields");
    } else {
      // Update data if all fields are filled
      setDoc(studentDoc, studentData, { merge: true });
      // Redirect to Home screen and clear stack
      navigation.dispatch(StackActions.replace("Home", { studentNumber }));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Text style={styles.title}>Please, update your details.</Text>
        <TextInput
          placeholder="Name"
          style={styles.textInput}
          onChangeText={(text) => setName(text)} // Set name state variable
        />
        <TextInput
          placeholder="Course"
          style={styles.textInput}
          onChangeText={(text) => setCourse(text)} // Set course state variable
        />
        <TextInput
          placeholder="Year"
          style={styles.textInput}
          onChangeText={(text) => setYear(text)} // Set year state variable
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateDetails} // Call handleUpdateDetails function
        >
          <Text style={styles.buttonText}>Update details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() =>
            navigation.dispatch(StackActions.replace("Home", { studentNumber }))
          } // Redirect to Home screen and clear stack
        >
          <Text style={styles.buttonOutlineText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  internalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
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
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "bold",
    fontSize: 16,
  },
});
