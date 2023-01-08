import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Accelerometer } from "expo-sensors";
import { signOut } from "firebase/auth";

// Home screen after login or register
export default function HomeScreen(props: any) {
  // Navigation variable
  const navigation = useNavigation();
  // Student information variables
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [year, setYear] = useState();
  // Getting student number from login screen
  const studentNumber = props.route.params.studentNumber;
  // Accelerometer Data Information
  // To hold accelerometer data points in the phone
  const accelerometerDataArray: { x: number; y: number; z: number }[] = [];
  // To hold accelerometer reads from the phone and display in the counters
  const [accelerometer_data, setAccelerometer_data] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  // Setting the doc/data structure to read from Firestore
  const studentDoc = doc(firestore, "Users", studentNumber);

  // Function to get student data from Firestore and set state variables
  function readStudentData() {
    onSnapshot(studentDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setName(docSnapshot.data()?.name);
        setCourse(docSnapshot.data()?.course);
        setYear(docSnapshot.data()?.year);
      }
    });
  }

  // Accelerometer Sensors Function
  const accelerometerApp = () => {
    Accelerometer.setUpdateInterval(200);
    Accelerometer.addListener((accelerometerMeasurement) => {
      setAccelerometer_data(accelerometerMeasurement);

      // Populate accelerometer data array
      accelerometerDataArray.push({
        x: accelerometerMeasurement.x,
        y: accelerometerMeasurement.y,
        z: accelerometerMeasurement.z,
      });
      console.log(accelerometerDataArray.length);

      // Upload accelerometer data to Firestore every 1000 data points
      if (accelerometerDataArray.length === 50) {
        uploadAccelerometerData();
        accelerometerDataArray.length = 0;
        console.log("uploadAccelerometerData called");

        Accelerometer.removeAllListeners();
      }
    });
  };

  // Function to upload accelerometer data to firestore
  const uploadAccelerometerData = async () => {
    try {
      await setDoc(
        studentDoc,
        { accelerometer_data: accelerometerDataArray },
        { merge: true }
      );
      console.log("Document successfully written!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Run accelerometer and read student data on component mount
  useEffect(() => {
    accelerometerApp();
    readStudentData();
  }, []);

  // To handle sign out from App
  const handleLogout = () => {
    signOut(auth) // Logout
      .then(() => {
        navigation.dispatch(StackActions.replace("Login")); // Redirect to login screen and clear stack
      })
      .catch((error: any) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Text style={styles.title}>
          Email:
          <Text style={styles.text}> {auth.currentUser?.email}</Text>
        </Text>
        <Text style={styles.title}>
          Student number:
          <Text style={styles.text}> {studentNumber}</Text>
        </Text>
        <Text style={styles.title}>
          Full name:
          <Text style={styles.text}> {name}</Text>
        </Text>
        <Text style={styles.title}>
          Course:
          <Text style={styles.text}> {course}</Text>
        </Text>
        <Text style={styles.title}>
          Year:
          <Text style={styles.text}> {year}</Text>
        </Text>
        <Text style={styles.title}>Your sensors:</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            X: <Text style={styles.text}>{accelerometer_data.x} </Text>
          </Text>
          <Text style={styles.title}>
            Y: <Text style={styles.text}>{accelerometer_data.y}</Text>
          </Text>
          <Text style={styles.title}>
            Z: <Text style={styles.text}>{accelerometer_data.z}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.separateButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace("Settings", { studentNumber }) // Redirect to Settings screen and clear stack
            )
          }
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace("Leaderboard", { studentNumber }) // Redirect to Leaderboard screen and clear stack
            )
          }
        >
          <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout} // Logout
        >
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
  },
  internalContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
  },
  detailsContainer: {
    padding: 8,
    alignSelf: "flex-start",
  },
  separateButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "normal",
    fontSize: 14,
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
