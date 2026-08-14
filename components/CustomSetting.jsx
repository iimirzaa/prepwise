import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { scale, verticalScale,moderateScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
const InterviewSettingContainer=()=>{
    return(
    <View style={styles.container}>
        <MaterialDesignIcons
            name="signal-cellular-3"
            size={moderateScale(20)}
            color="#777"
          />
          <Text>
            Experience Level
          </Text>
          <MaterialDesignIcons
              name="chevron-down"
              size={moderateScale(20)}
              color="#777"
            />


    </View>
    );

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        elevation:6,
        paddingHorizontal:scale(12),
        paddingVertical:verticalScale(10),
        borderRadius:moderateScale(12),
        flexDirection:'row'
    }

})
export default InterviewSettingContainer;