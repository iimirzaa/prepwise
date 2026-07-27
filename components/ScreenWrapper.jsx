import React from 'react';
import {View,StyleSheet,SafeAreaViewBase} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
const ScreenWrapper=({children})=>{
  return (
    <SafeAreaView style={{flex:1}}>
      <LinearGradient style={styles.wrapper}
      colors={["#050508","#3E3E75"]}
      start={{x:0 ,y:0}} 
      end={{x:1,y:1}}
      locations={[0,0.5]}>
        {children}
       
      </LinearGradient>
      </SafeAreaView> 
  );
}
const styles=StyleSheet.create({
  wrapper:{
    flex:1,
    justifyContent:"top",
    alignItems:"top",
    padding: moderateScale(20),
  }
});

export default ScreenWrapper;