import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import CustomPicker from './components/CustomPicker';

const App = () => {
  const [date,setDate] = useState(new Date());
  const dateData = ['January', 'February', 'March', 'April'];
  // const dateRef = useRef();
  // console.log(dateRef)
  return (
    <View style={{flex:1}}>
      <CustomPicker 
       data={dateData}
       backgroundColor="lightblue"
       dividerColor="gray"
       selectedTextColor="white"
       />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})