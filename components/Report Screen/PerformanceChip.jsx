import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import {
  moderateScale,
  verticalScale,
  scale,
} from "react-native-size-matters";

const PerformanceChip = () => {
  return (
    <View style={styles.chip}>

      {/* Top Content */}
      <View style={styles.iconview}>

        {/* Icon */}
        <View style={styles.iconwrapper}>
          <MaterialDesignIcons
            name="trophy-outline"
            size={moderateScale(16)}
            color="#6F49F6"
          />
        </View>

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>78%</Text>
          <Text style={styles.subtitle}>Eye Contact</Text>
        </View>

      </View>

      {/* Progress Bar */}
      <View style={styles.upper}>
        <View style={styles.lower} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#F5F5F5",
    width: "49%",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },

  iconview: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(10),
  },

  iconwrapper: {
    height: verticalScale(32),
    width: scale(32),
    borderRadius: moderateScale(10),
    backgroundColor: "#EDE7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(8),
  },

  textContainer: {
    justifyContent: "center",
  },

  title: {
    fontSize: moderateScale(15),
    fontWeight: "700",
    color: "#222222",
    marginBottom: verticalScale(1),
  },

  subtitle: {
    fontSize: moderateScale(11),
    color: "#777777",
  },

  upper: {
    width: "100%",
    height: verticalScale(6),
    backgroundColor: "#E2E2E2",
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },

  lower: {
    width: "78%",
    height: "100%",
    backgroundColor: "#6F49F6",
    borderRadius: moderateScale(10),
  },
});

export default PerformanceChip;