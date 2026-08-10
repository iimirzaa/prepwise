import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { verticalScale ,moderateScale, scale} from 'react-native-size-matters';
import BarBox from './Bar';
const Breakdown=()=>{

    return(
    <View style={styles.breakdownbox}>
        <Text style={styles.breakdowntitle}>Skills Breakdown</Text>
        <BarBox title={'Content'}icon={"file-document-outline"}percentage={'78%'}/>
        <BarBox title={'Pacing'}icon={"speedometer"}percentage={'67%'}/>
        <BarBox title={'Eye Contact'}icon={"eye-outline"}percentage={'89%'}/>
        <BarBox title={'Confidence'}icon={"account-check-outline"}percentage={'70%'}/>

    </View>
    );
}
const styles=StyleSheet.create({
    breakdownbox:{
      marginVertical:verticalScale(5),
      backgroundColor:'white',
      elevation:6,
      width:"100%",
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(12),
      height:"auto",
      borderRadius:moderateScale(12)


    },
    breakdowntitle:{
        fontSize:moderateScale(16),
        fontWeight:"800"
    }
})
export default Breakdown;