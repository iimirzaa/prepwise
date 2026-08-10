import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { LineChart } from 'react-native-gifted-charts';

const data = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 50 },
  { value: 42 },
  { value: 65 },
  { value: 86 },
];

const Chip = ({ icon, color,label ,count,progress,iconColor}) => {
  return (
    <View style={styles.chipbox}>
      <View style={[styles.iconbox,{backgroundColor:iconColor},{borderRadius: moderateScale(12),}]}>
        <MaterialDesignIcons name={icon} size={moderateScale(20)} color={color} />
      </View>

      <View style={styles.textbox}>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
        <Text style={styles.value} numberOfLines={1}>{count}</Text>
        <Text style={styles.sublabel} numberOfLines={1}>{progress}</Text>
      </View>

      <View style={styles.chartbox}>
        <LineChart
          data={data}
          height={verticalScale(28)}
          width={scale(32)}
          areaChart
          startFillColor={color}
          endFillColor={color}
          startOpacity={0.6}
          endOpacity={0.02}
          thickness={1}
          curved
          color={color}

          hideRules
          xAxisThickness={0}
          yAxisThickness={0}
          hideYAxisText
          yAxisLabelWidth={0}

          spacing={scale(4.5)}
          initialSpacing={2}
          endSpacing={0}

          dataPointsRadius={1.2}
          dataPointsColor={color}

          disableScroll
          isAnimated
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chipbox: {
    backgroundColor: "white",
    elevation: 6,
    height: verticalScale(70),
    width: "48%",
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    alignItems: "center",
    flexDirection: "row",
  },
  iconbox: {
    height: verticalScale(35),
    width: scale(35),
    
    justifyContent: "center",
    alignItems: "center",
  },
  textbox: {
    flex: 1,
    marginLeft: scale(6),
    marginRight: scale(4),
  },
  chartbox: {
    width: scale(32),
    height: verticalScale(28),
  },
  label: {
    fontSize: moderateScale(12),
    color: "#444",
    fontWeight:"600"
  },
  value: {
    fontSize: moderateScale(15),
    fontWeight: "700",
    color: "#000",
  },
  sublabel: {
    fontSize: moderateScale(9),
    color: "#888",
  },
});

export default Chip;