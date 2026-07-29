import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const d = `
M0 100
C${width * 0.25} 20 ${width * 0.5} 30 ${width * 0.75} 60
C${width * 0.875} 70 ${width * 0.95} 80 ${width} 60
L${width} 0
L0 0
Z
`;

const Curve = () => {
  return (
    <Svg style={styles.curve} viewBox={`0 0 ${width} 100`}>
      <Path d={d} fill="#E0D5F3" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  curve: {
    height: 100,
    width: width,
  }
});

export default Curve;