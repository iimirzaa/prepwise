import React  from "react";
import {Button, Text ,View,StyleSheet} from "react-native";
import ScreenWrapper from '../../../components/ScreenWrapper';
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import StreakBox from '../../../components/StreakBox';
import ReadinessContainer from '../../../components/Readinessbox';
import Chip from '../../../components/chip';
import Breakdown from '../../../components/Breakdown';
import PracticeBar from '../../../components/PracticeBar';
const Home= ({navigation})=>{
  const handlePracticePress=()=>{
    navigation.navigate('Setup');
  }
   
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
      <PracticeBar press={handlePracticePress}/>
      <ReadinessContainer></ReadinessContainer>
      <View style={styles.chipstyle}>
       <Chip icon={'clock-outline'}color={'#6f49f6'}label={'Sessions'}count={'24'}progress={"6 this week"}iconColor={"#E3DEF5"}/>
       <Chip icon={'chart-line'}color={'#6f49f6'}label={'Fillers'}count={'3.1'}progress={"↓ 7.8"}iconColor={'#E3DEF5'}/>
       <Chip icon={'eye-outline'}color={'#FF653F'}label={'Eye Contact'}count={'78%'}progress={"↓ 8%"}iconColor={'#FFCA95'}/>
       <Chip icon={'badge-account'}color={'#6f49f6'}label={'Confidence'}count={'68%'}progress={"↓ 2%"}iconColor={'#E3DEF5'}/>
 
      </View>
      <Breakdown/>
      
     </ScreenWrapper>
     
   );
}

const styles=StyleSheet.create({
  headerWrapper:{
    flexDirection:"row",
    justifyContent:"space-between", 
    alignItems:"center", 
    width:"100%",
   
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
  },
  chipstyle:{
    marginVertical:verticalScale(5),
    // paddingVertical: moderateScale(10),
    // paddingHorizontal: moderateScale(12),
    width:"100%",
    flexDirection:'row',
    flexWrap:"wrap",
    gap:moderateScale(10)
    

  }
})

export default Home;
