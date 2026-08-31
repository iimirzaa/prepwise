import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, Image, View, Text, Pressable, Modal } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MyButton from "../../../components/Botton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { authService } from '../../services/auth.service';
import Loader from '../../../components/Loading';
import { validateUsername, validateEmail, validatePassword, validateConfirmPassword } from '../../Utils/validator';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameFocus, setusernameFocus] = useState(false);
  const [emailFocus, seteFocus] = useState(false);
  const [passwordFocus, setpFocus] = useState(false);
  const [confirmpasswordFocus, setcpFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

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

  const handleLoginPress = () => {
    navigation.replace("Login");
  }

  const handleSignUpPress = async () => {
    // Clear previous errors
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    const usernameError = validateUsername(username);
    if (usernameError) {
      setUsernameError(usernameError);
      return;
    }

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

    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    if (confirmPasswordError) {
      setConfirmPasswordError(confirmPasswordError);
      return;
    }

    // measure right before showing, so we always have the box's current position/size
    measureBox();
    setIsLoading(true);

    try {
      const response = await authService.signUp(
        username,
        email,
        password
      );

      navigation.replace('VerifyOtp',{email:email});

    } catch (error) {
      setConfirmPasswordError(error.message);
      console.log('SIGNUP ERROR:', error);
      console.log('MESSAGE:', error.message);
      console.log('CODE:', error.code);
      console.log('STATUS:', error.response?.status);
      console.log('DATA:', error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>

        <View style={styles.logowrapper}>
          <Image style={styles.logoimg} source={require("../../../assets/onboardlogo/applogo.png")}></Image>
          <Text style={styles.logotxt}>Prepwise</Text>
        </View>
        <View style={{ zIndex: 1 }}>
          <Image
            source={require("../../../assets/onboardlogo/signup.png")}
            style={styles.img}
          />
        </View>

        <View
          ref={boxRef}
          onLayout={measureBox}
          style={styles.SignUpbox}
        >

          <View pointerEvents={isLoading ? "none" : "auto"} style={isLoading ? styles.disabledContent : null}>
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
            {usernameError && (
              <Text style={styles.errorText}>{usernameError}</Text>
            )}

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

            <View style={[styles.inputContainer, confirmpasswordFocus && { borderColor: "#6F49F6" }]}>
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
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <MaterialDesignIcons name="eye-outline" size={18} color={confirmpasswordFocus ? "#6F49F6" : "#888"} />
                ) : (
                  <MaterialDesignIcons name="eye-off-outline" size={18} color={confirmpasswordFocus ? "#6F49F6" : "#888"} />
                )}
              </Pressable>

            </View>
            {confirmPasswordError && (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            )}

            <MyButton text="SignUp" onPress={handleSignUpPress} />
            <Pressable onPress={handleLoginPress}>
              <Text style={styles.tmpacc}>Already have account?<Text style={{ color: "#6649F6" }}> Login</Text></Text></Pressable>
          </View>

        </View>
      </View>

      {/* Rendered via Modal so it can NEVER add to SignUpbox's layout/height.
          It's positioned using the box's measured on-screen coordinates, so it
          sits exactly centered over the box regardless of content size. */}
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

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    width: '100%',
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
  SignUpbox: {
    height: "auto",
    width: "100%",
    zIndex: 2,
    top: -30,
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
    marginBottom: verticalScale(5),


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
export default SignUp;