import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const Header = () => {
  return (
    <View style={styles.card}>

      {/* Avatar */}
      <Image
        source={require('../../assets/onboardlogo/applogo.png')}
        style={styles.avatar}
      />

      {/* User Information */}
      <View style={styles.userInfo}>
        <Text style={styles.name}>Demo</Text>

        <Text style={styles.email}>
          demo@gmail.com
        </Text>

        {/* Profile Progress */}
        <View style={styles.progressButton}>
          <MaterialDesignIcons
            name="progress-check"
            size={moderateScale(13)}
            color="#764BA2"
          />

          <Text style={styles.progressText}>
            Profile 65%
          </Text>
        </View>
      </View>

      {/* Arrow */}
      <MaterialDesignIcons
        name="chevron-right"
        size={moderateScale(25)}
        color="#9E9E9E"
        style={styles.arrow}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: verticalScale(5),

    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),

    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),

    elevation: 5,
  },

  avatar: {
    width: scale(58),
    height: verticalScale(58),

    borderRadius: moderateScale(29),

    resizeMode: 'contain',

    borderWidth: moderateScale(1),
    borderColor: '#EEEEEE',

    marginRight: scale(12),
  },

  userInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  name: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: '#222222',

    marginBottom: verticalScale(2),
  },

  email: {
    fontSize: moderateScale(12),
    color: '#777777',

    marginBottom: verticalScale(6),
  },

  progressButton: {
    alignSelf: 'flex-start',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(4),

    borderRadius: moderateScale(12),

    backgroundColor: '#F1E9FA',

    gap: scale(4),
  },

  progressText: {
    fontSize: moderateScale(10),
    fontWeight: '600',
    color: '#764BA2',
  },

  arrow: {
    marginLeft: scale(6),
  },
});

export default Header;