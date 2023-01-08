import { Text, View } from "react-native";
import React, { Component } from "react";

export default function DetailsScreen(props: {
  route: { params: { userDetail: any } };
}) {
  const userDetail = props.route.params.userDetail;

  return (
    <View>
      <Text>DetailsScreen</Text>
      <Text> {userDetail.course}</Text>
      <Text> {userDetail.name}</Text>
    </View>
  );
}
