import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
const BarBox = ({ title, icon,percentage }) => {
    return (
        <View style={styles.barbox}>
            <MaterialDesignIcons
                name={icon} size={18} color="#6F49F6" />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.bar}>
                <View style={[styles.fill, { width: percentage }]}>

                </View>
            </View>
            <Text style={styles.percentage}>
                {percentage}{"%"}
            </Text>
        </View>

    );
}
const styles = StyleSheet.create({
    barbox: {
        flexDirection: "row",
        paddingVertical: verticalScale(5),
        alignItems: 'center'
    },
    title: {
        paddingHorizontal: scale(10),
        width: "100",
        fontWeight:"600",
        fontSize:moderateScale(12)

    },
    bar: {
        flex: 1,
        backgroundColor: '#EAECF0',
        borderRadius: moderateScale(10),
        height: verticalScale(7),
        overflow: 'hidden'
    },
    fill: {
        backgroundColor: "#6f49f6",
        height: "100%"
    },
    percentage:{
        paddingLeft:moderateScale(5)
    }

})
export default BarBox;