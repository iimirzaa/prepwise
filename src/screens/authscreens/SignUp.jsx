import React, { useState } from "react";
import { StyleSheet, TextInput, Image, View, Text ,Pressable} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MyButton from "../../../components/Botton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
const SignUp= ({navigation})=>{
       const [username,setUsername]=useState('');
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [usernameFocus, setusernameFocus] = useState(false);
       const [emailFocus, seteFocus] = useState(false);
       const [passwordFocus, setpFocus] = useState(false);
        const [confirmpasswordFocus, setcpFocus] = useState(false);
       const [showPassword, setShowPassword] = useState(false);
       const handleLoginPress=()=>{
        navigation.navigate("Login");
       }
       const handleSignUpPress=()=>{
        navigation.replace("Otp");
       }
     
     
       return (
         <ScreenWrapper>
           <View style={styles.wrapper}>
            
             <View style={styles.logowrapper}>
               <Image style={styles.logoimg} source={require("../../../assets/onboardlogo/applogo.png")}></Image>
               <Text style={styles.logotxt}>Prepwise</Text>
             </View>
              <View style={{zIndex:1}}>
             <Image
               source={require("../../../assets/onboardlogo/signup.png")}
               style={styles.img}
             />
             </View>
             <View style={styles.SignUpbox}>
               <Text style={styles.greet}>Create Account!</Text>
               <Text style={styles.wish}>Start your journey now.</Text>
                <View style={[styles.inputContainer, usernameFocus && { borderColor: "#6F49F6" }]}>
                 <MaterialDesignIcons
                   name="account-outline"
                   size={18}
                   color={usernameFocus ? "#6F49F6" : "#888"}
                 />
                 <TextInput
                   onFocus={() => setusernameFocus(true)}
                   onBlur={() => setusernameFocus(false)}
                   style={styles.input}
                   placeholder="Username"
                   placeholderTextColor="#999"
                   keyboardType="ascii-capable"
                   autoCapitalize="none"
                   value={username}
                   onChangeText={setUsername}>
     
                 </TextInput>
               </View>
     
     
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
               <View style={[styles.inputContainer, passwordFocus && { borderColor: "#6F49F6" }]}>
                <MaterialDesignIcons
                   name="lock-outline" size={18} color={confirmpasswordFocus ? "#6F49F6" : "#888"} />
                 <TextInput
                   onFocus={() => setcpFocus(true)}
                   onBlur={() => setcpFocus(false)}
     
                   style={styles.input}
                   placeholder="  Confirm Password"
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
              
     
               <MyButton text="SignUp" onPress={handleSignUpPress} />
               <Pressable onPress={handleLoginPress}>
               <Text style={styles.tmpacc}>Already have account?<Text style={{ color: "#6649F6" }}> Login</Text></Text></Pressable>
             </View>
           </View>
         </ScreenWrapper>
       );
   
}
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
  SignUpbox: {
    height: "auto",
    width: "100%",
    zIndex:2,
    top:-30,
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
 
  tmpacc: {
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
    paddingBottom: moderateScale(10)
  },

});
export default SignUp;