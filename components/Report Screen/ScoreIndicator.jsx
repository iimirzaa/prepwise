import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

const ScoreIndicator = ({score = 82}) => {
  const size = 100;
  const strokeWidth = 8;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E9E5F2"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#6f49f6"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Score in center */}
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.outOf}>/100</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreContainer: {
    position: 'absolute',
    alignItems: 'center',
  },

  score: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D2438',
  },

  outOf: {
    fontSize: 14,
    color: '#8A8195',
  },
});

export default ScoreIndicator;