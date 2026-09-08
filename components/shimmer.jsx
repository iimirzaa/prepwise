import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { verticalScale } from 'react-native-size-matters';

const ShimmerBox = ({
  width = '100%',
  height = 40,
  borderRadius = 8,
  duration = 1800,
  baseColor = '#E5E5E5',
  highlightColor = '#F5F5F5',
  shimmerWidthRatio = 0.7, // width of the moving gradient relative to container
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const animationRef = useRef(null);

  const onLayout = useCallback((e) => {
    const { width: measuredWidth } = e.nativeEvent.layout;
    if (measuredWidth > 0 && measuredWidth !== containerWidth) {
      setContainerWidth(measuredWidth);
    }
  }, [containerWidth]);

  useEffect(() => {
    if (containerWidth === 0) return;

    translateX.setValue(0);

    animationRef.current = Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animationRef.current.start();

    return () => animationRef.current?.stop();
  }, [containerWidth, duration]);

  const shimmerWidth = containerWidth * shimmerWidthRatio;

  const animatedTranslate = translateX.interpolate({
    inputRange: [0, 1],
    // start fully off-screen left, end fully off-screen right
    outputRange: [-shimmerWidth, containerWidth],
  });

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        { width, height, borderRadius, backgroundColor: baseColor },
      ]}
    >
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.gradientWrapper,
            {
              width: shimmerWidth,
              transform: [{ translateX: animatedTranslate }],
            },
          ]}
        >
          <LinearGradient
            colors={[baseColor, highlightColor, baseColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginVertical:verticalScale(5)
  },
  gradientWrapper: {
    position: 'absolute',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
});

export default ShimmerBox;