import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import Header from '../../../components/profile_components/Header';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Tile from '../../../components/profile_components/Tile';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
const profileItems = [
    {
        title: 'Personal Information',
        icon: 'account-outline',
    },
    {
        title: 'Interview Preferences',
        icon: 'tune-variant',
    },
    {
        title: 'Practice History',
        icon: 'history',
    },
    {
        title: 'Achievements',
        icon: 'trophy-outline',
    },
    {
        title: 'Help & Support',
        icon: 'help-circle-outline',
    },
];
const Profile = () => {
    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <View style={styles.headerbox}>
                    <Text style={styles.heading}>Profile</Text></View>
                <Header />
                <View style={styles.setting}>
                    {
                        profileItems.map((item) => {
                            return (
                                <Tile key={item.title} icon={item.icon} text={item.title} />

                            );
                        })
                    }


                </View>
                <Pressable style={styles.logoutButton}>
                    <MaterialDesignIcons
                        name="logout-variant"
                        size={moderateScale(20)}
                        color="#D9534F"
                    />
                    <Text>Logout</Text>
                </Pressable>


            </View>
        </ScreenWrapper>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'

    },
    headerbox: {
        justifyContent: "flex-start"

    },
    heading: {
        fontSize: moderateScale(18),
        fontWeight: '800'

    },
    setting: {
        backgroundColor: 'white',
        borderRadius: moderateScale(12),
        width: "100%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),
        elevation: 6
    },
    logoutButton: {
        width: "100%",
        height: verticalScale(40),
        flexDirection: 'row',
        elevation: 6,

        borderRadius: moderateScale(12),

        backgroundColor: '#FDECEC',

        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),



        marginTop: verticalScale(10),
    },
})
export default Profile;