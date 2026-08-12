import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const OverviewChip = ({icon, title, subtitle}) => {
  return (
    <View style={styles.chip}>

      {/* Icon */}
      <View style={styles.icon}>
        <MaterialDesignIcons
          name={icon}
          size={moderateScale(15)}
          color="#6f49f6"
        />
      </View>

      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  chip: {
   
    alignItems: 'center',
    

    

    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),

    borderRadius: moderateScale(12),



    

   
  },

  icon: {
    width: moderateScale(24),
    height: moderateScale(24),

    borderRadius: moderateScale(12),

    backgroundColor: '#C9CAF7',

    justifyContent: 'center',
    alignItems: 'center',

  },

  textContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems:'center'
  },

  title: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#222',
  },

  subtitle: {
    fontSize: moderateScale(11),
    color: '#777',

    marginTop: verticalScale(2),
  },

});

export default OverviewChip;