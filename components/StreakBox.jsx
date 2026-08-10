import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const StreakBox = () => {
  return (
    <LinearGradient
      colors={['#764BA2', '#8B6CF7', '#667EEA']}
      style={styles.streakbox}
    >
      {/* Fire Icon */}
      <View style={styles.firebox}>
        <MaterialDesignIcons
          name="fire"
          size={moderateScale(25)}
          color="#FF8A00"
        />
      </View>

      {/* Streak Text */}
      <View style={styles.streaktext}>
        <Text style={styles.streakTitle}>6-days Streak</Text>
        <Text style={styles.streakSubtitle}>
          Practice today to keep it going!
        </Text>
      </View>

      {/* Continue Button */}
      <Pressable style={styles.cbtn}>
        <Text style={styles.btnText}>Continue</Text>

        <MaterialDesignIcons
          name="arrow-right"
          size={moderateScale(18)}
          color="#000"
        />
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  streakbox: {
    height: verticalScale(70),
    width: '100%',
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
     marginVertical:verticalScale(5),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },

  firebox: {
    height: verticalScale(40),
    width: scale(40),
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  streaktext: {
    flex:1,
    marginLeft: moderateScale(10),
  },

  streakTitle: {
    color: 'white',
    fontSize: moderateScale(15),
    fontWeight: '700',
  },

  streakSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: moderateScale(10),
    marginTop: verticalScale(3),
  },

  cbtn: {
    height: verticalScale(30),
    paddingHorizontal: moderateScale(5),
    borderRadius: moderateScale(9),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(3),
  },

  btnText: {
    color: 'black',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
});

export default StreakBox;