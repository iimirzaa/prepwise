import React from 'react';
import {View,Text,Pressable,StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale ,scale,verticalScale} from "react-native-size-matters";
import BackButton from '../BackButton';
const ReportHeader=()=>{
    return (
     <View style={styles.reportheader }>
        <BackButton />
        <View style={styles.header}>
            <Text style={styles.main}>
                Interview Report
            </Text>
            <Text style={styles.name}>
                React Native Interview
            </Text>
            <Text style={styles.name}>
                19 Aug 2026 8:26 Pm
            </Text>
        </View>
        <Pressable style={styles.shareButton} onPress={null}>
                <MaterialDesignIcons name="download-outline" size={moderateScale(20)} color="black" />
              </Pressable>

     </View>
    );
}
const  styles=StyleSheet.create({
    reportheader:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:verticalScale(5)

    },
    header:{
        alignItems:"center"
    },
    main:{
        fontWeight:'600',
        fontSize:moderateScale(14)

    },
    name:{
      fontSize:moderateScale(12)
    },
    shareButton:{
          height: moderateScale(32),
            width: moderateScale(32),
            borderRadius: moderateScale(16),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 6,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.12,
            shadowRadius: 4,

    }

})
export default ReportHeader;