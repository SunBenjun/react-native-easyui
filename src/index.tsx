import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Provider,Consumer } from "./components/provider"
import Confirm from './components/confirm';

function A (){
  return <Consumer>{
    value=>(
      <View><Text>{value.value.theme}</Text><B/></View>
    )
    }</Consumer>
}

function B (){
  return (
    <Consumer>
      {
        ({value,setValue}) => (
          <View>
          <Text>{value.name}</Text>
          <TouchableOpacity onPress={()=>{
          setValue({
            theme:"black",
            name:"jun"
          })
        }}><Text>按钮</Text></TouchableOpacity>
          </View>
        )
      }
    </Consumer>
  )
}

export default function App() {
  const [value, setValue]  = useState({
    theme:"2",name:"3"
  })

  const [visible, setVisible] = useState(false)
  return (
    <Provider value={{value, setValue}}>
      <View style={styles.container}>
        <Text>这是一个!</Text>
        <A/>

        <StatusBar style="auto" />
          <TouchableOpacity onPress={()=>{
            setVisible(true);
          // setValue({
          //   theme:"white",
          //   name:"sun"
          // })
        }}><Text>show按钮</Text></TouchableOpacity>
        <Confirm visible={visible} onClose={()=>{setVisible(false)}}  btns={[{ text: '确定'},{ text: '取消' }]} selectStyle={{color:"red"}}/>
      </View>
      
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
