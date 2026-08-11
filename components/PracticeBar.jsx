import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';

import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const PracticeBar = ({press}) => {
    
  return (
    <View style={styles.practicebar}>

      {/* Focus Icon */}
      <View style={styles.iconbox}>
        <MaterialDesignIcons
          name="target"
          size={moderateScale(28)}
          color="#6f49f6"
        />
      </View>

      {/* Heading */}
      <View style={styles.headingbox}>
        <Text style={styles.smallheading}>
          This week's focus
        </Text>

        <Text style={styles.focustext}>
          Eye Contact drops on Technical Questions
        </Text>
      </View>

      {/* Start Button */}
      <Pressable style={styles.startbtn} onPress={press}>
        <Text style={styles.btntxt}>
          Start
        </Text>

        <MaterialDesignIcons
          name="arrow-right"
          size={moderateScale(18)}
          color="white"
        />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({

  practicebar: {
   

    width:'100%',

    backgroundColor: 'white',

    elevation: 6,

    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginVertical:verticalScale(5),

    borderRadius: moderateScale(12),

    flexDirection: 'row',
    alignItems: 'center',

   

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  /* Focus icon container */
  iconbox: {
    width: moderateScale(44),
    height: moderateScale(44),

    borderRadius: moderateScale(12),

    backgroundColor: '#F0ECFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: moderateScale(10),
  },

  headingbox: {
    flex: 1,
    paddingRight: moderateScale(8),
  },

  smallheading: {
    fontSize: moderateScale(12),
    color: '#777',
    marginBottom: verticalScale(3),
    fontWeight: '500',
  },

  focustext: {
    fontSize: moderateScale(13),
    color: '#222',
    fontWeight: '600',
    lineHeight: moderateScale(18),
  },

  startbtn: {
    backgroundColor: '#6f49f6',

    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(11),

    borderRadius: moderateScale(11),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: moderateScale(4),
  },

  btntxt: {
    color: 'white',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

});

export default PracticeBar;