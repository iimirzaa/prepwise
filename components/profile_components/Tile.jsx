import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const Tile = ({ icon, text,onpress }) => {
  return (
    <Pressable style={styles.tile} onPress={onpress}>

      {/* Left Side */}
      <View style={styles.iconBar}>
        <View style={styles.iconContainer}>
          <MaterialDesignIcons
            name={icon}
            size={moderateScale(21)}
            color="#764BA2"
          />
        </View>

        <Text style={styles.title}>
          {text}
        </Text>
      </View>

      {/* Right Arrow */}
      <MaterialDesignIcons
        name="chevron-right"
        size={moderateScale(22)}
        color="#9E9E9E"
      />

    </Pressable>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    minHeight: verticalScale(52),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),

    borderBottomWidth: moderateScale(1),
    borderBottomColor: '#EEEEEE',
  },

  iconBar: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
  },

  iconContainer: {
    width: scale(34),
    height: verticalScale(34),

    borderRadius: moderateScale(10),

    backgroundColor: '#F3ECF9',

    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    marginLeft: scale(12),

    fontSize: moderateScale(14),
    fontWeight: '500',

    color: '#292929',
  },
});

export default Tile;