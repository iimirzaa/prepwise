import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Circle, Svg } from 'react-native-svg';
import BarBox from '../../../components/Bar';
const AttemptInterview = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>



            <View style={styles.header}>


                {/* Back Button */}
                <Pressable style={styles.backButton}>
                    <MaterialDesignIcons
                        name="arrow-left"
                        size={moderateScale(22)}
                        color="black"
                    />
                </Pressable>


                {/* Title */}
                <View style={styles.titleBox}>
                    <Text style={styles.title}>
                        React Native Interview
                    </Text>
                    <View style={styles.recordingContainer}>
                        <Svg width={10} height={10}>
                            <Circle
                                cx="5"
                                cy="5"
                                r="5"
                                fill="red"
                            />
                        </Svg>

                        <Text style={styles.subtitle}>
                            Recording 0:42
                        </Text>
                    </View>

                </View>
                <View style={styles.stopbtncontainer}>
                    <Pressable style={styles.stopbtn}>
                        <MaterialDesignIcons name="stop" size={20} color="red" />
                        <Text>Stop</Text>
                    </Pressable>
                </View>
            </View>
            <BarBox icon={'help-circle'} title={'Question 3 of 10'} percentage={"30"}/>
            </View>
        </ScreenWrapper>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'

    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
    },

    backButton: {
        height: moderateScale(30),
        width: moderateScale(30),

        borderRadius: moderateScale(15),

        backgroundColor: 'white',

        justifyContent: 'center',
        alignItems: 'center',

        elevation: 6,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 4,
    },

    titleBox: {
        marginLeft: scale(12),
        flex: 1,
        alignItems: "center"

    },

    title: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#222',
    },
    recordingContainer: {
        flexDirection: 'row',
        alignItems: "baseline",
        justifyContent: "center",
        gap: 8,
    },

    subtitle: {
        fontSize: moderateScale(12),
        color: '#777',
        marginTop: verticalScale(2),
    },
    stopbtncontainer:{
     
        backgroundColor:"white",
        borderRadius:moderateScale(12),
        padding:moderateScale(8),
        elevation:6,
        alignItems:'center',
        justifyContent:"center"
    },
    stopbtn:{
           flexDirection:"row",

    }
})

export default AttemptInterview;
