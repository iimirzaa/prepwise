import React, {useEffect, useRef} from 'react';
import {View, Text, Animated, StyleSheet, Pressable} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const BAR_COUNT = 28;


const RecordingWaveform = ({isRecording, onFlipCamera}) => {
  const bars = useRef(
    Array.from({length: BAR_COUNT}, () => new Animated.Value(0.3)),
  ).current;

  const activeRef = useRef(false);

  useEffect(() => {
    activeRef.current = isRecording;
    let loop = null;

    const animate = () => {
      if (!activeRef.current) {
        return;
      }

      const animations = bars.map(bar =>
        Animated.timing(bar, {
          toValue: 0.25 + Math.random() * 0.75,
          duration: 220,
          useNativeDriver: false,
        }),
      );

      loop = Animated.stagger(15, animations);
      loop.start(result => {
        if (result && result.finished && activeRef.current) {
          animate();
        }
      });
    };

    if (isRecording) {
      animate();
    } else {
      bars.forEach(bar => bar.setValue(0.3));
    }

    return () => {
      activeRef.current = false;
      if (loop) {
        loop.stop();
        loop = null;
      }
    };
  }, [isRecording, bars]);

  return (
    <>
      {isRecording && (
        <View style={styles.recBadge}>
          <View style={styles.recDot} />
          <Text style={styles.recText}>REC</Text>
        </View>
      )}

      {onFlipCamera ? (
        <Pressable style={styles.flipButton} onPress={onFlipCamera}>
          <MaterialDesignIcons name="camera-flip-outline" size={moderateScale(16)} color="white" />
        </Pressable>
      ) : null}

      {isRecording && (
        <View style={styles.waveformWrap}>
          <Text style={styles.listeningText}>Listening...</Text>

          <View style={styles.waveformRow}>
            {bars.map((bar, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.bar,
                  {
                    height: bar.interpolate({
                      inputRange: [0, 1],
                      outputRange: [4, moderateScale(20)],
                    }),
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  recBadge: {
    position: 'absolute',
    top: verticalScale(10),
    left: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(12),
  },
  recDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
    marginRight: scale(4),
  },
  recText: {
    color: 'white',
    fontSize: moderateScale(10),
    fontWeight: '700',
  },
  flipButton: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(10),
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
  listeningText: {
    color: 'white',
    fontSize: moderateScale(11),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  waveformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(20),
  },
  bar: {
    width: 2,
    marginHorizontal: 1.5,
    borderRadius: 2,
    backgroundColor: '#B7A3F2',
  },
});

export default RecordingWaveform;