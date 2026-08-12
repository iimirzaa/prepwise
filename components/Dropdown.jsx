import React from "react";
import {View,StyleSheet,Pressable,Text} from 'react-native';
import { moderateScale } from "react-native-size-matters";
const Dropdown=()=>{
  return(
   <View style={styles.dropdown}>
      <Text>Hi</Text>
   </View>
  );
}
const styles=StyleSheet.create({
  dropdown: {
    width: '100%',
    height: moderateScale(300),
    backgroundColor: 'white',

    borderRadius: moderateScale(10),

  

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
})
export default Dropdown;