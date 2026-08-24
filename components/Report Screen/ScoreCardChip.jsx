import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const ScoreChip = ({icon, title, subtitle}) => {
  return (
    <View style={styles.container}>

      <MaterialDesignIcons
        name={icon}
        size={moderateScale(17)}
        color="#764BA2"
      />

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

  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F5F5F5',

    borderRadius: moderateScale(10),

    paddingHorizontal: scale(9),
    paddingVertical: verticalScale(7),

    minWidth: scale(85),
    borderColor:"#CDCBCB",
    borderWidth:moderateScale(1)
  },

  textContainer: {
    marginLeft: scale(6),
  },

  title: {
    fontSize: moderateScale(9),
    color: '#77717F',
    fontWeight: '500',
  },

  subtitle: {
    fontSize: moderateScale(12),
    color: '#2D2438',
    fontWeight: '700',

    marginTop: verticalScale(1),
  },
});

export default ScoreChip;