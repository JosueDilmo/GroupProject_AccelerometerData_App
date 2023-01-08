import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export default function LeaderBoardScreen(props: any) {
  // Navigation variable
  const navigation = useNavigation();
  // Getting student number from home screen
  const studentNumber = props.route.params.studentNumber;
  // Setting the collection to read from Firestore
  const usersCollection = collection(firestore, "Users");
  // Students ID/number variable
  const [students, setStudents] = useState([]);
  // Students accelerometer data variable
  const [usersAcceData, setUsersAcceData] = useState([]);
  // Users counter variable
  let user = 0;

  useEffect(() => {
    // Call function to read data from Firestore
    getDataFromFirestore();
  }, []);

  // Function to read data from Firestore
  const getDataFromFirestore = async () => {
    const usersData = await getDocs(usersCollection);
    // Map through all documents and get users data
    const students = usersData.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // Map through all users and get all accelerometer data
    const allUserAcceData = students.map((doc) => doc.accelerometer_data);
    setStudents(students);
    setUsersAcceData(allUserAcceData);
  };

  const displayScore = (allUserAcceData: any[]) => {
    // Loop through all accelerometer data and calculate score
    allUserAcceData.forEach((userData: any) => {
      let score = 0;
      if (userData === undefined) {
        students[user].score = -1;
        user++;
      } else {
        userData.forEach((dataArray: { x: number; y: number; z: number }) => {
          score += calculateScore(dataArray);
        });
        score = score / 1000;
        students[user].score = score;
        user++;
      }
      rankByScore(students);
    });
  };
  displayScore(usersAcceData);

  // To calculate score
  function calculateScore(object: { x: number; y: number; z: number }) {
    const result = Math.abs(object.x) + Math.abs(object.y) + Math.abs(object.z);
    return result;
  }

  // To rank users by score
  function rankByScore(students: any[]) {
    students.sort((a: any, b: any) => {
      return b.score - a.score;
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Rank</Text>
        <Text style={styles.textTitle}>Name</Text>
        <Text style={styles.textTitle}>Score</Text>
      </View>
      <FlatList
        data={students}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={styles.internalContainer}
              onPress={() =>
                navigation.navigate("Details", { userDetail: item })
              }
            >
              <Text style={styles.text}>{students.indexOf(item) + 1}</Text>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>
                {item.score == -1 ? NaN : item.score}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={() =>
          navigation.dispatch(StackActions.replace("Home", { studentNumber }))
        } // Redirect to Home screen and clear stack
      >
        <Text style={styles.buttonOutlineText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "black",
    flex: 1,
  },
  title: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "white",
    padding: 8,
  },
  textTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "#0782f9",
    alignSelf: "center",
  },
  text: {
    flex: 1,
    fontSize: 14,
    alignSelf: "center",
  },
  internalContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
    backgroundColor: "white",
    padding: 8,
    marginTop: "0.5%",
    borderColor: "#0782f9",
    borderWidth: 1,
    borderRadius: 2,
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
  button: {
    alignSelf: "center",
    backgroundColor: "#0782f9",
    width: "40%",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    marginTop: "8%",
  },
});
