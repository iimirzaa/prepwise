import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { moderateScale, verticalScale,scale } from 'react-native-size-matters';
import PerformanceChip from './PerformanceChip';
const PerformanceCard=()=>{
 return (
    <View style={styles.card}> 
    <View><Text style={styles.title}>
         Performance Breakdown
        </Text>
       
        </View>
        <View style={styles.chipview}>
            <PerformanceChip />
            <PerformanceChip />

        </View>

    </View>

 );
}
const styles=StyleSheet.create({
    card:{
        borderRadius:moderateScale(12),
        marginVertical:verticalScale(5),
        elevation:6,
        backgroundColor:"white",
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(10),
        width:'100%'

    },
    title:{
        fontWeight:"800",
        fontSize:moderateScale(14)

    },
    chipview:{
        flexDirection:"row",
        gap:moderateScale(5),
        flexWrap:'wrap'
    }
})
export default PerformanceCard;