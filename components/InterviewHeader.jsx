import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const InterviewHeader = ({title, isRecording, recordingTime, onBack, onEnd}) => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBack}>
        <MaterialDesignIcons name="arrow-left" size={moderateScale(20)} color="black" />
      </Pressable>

      <View style={styles.titleBox}>
        <View style={styles.titleRow}>
          <MaterialDesignIcons name="rhombus-split-outline" size={moderateScale(14)} color="#7B61E0" />
          <Text style={styles.title}>{title}</Text>
        </View>

        {isRecording ? (
          <View style={styles.recordingContainer}>
            <View style={styles.recDot} />
            <Text style={styles.subtitle}>Recording {recordingTime}</Text>
          </View>
        ) : null}
      </View>

      <Pressable style={styles.endButton} onPress={onEnd}>
        <MaterialDesignIcons name="stop-circle-outline" size={moderateScale(14)} color="#E0453C" />
        <Text style={styles.endText}>End Interview</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    height: moderateScale(32),
    width: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#222',
    marginLeft: scale(5),
  },
  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(2),
  },
  recDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
    marginRight: scale(5),
  },
  subtitle: {
    fontSize: moderateScale(11),
    color: '#777',
  },
  endButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(9),
    borderRadius: moderateScale(16),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  endText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: '#E0453C',
    marginLeft: scale(4),
  },
});

export default InterviewHeader;