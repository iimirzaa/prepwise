import React from 'react';
import {Pressable,Text,StyleSheet} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const MyButton=({text,onPress})=>{
    return(
         <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.btntxt}>{text}</Text>
         </Pressable>
    );
}
const styles=StyleSheet.create({
    button:{
     backgroundColor:"#6F49F6",
     height:verticalScale(35),
     width:'100%',
     marginVertical:verticalScale(10),
     alignItems:"center",
     justifyContent:"center",
     borderRadius:moderateScale(10)
    },
    btntxt:{
        color:"white",
        fontFamily:"Quicksand-SemiBold",
        

    }
})
export default MyButton;