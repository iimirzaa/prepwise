import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

const Loader = ({title}) => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color="#6F49F6" />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

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
  text: {
    marginTop: verticalScale(8),
    fontSize: moderateScale(14),
    color: "#333",
    fontFamily: "Quicksand-Medium",
  },
});

export default Loader;