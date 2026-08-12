import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { moderateScale,scale } from 'react-native-size-matters';
import OverviewChip from './OverviewChip';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
const Overview=()=>{
    return(
        <View style={styles.container}>
            <View style={styles.headingbox}>
                <View style={styles.icon}>
                <MaterialDesignIcons
                          name='briefcase-outline'
                          size={moderateScale(15)}
                          color="#6f49f6"
                        />
                        </View>
                <Text style={styles.heading}>Interview Overview</Text>
            </View>
            <View style={styles.overviewchips}>
                <OverviewChip icon={'file-document-outline'}title={'10'}subtitle={'Questions'}/>
                <OverviewChip icon={'chart-line'}title={'intermediate'}subtitle={"Difficulty"}/>
                <OverviewChip icon={'clock-outline'}title={'15 min'}subtitle={'Duration'}/>
                <OverviewChip icon={'star-outline'}title={'AI-Powered'}subtitle={'Feedback'}/>
            </View>

        </View>

    );

}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:"white",
        elevation:6,
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        marginVertical:moderateScale(5),
        borderRadius:moderateScale(12)

    },
     icon: {
    width: moderateScale(28),
    height: moderateScale(28),

    borderRadius: moderateScale(12),

    backgroundColor: '#C9CAF7',

    justifyContent: 'center',
    alignItems: 'center',

  },
    headingbox:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        

    },
    heading:{
    fontWeight:"600",
    fontSize:moderateScale(14),
    paddingLeft:scale(5)
    },
    overviewchips:{
        flexDirection:"row",
       
        justifyContent:"space-between",
        
    }

})
export default Overview;