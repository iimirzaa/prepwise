import React from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { StyleSheet,View,Image,Text } from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
const VerifyOtp=()=>{
    return (
        <ScreenWrapper>
             <View style={styles.wrapper}>
                 <View style={styles.logowrapper}>
                               <Image style={styles.logoimg} source={require("../../../assets/onboardlogo/applogo.png")}></Image>
                               <Text style={styles.logotxt}>Prepwise</Text>
                             </View>
                             <Text>AI interview Preparation</Text>
                             <View style={styles.headerWrapper}>
                                <Text>Forget Password?</Text>
                                <MaterialDesignIcons
                                                   name="lock"
                                                   size={18}
                                                   color="#6F49F6"
                                                 />
                             </View>
                             <Text>Don't Worry! Enter your Email and we will send OTP.After verification you can reset your password</Text>

             </View>
        </ScreenWrapper>
    
    );
}
const styles=StyleSheet.create({
      wrapper: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: moderateScale(20),
      },
      logowrapper:{
         flexDirection:"row",
       
         alignItems:"center",
         height:verticalScale(50),
         width:"100%"
      },
      logoimg:{
        height:"100%",
        width:scale(60)
    
      },
      logotxt:{
        fontSize: moderateScale(24),
        color: "#6F49F6",
        fontFamily: "Quicksand-Bold",
      },
      headerWrapper:{
        flexDirection:"row"
      }

});
export default VerifyOtp;