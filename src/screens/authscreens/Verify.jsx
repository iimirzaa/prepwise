import React, { useState, useRef } from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { StyleSheet, View, Image, Text, TextInput, Pressable, Modal } from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import MyButton from "../../../components/Botton";
import Loader from '../../../components/Loading';
import { authService } from '../../services/auth.service';
import { validateEmail, validateOtp } from '../../Utils/validator';

const VerifyOtp = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setoTp] = useState("");
  const [otpFocus, setotpFocus] = useState(false);
  const [otpError, setotpError] = useState('');
  const [emailError, setEmailError] = useState('');

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

  const handlePress = async () => {
    // Clear previous errors
    setotpError('');
    setEmailError('');

    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }

    const otpError = validateOtp(otp.toString());
    if (otpError) {
      setotpError(otpError);
      return;
    }

    // measure right before showing, so we always have the box's current position/size
    measureBox();
    setIsLoading(true);

    try {
      const response = await authService.verifyOtp(
        email,
        otp
      );

      navigation.replace('Login');

    } catch (error) {
      setotpError(error.response?.data?.message || error.message);
      console.log('VERIFY OTP ERROR:', error);
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
        <Text style={[{ fontFamily: "Quicksand-Regular" }, { fontSize: moderateScale(14) }]}>AI interview Preparation</Text>
        <View style={styles.headerWrapper}>
          <Text style={styles.main}>Verify Your Account</Text>
          <MaterialDesignIcons
            name="shield-account"
            size={20}
            color="#6F49F6"
          />
        </View>
        <Text style={[{ textAlign: "center" }, { fontFamily: "Quicksand-Medium" },

        ]}>We have sent 6-digit OTP to {email}</Text>
        {emailError && (
          <Text style={styles.errorText}>{emailError}</Text>
        )}
        <Image
          source={require("../../../assets/onboardlogo/forget.png")}
          style={styles.img}
        />

        <View
          ref={boxRef}
          onLayout={measureBox}
          style={styles.Otpbox}
        >

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
                placeholder="Enter OTP"
                placeholderTextColor="#999"
                keyboardType="numeric"
                autoCapitalize="none"
                value={otp}
                onChangeText={setoTp} />
            </View>
            {otpError && (
              <Text style={styles.errorText}>{otpError}</Text>
            )}
            <MyButton text={"Verify OTP"} onPress={handlePress}></MyButton>

            <Pressable><Text style={styles.instTxt}>Resend OTP</Text></Pressable>

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
          <Loader title={"Verifying..."} />
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
    width: '100%',
    paddingHorizontal: moderateScale(20),
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
    justifyContent: 'center',
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
    width: '100%',
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
  instruction: {
    width: "auto",
    flexDirection: "row",
    backgroundColor: '#E8E6E6',
    borderRadius: moderateScale(12),
    height: verticalScale(40),

    alignItems: "baseline"


  },
  instTxt: {
    fontFamily: "Quicksand-Regular",
    fontSize: moderateScale(14),
    paddingHorizontal: scale(5),
    textAlign: 'center',
    color: "red",
    fontWeight: "700",
    letterSpacing: 1

  },
  errorText: {
    color: "red",
    paddingHorizontal: scale(10),
    fontFamily: "Quicksand-Regular",
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


});
export default VerifyOtp;