import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
} from "react-native";
import React, { Component, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function SettingsScreen(props: any) {
  const studentNumber = props.route.params.studentNumber; //getting student number from home screen
  const [name, setName] = useState(""); //state variables
  const [course, setCourse] = useState(""); //state variables
  const [year, setYear] = useState(""); //state variables
  const [accelerometer_data, setAccelerometer_data] = useState(""); //state variables
  const navigation = useNavigation(); //navigation variable

  const studentDoc = doc(firestore, "Firestore", studentNumber); // setting document
  const studentData = {
    name: name,
    course: course,
    year: year,
    accelerometer_data: accelerometer_data,
  }; // setting data to update

  // function to update student details to firestore
  const handleUpdateDetails = () => {
    if (name == "" || course == "" || year == "") {
      alert("Please fill in all fields"); //checking if all fields are filled
    } else {
      setDoc(studentDoc, studentData, { merge: true }); //updating data if all fields are filled
      navigation.dispatch(StackActions.replace("Home", { studentNumber })); // redirect to home screen and clear stack
    }
  };

  return (
    <View style={styles.detailsContainer}>
      <Text>Please, update your details:</Text>
      <TextInput
        placeholder="Name"
        style={styles.textInput}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Course"
        style={styles.textInput}
        onChangeText={(text) => setCourse(text)}
      />
      <TextInput
        placeholder="Year"
        style={styles.textInput}
        onChangeText={(text) => setYear(text)}
      />
      <Text>Your Data: {accelerometer_data}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateDetails}>
          <Text style={styles.buttonText}>Update details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonOutline]}
          onPress={() =>
            navigation.dispatch(StackActions.replace("Home", { studentNumber }))
          }
        >
          <Text style={styles.buttonOutlineText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: "64%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
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
    marginTop: 8,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "bold",
    fontSize: 16,
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: "8%",
  },
});
