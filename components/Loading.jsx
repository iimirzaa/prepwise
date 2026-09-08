import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const Loader = ({ status = 'loading', title, subtitle }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (status === 'success' || status === 'error') {
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [status]);

  return (
    <View style={styles.wrapper}>
      {status === 'loading' && (
        <ActivityIndicator size="large" color="#6F49F6" />
      )}

      {status === 'success' && (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={[styles.iconCircle, { backgroundColor: '#E6F9EE' }]}>
            <MaterialDesignIcons name="check" size={moderateScale(28)} color="#22C55E" />
          </View>
        </Animated.View>
      )}

      {status === 'error' && (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={[styles.iconCircle, { backgroundColor: '#FDECEC' }]}>
            <MaterialDesignIcons name="close" size={moderateScale(28)} color="#EF4444" />
          </View>
        </Animated.View>
      )}

      <Text style={styles.text}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  iconCircle: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(14),
    color: "#333",
    fontFamily: "Quicksand-Medium",
    textAlign: "center",
  },
  subtitle: {
    marginTop: verticalScale(4),
    fontSize: moderateScale(12),
    color: "#888",
    fontFamily: "Quicksand-Medium",
    textAlign: "center",
  },
});

export default Loader;