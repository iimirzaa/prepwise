import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

import ScreenWrapper from '../../../components/ScreenWrapper';
import InterviewType from '../../../components/InterviewType';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Overview from '../../../components/InterviewOverview';
const SetupScreen = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>

        {/* Header */}
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
              Let's start your Interview
            </Text>

            <Text style={styles.subtitle}>
              Review your setting before we begin!
            </Text>
          </View>

        </View>
        <Overview/>
        <InterviewType/>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width:'100%'
    
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"flex-start",
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
    flex:1,
    alignItems:"center"

  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: moderateScale(12),
    color: '#777',
    marginTop: verticalScale(2),
  },

});

export default SetupScreen;