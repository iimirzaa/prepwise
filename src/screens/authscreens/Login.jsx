import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, Image, View, Text, Pressable, Modal } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MyButton from "../../../components/Botton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { validateEmail, validatePassword } from '../../Utils/validator';
import { authService } from '../../services/auth.service';
import {saveTokens} from '../../storage/authstorage';
import {useAuth} from '../../Utils/authcontext';
import Loader from "../../../components/Loading";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, seteFocus] = useState(false);
  const [passwordFocus, setpFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);
   const {login}=useAuth();

  // measured screen position/size of SignUpbox, used to place the Modal overlay exactly on top of it
  const boxRef = useRef(null);
  const [boxLayout, setBoxLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const measureBox = () => {
    if (boxRef.current) {
      boxRef.current.measureInWindow((x, y, width, height) => {
        setBoxLayout({ x, y, width, height });
      });
    }
  };
  const handleSignupPress = () => {
    navigation.replace("SignUp");
  }
  const handleForgetPress = () => {
    navigation.replace('Otp');
  }
  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }
    measureBox();
    setIsLoading(true);

    try {
      const response = await authService.login(

        email,
        password
      );
      await saveTokens(response?.data.access,response?.data.refresh);
      login();

    } catch (error) {
      setPasswordError(error.response?.data.message);
      console.log('SIGNUP ERROR:', error);
      console.log('MESSAGE:', error.message);
      console.log('CODE:', error.code);
      console.log('STATUS:', error.response?.status);
      console.log('DATA:', error.response?.data);
    } finally {
      setIsLoading(false);
    }
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

        <View ref={boxRef}
          onLayout={measureBox} style={styles.loginbox}>
          <View pointerEvents={isLoading ? "none" : "auto"} style={isLoading ? styles.disabledContent : null}>
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
            {emailError && (
              <Text style={styles.errorText}>{emailError}</Text>
            )}
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
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}
            <Pressable onPress={handleForgetPress}>
              <Text style={styles.forgettxt}>Forget Password?</Text></Pressable>

            <MyButton text="Login" onPress={handleLogin} />
            <Pressable onPress={handleSignupPress}>
              <Text style={styles.tmpacc}>Don't have account?<Text style={{ color: "#6649F6" }}> Sign up</Text></Text></Pressable>
          </View>
        </View>
      </View>
      <Modal
        visible={isLoading}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View
          style={[
            styles.loadingOverlay,
            {
              top: boxLayout.y,
              left: boxLayout.x,
              width: boxLayout.width,
              height: boxLayout.height,
            },
          ]}
        >
          <Loader title={"Signing Up...."} />
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: moderateScale(10),
  },
  logowrapper: {
    flexDirection: "row",
    justifyContent: "center",
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
    width: "100%",
    height: verticalScale(35),
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),


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
  disabledContent: {
    opacity: 0.5,
  },

  loadingOverlay: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(12),
  },
  errorText: {
    color: "red",
    paddingHorizontal: scale(10)
  }

});

export default Login;