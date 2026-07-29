import React ,{ useRef,useEffect} from "react";
import { scale, verticalScale, moderateScale, } from 'react-native-size-matters';
import { View, StyleSheet,Text,Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ScreenWrapper from '../../../components/ScreenWrapper';
const OnBoard = () => {
    const colorRef = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(colorRef, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }),
      Animated.timing(colorRef, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }),
    ])
  ).start();
}, []);

const backgroundColor = colorRef.interpolate({
  inputRange: [0, 1],
  outputRange: ['#1E1ED3', '#E1872C'],
});
    return (
        <ScreenWrapper>
            <View style={styles.headerWrapper}>
                <View style={styles.wrapperleft}>
                <LinearGradient colors={["#2C5EAD","#4BB8FA"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.minilogo}><Text style={styles.logotxt}>P</Text></LinearGradient>
                <View><Text style={styles.headerTxt}>Prepwise</Text></View>
                </View>
                <View><Text style={styles.headerTxtLeft}>Skip</Text></View>
            </View>
            <View style={styles.miniheaderwrapper}>
                <Animated.View style={[styles.dot,{backgroundColor}]}>
                </Animated.View>
                <Text style={styles.minheadertxt}>AI-POWERED   .   REAL-TIME</Text>
            </View>
            <View>
              <Text style={styles.bolt}>Practicce Interviews.</Text>
              <Text style={styles.slogan}>Get Judged by AI that watches.</Text>
            </View>
        </ScreenWrapper>
    );
}
const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        

    },
    wrapperleft:{
    marginBottom:moderateScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
       
        
    },
    minilogo:{
        padding:scale(5),
        marginRight:10,
        borderRadius:moderateScale(10),
        width:scale(30),
        alignItems:"center"

    },
    logotxt:{
     color: "white",
        fontWeight:"bold",
        fontSize:moderateScale(18)
    },
    headerTxt: {
        color: "white",
        fontWeight:"bold",
        fontSize:moderateScale(18)
    },
     headerTxtLeft:{
        color: "#696D6F",
        fontWeight:"bold",
        fontSize:moderateScale(18)
     },
     miniheaderwrapper:{
       flexDirection: "row",
       justifyContent:"flex-start",
       alignItems:'center'
     },
     dot:{
        height:verticalScale(10),
        width:scale(10),
        borderRadius:moderateScale(10),
        margin:moderateScale(5)
        
     },
     minheadertxt:{
        color: "white",
        fontWeight:"bold",
        fontSize:moderateScale(14)
     },

     bolt:{
      color:"white",
      fontWeight:"bold",
      fontSize:moderateScale(18),
      paddingHorizontal:moderateScale(10)
      
     },
     slogan:{
      color:"white",
      fontWeight:"bold",
      fontSize:moderateScale(18),
       paddingHorizontal:moderateScale(10)
     }
})
export default OnBoard;