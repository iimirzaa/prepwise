import React from 'react';
import {View, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MetricCard from './MetricCard';


const MetricsRow = ({metrics = {}}) => {
  const {
    eyeContact = 0,
    eyeContactDelta = 0,
    speakingPace = 0,
    speakingPaceDelta = 0,
    fillerWords = 0,
    fillerWordsDelta = 0,
    confidence = 'Good',
    clarity = 'Good',
  } = metrics;

  return (
    <View style={styles.row}>
      <MetricCard
        icon="eye-outline"
        label="Eye Contact"
        value={`${eyeContact}%`}
        footerType="trend"
        footerDirection={eyeContactDelta < 0 ? 'down' : 'up'}
        footerText={`${eyeContactDelta > 0 ? '+' : ''}${eyeContactDelta}%`}
      />

      <MetricCard
        icon="speedometer"
        label="Speaking Pace"
        value={speakingPace}
        unit="WPM"
        footerType="trend"
        footerColor="#E0A03D"
        footerDirection={speakingPaceDelta < 0 ? 'down' : 'up'}
        footerText={`${speakingPaceDelta > 0 ? '+' : ''}${speakingPaceDelta} WPM`}
      />

      <MetricCard
        icon="comment-remove-outline"
        label="Filler Words"
        value={fillerWords}
        footerType="trend"
        footerDirection={fillerWordsDelta <= 0 ? 'down' : 'up'}
        footerText={`${fillerWordsDelta}`}
      />

      <MetricCard icon="pulse" label="Confidence" value="" footerType="dot" footerText={confidence} />

      <MetricCard icon="target" label="Clarity" value="" footerType="dot" footerText={clarity} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(6),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
});

export default MetricsRow;