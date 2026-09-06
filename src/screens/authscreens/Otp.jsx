import React, { useState,useRef } from 'react';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { StyleSheet, View, Image, Text, TextInput ,Modal} from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import MyButton from "../../../components/Botton";
import { authService } from '../../services/auth.service';
import Loader from '../../../components/Loading';
import { validateEmail} from '../../Utils/validator';
const SendOtp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailFocus, seteFocus] = useState(false);

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
  const handleSendPress = async () => {
    setEmailError('');

    const emailError = validateEmail(email);
    if (emailError) {
      setEmailError(emailError);
      return;
    }


    measureBox();
    setIsLoading(true);

    try {
      const response = await authService.sendOtp(

        email

      );

      navigation.replace("change",{email:email});


    } catch (error) {
      setEmailError(error.response?.data.message);
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
          <Text style={styles.main}>Forget Password?</Text>
          <MaterialDesignIcons
            name="lock"
            size={20}
            color="#6F49F6"
          />
        </View>
        <Text style={[{ textAlign: "center" }, { fontFamily: "Quicksand-Medium" },

        ]}>Don't Worry! Enter your Email and we will send OTP.After verification you can reset your password</Text>
        <Image
          source={require("../../../assets/onboardlogo/forget.png")}
          style={styles.img}
        />
        <View style={styles.Otpbox} ref={boxRef} onLayout={measureBox}>
     <View pointerEvents={isLoading ? "none" : "auto"} style={isLoading ? styles.disabledContent : null}>


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
              onChangeText={setEmail} />
          </View>
           {emailError && (
                        <Text style={styles.errorText}>{emailError}</Text>
                      )}
          <MyButton text={"Send OTP"} onPress={handleSendPress} ></MyButton>
          <View style={styles.instruction}>
            <MaterialDesignIcons
              name="shield-account"
              size={24}
              color="#6F49F6"
            />
            <Text style={styles.instTxt}>We will send you an otp for verification</Text>
          </View>
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
                  <Loader title={"Sending...."} />
                </View>
              </Modal>
    </ScreenWrapper>

  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,

    alignItems: "center",
    width: "100%",
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
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
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
    justifyContent: "center",
    alignItems: "center"


  },
  instTxt: {
    fontFamily: "Quicksand-Regular",
    fontSize: moderateScale(14),
    paddingHorizontal: scale(5)
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
export default SendOtp;