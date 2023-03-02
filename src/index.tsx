import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Provider from "./components/provider";
import Confirm from "./components/confirm";
import Toast from "./components/toast";
 


const  B = (props) => {
  return (
        <View>
          <TouchableOpacity onPress={() => {
            // teleport(['errorAlert'], <View><Text>1111111111111111</Text></View>);
          }}>
            <Text>按钮</Text>
          </TouchableOpacity>
        </View>
 
 
  )
}
 
 
export default function App() {
  const [visible, setVisible] = useState(false);
  
  return (
    <Provider>
  
      <View style={styles.container}>
        <Text>这是一个!</Text>
     

        <StatusBar style="auto" />
        <TouchableOpacity
          onPress={() => {
            console.warn("============")
            // telePort(['errorAlert'], <View><Text>1111111111111111</Text></View>);
            Toast.show({
              content: <Text>1111</Text>,
              duration: 3000,
            });
            // setValue({
            //   theme:"white",
            //   name:"sun"
            // })
          }}
        >
          <Text>show按钮</Text>
        </TouchableOpacity>
        {/* <ToastContainer/> */}
        <Confirm
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          btns={[{ text: "确定" }, { text: "取消" }]}
          selectStyle={{ color: "red" }}
        />
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
