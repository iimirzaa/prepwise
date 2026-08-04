import React, { useState } from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { StyleSheet, View, Image, Text, TextInput,Pressable } from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import MyButton from "../../../components/Botton";
const verifyOtp = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [emailFocus, seteFocus] = useState(false);
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <View style={styles.logowrapper}>
          <Image style={styles.logoimg} source={require("../../../assets/onboardlogo/applogo.png")}></Image>
          <Text style={styles.logotxt}>Prepwise</Text>
        </View>
        <Text style={[{fontFamily:"Quicksand-Regular"},{fontSize:moderateScale(14)}]}>AI interview Preparation</Text>
        <View style={styles.headerWrapper}>
          <Text style={styles.main}>Verify Your Account</Text>
          <MaterialDesignIcons
            name="shield-account"
            size={20}
            color="#6F49F6"
          />
        </View>
        <Text style={[{textAlign:"center"},{fontFamily:"Quicksand-Medium"},

        ]}>We have sent 6-digit OTP to <Text>hello@gmail.com</Text><Pressable><Text>Change</Text></Pressable></Text>
        <Image
          source={require("../../../assets/onboardlogo/forget.png")}
          style={styles.img}
        />
        <View style={styles.Otpbox}>



          <View style={[styles.inputContainer, emailFocus && { borderColor: "#6F49F6" }]}>
            <MaterialDesignIcons
              name="key"
              size={18}
              color={emailFocus ? "#6F49F6" : "#888"}
            />
            <TextInput
              onFocus={() => seteFocus(true)}
              onBlur={() => seteFocus(false)}
              
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="#999"
              keyboardType="numeric"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail} />
          </View>
          <MyButton text={"Verify OTP"} ></MyButton>
          
            <Text style={styles.instTxt}>Didn't receive OTP.Resend</Text>
        
        </View>

      </View>
    </ScreenWrapper>

  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
  },
  logowrapper: {
    flexDirection: "row",

    alignItems: "center",
    height: verticalScale(50),
    width: "100%"
  },
  logoimg: {
    height: "100%",
    width: scale(60)

  },
  logotxt: {
    fontSize: moderateScale(24),
    color: "#6F49F6",
    fontFamily: "Quicksand-Bold",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center"
  },
  main:{
    fontFamily:"Quicksand-Bold",
    fontSize:moderateScale(20),
    color:"#6F49F6"
  },
  img: {
    width: scale(280),
    height: verticalScale(220),
    resizeMode: "contain",
    alignSelf: "center",

  },
  Otpbox: {
    height: "auto",
    width: "100%",

    padding: moderateScale(10),
    borderRadius: moderateScale(12),
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#000",
  },
  inputContainer: {
    width: scale(300),
    height: verticalScale(35),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),

    // Shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    // Shadow (Android)
    elevation: 2,
  },

  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#222",
  },
  instruction:{
    width:"auto",
    flexDirection:"row",
    backgroundColor:'#E8E6E6',
    borderRadius:moderateScale(12),
    height:verticalScale(40),
    justifyContent:"center",
    alignItems:"center"
  

  },
  instTxt:{
    fontFamily:"Quicksand-Regular",
    fontSize:moderateScale(14),
    paddingHorizontal:scale(5),
    textAlign:"center"
  }

});
export default verifyOtp;