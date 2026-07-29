import React, { useState } from "react";
import { StyleSheet, TextInput, Image, View ,Text} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MyButton from "../../../components/Botton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { Mail } from "lucide-react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        
        <Image
        source={require("../../../assets/onboardlogo/login.png")}
        style={styles.img}
      />
       
        <View style={styles.loginbox}>
           <Text style={styles.greet}>Welcome Back!</Text>
        <Text style={styles.wish}>Login to continue your journey</Text>
      

      <View style={styles.inputContainer}>
        <Mail></Mail>
        <TextInput

          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
       <View style={styles.inputContainer}>
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          keyboardType='visible-password'
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.forgettxt}>Forget Password?</Text>

      <MyButton text="Login" onPress={null} />
      <Text style={styles.tmpacc}>Don't have account?<Text style={{color:"#6649F6"}}> Sign up</Text></Text>
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
  loginbox:{
    height:"auto",
    width:"100%",
  
    padding:moderateScale(10),
    borderRadius:moderateScale(12),
    backgroundColor:"white",
    elevation:10,
    shadowColor: "#000",
  },
  
  greet:{
       fontSize: moderateScale(24),
    color: "black",
    fontFamily: "Quicksand-Bold",

  },
  wish:{
       fontSize: moderateScale(16),
    color: "black",
    fontFamily: "Quicksand-Medium",
    paddingBottom:moderateScale(10)

  },
  img: {
    width: scale(280),
    height: verticalScale(220),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: verticalScale(30),
  },

  inputContainer: {
    width: scale(300),
    height: verticalScale(35),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    justifyContent: "center",
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
    width:"100%",
    fontSize: moderateScale(16),
    color: "#222",
  },
  forgettxt:{
    textAlign:"right",
    fontFamily:"Quicksand-SemiBold",
    color:"#6F49F6"

  },
  tmpacc:{
    fontFamily:"Quicksand-SemiBold",
    textAlign:"center",
    paddingBottom:moderateScale(10)
  }
});

export default Login;