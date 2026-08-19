import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const BottomControls = ({isRecording, onSkip, onToggleRecord, onHint}) => {
  return (
    <View style={styles.row}>
      <Pressable style={styles.pillButton} onPress={onSkip} hitSlop={8}>
        <MaterialDesignIcons name="skip-next-outline" size={moderateScale(15)} color="#555" />
        <Text style={styles.pillText}>Skip Question</Text>
      </Pressable>

      <Pressable style={styles.recordOuter} onPress={onToggleRecord}>
        <View style={styles.recordInner}>
          <MaterialDesignIcons
            name={isRecording ? 'stop' : 'record'}
            size={moderateScale(24)}
            color="white"
          />
        </View>
      </Pressable>

      <Pressable style={styles.pillButton} onPress={onHint} hitSlop={8}>
        <MaterialDesignIcons name="lightbulb-outline" size={moderateScale(15)} color="#555" />
        <Text style={styles.pillText}>Need a hint?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(24),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  pillText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: '#555',
    marginLeft: scale(5),
  },
  recordOuter: {
    width: moderateScale(66),
    height: moderateScale(66),
    borderRadius: moderateScale(33),
    backgroundColor: '#EFEAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInner: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(26),
    backgroundColor: '#7B61E0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default BottomControls;