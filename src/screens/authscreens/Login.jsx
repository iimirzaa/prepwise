import React, { useState } from "react";
import { StyleSheet, TextInput, Image, View, Text ,Pressable} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MyButton from "../../../components/Botton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, seteFocus] = useState(false);
  const [passwordFocus, setpFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignupPress=()=>{
    navigation.navigate("SignUp");
   }


  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <View style={styles.logowrapper}>
          <Image style={styles.logoimg} source={require("../../../assets/onboardlogo/applogo.png")}></Image>
          <Text style={styles.logotxt}>Prepwise</Text>
        </View>

        <Image
          source={require("../../../assets/onboardlogo/login.png")}
          style={styles.img}
        />

        <View style={styles.loginbox}>
          <Text style={styles.greet}>Welcome Back!</Text>
          <Text style={styles.wish}>Login to continue your journey</Text>


          <View style={[styles.inputContainer, emailFocus && { borderColor: "#6F49F6" }]}>
            <MaterialDesignIcons
              name="email-outline"
              size={18}
              color={emailFocus ? "#6F49F6" : "#888"}
            />
            <TextInput
              onFocus={() => seteFocus(true)}
              onBlur={() => seteFocus(false)}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}>

            </TextInput>
          </View>
          <View style={[styles.inputContainer, passwordFocus && { borderColor: "#6F49F6" }]}>
           <MaterialDesignIcons
              name="lock-outline" size={18} color={passwordFocus ? "#6F49F6" : "#888"} />
            <TextInput
              onFocus={() => setpFocus(true)}
              onBlur={() => setpFocus(false)}

              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
  {showPassword ? (
    <MaterialDesignIcons name="eye-outline" size={18} color={passwordFocus ? "#6F49F6" : "#888"} />
  ) : (
    <MaterialDesignIcons name="eye-off-outline" size={18} color={passwordFocus ? "#6F49F6" : "#888"} />
  )}
</Pressable>
      
          </View>
          <Text style={styles.forgettxt}>Forget Password?</Text>

          <MyButton text="Login" onPress={null} />
          <Pressable onPress={handleSignupPress}>
          <Text style={styles.tmpacc}>Don't have account?<Text style={{ color: "#6649F6" }}> Sign up</Text></Text></Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: moderateScale(20),
  },
  logowrapper:{
     flexDirection:"row",
     justifyContent:"center",
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
  loginbox: {
    height: "auto",
    width: "100%",

    padding: moderateScale(10),
    borderRadius: moderateScale(12),
    backgroundColor: "white",
    elevation: 10,
    shadowColor: "#000",
  },

  greet: {
    fontSize: moderateScale(24),
    color: "black",
    fontFamily: "Quicksand-Bold",

  },
  wish: {
    fontSize: moderateScale(16),
    color: "black",
    fontFamily: "Quicksand-Medium",
    paddingBottom: moderateScale(10)

  },
  img: {
    width: scale(280),
    height: verticalScale(220),
    resizeMode: "contain",
    alignSelf: "center",
    
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
  forgettxt: {
    textAlign: "right",
    fontFamily: "Quicksand-SemiBold",
    color: "#6F49F6"

  },
  tmpacc: {
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
    paddingBottom: moderateScale(10)
  },

});

export default Login;