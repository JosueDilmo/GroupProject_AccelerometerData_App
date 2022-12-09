import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
import { auth, firestore } from "../firebaseConfig";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./SettingsScreen";

// home screen after login or register
export default function HomeScreen(props: any) {
  //getting student number from login screen
  //navigation variable
  const navigation = useNavigation();

  const [name, setName] = useState(""); //state variables
  const [course, setCourse] = useState(""); //state variables
  const [year, setYear] = useState(""); //state variables
  const [accelerometer_data, setAccelerometer_data] = useState(""); //state variables
  const studentNumber = props.route.params.studentNumber; //getting student number from login screen
  //const Tab = createBottomTabNavigator();

  // function to log out
  const handleLogout = () => {
    auth
      .signOut() //log user out
      .then(() => {
        navigation.dispatch(StackActions.replace("Login")); // redirect to login screen and clear stack
      })
      .catch((error: any) => alert(error.message));
  };

  // setting document/data to get from firestore
  const studentDoc = doc(firestore, "Firestore", studentNumber);

  // function to get student data from firestore
  // and set state variables
  function readStudentData() {
    onSnapshot(studentDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setName(docSnapshot.data()?.name);
        setCourse(docSnapshot.data()?.course);
        setYear(docSnapshot.data()?.year);
        //setAccelerometer_data(studentSnapshot.data()?.accelerometer_data);
      }
    });
  }
  // call function
  readStudentData();

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Text style={styles.textEmail}>
          Logged in as: {auth.currentUser?.email}
        </Text>
        <Text style={styles.textEmail}>Student number: {studentNumber}</Text>
        <Text> Welcome to the home screen! </Text>
        <Text>Full name: {name}</Text>
        <Text>Course: {course}</Text>
        <Text>Year: {year}</Text>
        <Text>Your Accelerometer Data: {accelerometer_data}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogout} /*call function to log out*/
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.dispatch(
              StackActions.replace("Settings", { studentNumber })
            )
          } // redirect to settings screen and clear stack
        >
          <Text style={styles.buttonText}>Settings</Text>
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
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: "8%",
  },
});
