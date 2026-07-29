import React, { useState } from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";

import MyButton from "../../../components/Botton";
import Curve from "../../../components/curve";
import ScreenWrapper from "../../../components/ScreenWrapper";

const onboardingSlides = [
  {
    id: 1,
    icon: require("../../../assets/onboardlogo/onboard11.png"),
    title: "AI-Powered",
    titleHighlight: "Interview Practice",
    description:
      "Get real-time feedback, smart suggestions and improve with every practice session.",
    buttonText: "Next",
  },
  {
    id: 2,
    icon: require("../../../assets/onboardlogo/onboard2.png"),
    title: "Personalized",
    titleHighlight: "Feedback",
    description:
      "Detailed insights on your answers, communication, confidence and areas to improve.",
    buttonText: "Next",
  },
  {
    id: 3,
    icon: require('../../../assets/onboardlogo/onbaord3.png'),
    title: "Practice Anytime,",
    titleHighlight: "Anywhere",
    description:
      "Choose from multiple interview categories and practice at your own pace.",
    buttonText: "Get Started",
  },
];

export { onboardingSlides };

const OnBoard = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = onboardingSlides[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Navigate to your next screen
      // navigation.replace("Login");
      console.log("Get Started");
    }
  };

  const handleSkip = () => {
    // navigation.replace("Login");
    console.log("Skip");
  };

  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <View style={styles.skipwrapper}>
          <Curve />

          <Pressable style={styles.skipbtn} onPress={handleSkip}>
            <Text style={styles.skiptxt}>Skip</Text>
          </Pressable>
        </View>

        <View style={styles.imgwrapper}>
          <Image
            source={currentSlide.icon}
            style={styles.imgstyle}
            
          />
        </View>

        <Text style={styles.header}>{currentSlide.title}</Text>

        <Text style={styles.subheader}>
          {currentSlide.titleHighlight}
        </Text>

        <Text style={styles.description}>
          {currentSlide.description}
        </Text>

        <MyButton
          text={currentSlide.buttonText}
          onPress={handleNext}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: moderateScale(20),
  },

  skipwrapper: {
    width: "100%",
    height: verticalScale(100),
    position: "relative",
  },

  skipbtn: {
    position: "absolute",
    top: moderateScale(12),
    right: moderateScale(16),
    zIndex: 2,
  },

  skiptxt: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: moderateScale(16),
    color: "#000",
  },

  imgwrapper: {
    height: verticalScale(300),
    width: scale(400),
  
    justifyContent: "center",
    alignItems: "center",
  },

  imgstyle: {
    width: "100%",
    height: "100%",
  },

  header: {
   
    fontSize: moderateScale(24),
    color: "#7B61FF",
    fontFamily: "Quicksand-Bold",
  },

  subheader: {
    fontSize: moderateScale(24),
    color: "#000",
    fontFamily: "Quicksand-Bold",
    marginBottom: verticalScale(12),
  },

  description: {
    fontSize: moderateScale(16),
    color: "#555",
    fontFamily: "Quicksand-Medium",
    textAlign: "center",
    lineHeight: moderateScale(24),
    paddingHorizontal: moderateScale(10),
    marginBottom: verticalScale(10),
  },
});

export default OnBoard;