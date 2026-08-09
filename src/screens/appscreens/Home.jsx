import React  from "react";
import {Button, Text ,View,StyleSheet} from "react-native";
import ScreenWrapper from '../../../components/ScreenWrapper';
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import StreakBox from '../../../components/StreakBox';
import ReadinessContainer from '../../../components/Readinessbox';
const Home= ()=>{
   return (
     <ScreenWrapper>
      <View style={styles.headerWrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>
            Hey, Demo
          </Text>
          <Text style={styles.subText}>Readiness score up <Text style={styles.highlightText}>12%</Text> this week</Text>
        </View>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            {/* You can place an icon or profile image initials here */}
          </View>
        </View>
      </View>
      <StreakBox/>
      <ReadinessContainer></ReadinessContainer>
     </ScreenWrapper>
   );
}

const styles=StyleSheet.create({
  headerWrapper:{
    flexDirection:"row",
    justifyContent:"space-between", 
    alignItems:"center", 
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
   
  },
  textContainer: {
    flex: 1, 
  },
  greetingText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: moderateScale(14),
    color: '#555',
  },
  highlightText: {
    fontWeight: 'bold',
    color: 'green', 
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle:{
    backgroundColor: "#30AFFF",
    opacity:0.7,
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20), 
  }
})

export default Home;
