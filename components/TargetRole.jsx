import React ,{useState}from 'react';
import {View,StyleSheet,Text,Pressable} from 'react-native';
import { moderateScale,scale, verticalScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const TargetRoleContainer=({job,showDropdown,press})=>{
    

 

    return(
        <View style={styles.container}>
          <Pressable style={styles.headingbox} onPress={press}>
            
                <View style={styles.icon}>
                <MaterialDesignIcons
                          name='briefcase'
                          size={moderateScale(18)}
                          color="#6f49f6"
                        />
                        </View>
                        <View style={styles.title}>
                         <Text style={styles.heading}>Target Role</Text>
                         <Text style={styles.subheading}>{job.title}</Text>
                        </View>
                        <View style={styles.dropicon}>
                          <MaterialDesignIcons
                          name={showDropdown?'chevron-up':'chevron-down'}
                          size={moderateScale(25)}
                          color="black"
                        />
                        </View>
                
                
             
            
            </Pressable>
            
            

        </View>

    );

}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:"white",
        elevation:6,
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        marginVertical:moderateScale(5),
        borderRadius:moderateScale(12),
    },
     icon: {
    width: moderateScale(28),
    height: moderateScale(28),

    borderRadius: moderateScale(12),

    backgroundColor: '#C9CAF7',

    justifyContent: 'center',
    alignItems: 'center',

  },
    headingbox:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
       
        

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
   dropicon:{
    alignItems:"flex-end"
    },
    

})
export default TargetRoleContainer;