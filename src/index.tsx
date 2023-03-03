import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Provider from "./components/provider";
import SwipeAction from "./components/swiper"

export default function App() {
  const right = [
    {
      text: 'More',
      onPress: () => console.log('more'),
      backgroundColor: 'orange',
      color: 'white',
    },
    {
      text: 'Delete',
      onPress: () => console.log('delete'),
      backgroundColor: 'red',
      color: 'white',
    },
  ]
  const left = [
    {
      text: 'Read',
      onPress: () => console.log('read'),
      backgroundColor: 'blue',
      color: 'white',
    },
    {
      text: 'Reply',
      onPress: () => console.log('reply'),
      backgroundColor: 'green',
      color: 'white',
    },
  ]
  return (
    <Provider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SwipeAction
            right={right}
            left={left}
              onSwipeableOpen={() => console.log('open')}
              onSwipeableClose={() => console.log('close')}>
              <View style={{backgroundColor:"red"}}><Text>1</Text></View>
              <View style={{backgroundColor:"blue"}}><Text>2</Text></View>
              <View style={{backgroundColor:"yellow"}}><Text>3</Text></View>
              <View style={{backgroundColor:"orange"}}><Text>4</Text></View>
          </SwipeAction>

      </View>
    </Provider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
