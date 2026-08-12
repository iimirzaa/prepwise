import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const IChip = ({ icon, title,selected,onPress }) => {
  return (
    <Pressable onPress={onPress}
      style={[
        styles.chip,
        selected && styles.selectedChip]}>
    

      {/* Icon */}

      <MaterialDesignIcons
        name={icon}
        size={moderateScale(15)}
        color="#6f49f6"
      />


      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={[
          styles.title,
          selected && styles.selectedTitle,
        ]}>
          {title}
        </Text>


      </View>

  
    </Pressable>
  );
};

const styles = StyleSheet.create({

  chip: {

    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(12),
    backgroundColor: "white",
    elevation: 2,
    flex: 1,
    borderWidth:1,
    borderColor:"#E0E0F4"
  },
  selectedChip:{
    borderColor:"#6f49f6",
    backgroundColor:"#DFDBEC"
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
    alignItems: 'center'
  },

  title: {
    fontSize: moderateScale(9),
    fontWeight: '600',
    color: '#222',
  },
  selectedTitle:{
    color:"#6f49f6"
  }

});

export default IChip;