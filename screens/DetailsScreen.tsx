import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

export default function DetailsScreen(props: {
  route: { params: { userDetail: any } };
}) {
  const userDetail = props.route.params.userDetail;

  return (
    <View style={styles.container}>
      <View style={styles.internalContainer}>
        <Text style={styles.title}>
          Student Name: <Text style={styles.text}>{userDetail.name}</Text>
        </Text>
        <Text style={styles.title}>
          Course: <Text style={styles.text}>{userDetail.course}</Text>
        </Text>
        <Text style={styles.title}>
          Year: <Text style={styles.text}>{userDetail.year}</Text>
        </Text>
        <Text style={styles.title}>
          Score: <Text style={styles.text}>{userDetail.score}</Text>
        </Text>
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
  },
  text: {
    fontWeight: "normal",
    fontSize: 14,
  },
});
