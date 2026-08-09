import React from 'react';
import {View,StyleSheet,Text} from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
const ReadinessContainer=()=>{
return(
  <View  style={styles.readinessbox}>
     <View style={styles.header}>
      <View style={styles.subheaderright}>
        <Text> Readiness Score</Text>
        <MaterialDesignIcons
                  name="information-outline"
                  size={moderateScale(18)}
                  color="#000"
                />
        
     </View>
     <View style={styles.subheaderleft}>
        <View style={styles.cuda}>
            <MaterialDesignIcons
                  name="arrow-up"
                  size={moderateScale(18)}
                  color="#000"
                />
            <Text>
                12%
            </Text>

        </View>
        <Text>this week</Text>

     </View>
     </View>
     <View style={styles.main}>
        <View>
           <Text>86</Text>
        </View>
        <View>

        </View>
     </View>
     
  </View>
);
}
const styles=StyleSheet.create({
    readinessbox:{
        backgroundColor:"white",
        height:verticalScale(100),
        width:scale(300),
        borderRadius:moderateScale(12),
         marginVertical:verticalScale(5),
         elevation:6,
         paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    },
    header:{
        width:'100%',
        flexDirection:"row"


    },
    subheaderright:{
        width:"50%",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center"
    },
    subheaderleft:{
        width:"50%",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:'center'
    },
    cuda:{
        backgroundColor:"#00FF9C",
        opacity:0.4,
        height:verticalScale(20),
        width:scale(48),
        borderRadius:moderateScale(15),
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    }
})
export default ReadinessContainer;