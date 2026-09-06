import React, { useState,useRef } from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { StyleSheet, View, Image, Text, TextInput, Pressable ,Modal} from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import MyButton from "../../../components/Botton";
import Loader from '../../../components/Loading';
import { authService } from '../../services/auth.service';
import { validateOtp, validateEmail, validatePassword, validateConfirmPassword } from '../../Utils/validator';
const ChangePassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocus, setpFocus] = useState(false);
  const [confirmpasswordFocus, setcpFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setotp] = useState("");
  const [otpFocus, setotpFocus] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [otpError, setotpError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef(null);
  const [boxLayout, setBoxLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
    const measureBox = () => {
      if (boxRef.current) {
        boxRef.current.measureInWindow((x, y, width, height) => {
          setBoxLayout({ x, y, width, height });
        });
      }
    };
  const handlePress = async() => {
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
        const otpError = validateOtp(otp.toString());
            if (otpError) {
              setotpError(otpError);
              return;
            }
              measureBox();
                setIsLoading(true);
            
                try {
                  const response = await authService.changePassword(
                    email,
                    otp,
                    password
                  );
                  navigation.replace("Login");
            
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
    
  }
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <View style={styles.logowrapper}>
          <Image style={styles.logoimg} source={require("../../../assets/onboardlogo/applogo.png")}></Image>
          <Text style={styles.logotxt}>Prepwise</Text>
        </View>
        <Text style={[{ fontFamily: "Quicksand-Regular" }, { fontSize: moderateScale(14) }]}>AI interview Preparation</Text>
        <View style={styles.headerWrapper}>
          <Text style={styles.main}>Change Your Password</Text>
          <MaterialDesignIcons
            name="shield-account"
            size={20}
            color="#6F49F6"
          />
        </View>

        <Image
          source={require("../../../assets/onboardlogo/forget.png")}
          style={styles.img}
        />
        <View style={styles.Otpbox} ref={boxRef} onLayout={measureBox}>
         <View pointerEvents={isLoading ? "none" : "auto"} style={isLoading ? styles.disabledContent : null}>
          <View style={[styles.inputContainer, otpFocus && { borderColor: "#6F49F6" }]}>
            <MaterialDesignIcons
              name="key"
              size={18}
              color={otpFocus ? "#6F49F6" : "#888"}
            />
            <TextInput
              onFocus={() => setotpFocus(true)}
              onBlur={() => setotpFocus(false)}

              style={styles.input}
              placeholder="Enter Otp"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={otp}
              onChangeText={setotp} />
          </View>
           {otpError && (
                        <Text style={styles.errorText}>{otpError}</Text>
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
              placeholder="Password"
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
           {confirmpasswordError && (
                        <Text style={styles.errorText}>{confirmpasswordError}</Text>
                      )}
          <MyButton text={"Change Password"} onPress={handlePress}></MyButton>
          {confirmpasswordError && (
                        <Text style={styles.errorText}>{confirmpasswordError}</Text>
                      )}
                      {emailError && (
                        <Text style={styles.errorText}>{emailError}</Text>
                      )}


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
                  <Loader title={"Updating...."} />
                </View>
              </Modal>
    </ScreenWrapper>

  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: moderateScale(10),
    width: "100%"
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
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline"
  },
  main: {
    fontFamily: "Quicksand-Bold",
    fontSize: moderateScale(20),
    color: "#6F49F6"
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

  },

  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#222",
  },
  instruction: {
    width: "auto",
    flexDirection: "row",
    backgroundColor: '#E8E6E6',
    borderRadius: moderateScale(12),
    height: verticalScale(40),
    justifyContent: "center",
    alignItems: "center"


  },
  instTxt: {
    fontFamily: "Quicksand-Regular",
    fontSize: moderateScale(14),
    paddingHorizontal: scale(5),
    textAlign: "center"
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
export default ChangePassword;