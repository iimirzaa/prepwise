import React from 'react';
import {View,StyleSheet,Text,Pressable} from 'react-native';
import { scale, verticalScale,moderateScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
const InterviewSettingContainer=({icon,title,selected,showDropdown,press})=>{
    return(
    <Pressable style={styles.container} onPress={press}>
    
        <MaterialDesignIcons
            name={icon}
            size={moderateScale(20)}
            
            color="#6f49f6"
          />
          <View style={styles.title}> 
          <Text style={styles.heading}>
            {title}
          </Text>
          <Text style={styles.subheading}>
            {selected.title}
          </Text>
          </View>
          <MaterialDesignIcons
              name={showDropdown?'chevron-up':'chevron-down'}
              size={moderateScale(24)}
              color="#777"
            />


    </Pressable>
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
        flexDirection:'row',
        justifyContent:"flex-start",
        
    },
       heading:{
    fontWeight:"400",
    fontSize:moderateScale(12),
    paddingLeft:scale(5),
    color:'#2C2C2C'
    },
    subheading:{
    fontWeight:"600",
    fontSize:moderateScale(12),
    paddingLeft:scale(5),
    color:'#2C2C2C'
    },
    title:{
    flex:1,
   
    },

})
export default InterviewSettingContainer;