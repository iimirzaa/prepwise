import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from "react-native";
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import MyChart from './chart';

const ReadinessContainer = () => {
  const [chartWidth, setChartWidth] = useState(0);

  const onChartLayout = useCallback((e) => {
    const { width } = e.nativeEvent.layout;
    if (width && width !== chartWidth) setChartWidth(width);
  }, [chartWidth]);

  return (
    <View style={styles.readinessbox}>
      <View style={styles.header}>
        <View style={styles.subheaderright}>
          <Text style={styles.subtxt}> Readiness Score</Text>
          <MaterialDesignIcons
            name="information-outline"
            size={moderateScale(18)}
            color="#000"
            paddingHorizontal='5'
          />
        </View>
        <View style={styles.subheaderleft}>
          <View style={styles.cuda}>
            <MaterialDesignIcons name="arrow-up" size={moderateScale(18)} color="#000" />
            <Text>12%</Text>
          </View>
          <Text>this week</Text>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.mainleft}>
          <Text style={styles.score}>86</Text>
          <View style={styles.jobBadge}>
            <Text style={styles.jobBadgeText}>Great Job</Text>
          </View>
        </View>

     
        <View style={styles.mainright} onLayout={onChartLayout}>
          {chartWidth > 0 && <MyChart width={chartWidth} height={verticalScale(110)} />}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  readinessbox: {
    backgroundColor: "white",
    minHeight: verticalScale(150),
    width: scale(300),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(5),
    elevation: 6,
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(12),
    overflow: 'hidden', // clips chart bleed at the rounded corners
  },
  header: {
    width: '100%',
    flexDirection: "row",
  },
  subheaderright: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  subheaderleft: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  subtxt: {
    fontSize: moderateScale(16),
    fontWeight: "600"
  },
  cuda: {
    backgroundColor: "rgba(0,255,156,0.4)", // rgba instead of opacity, so text isn't faded
    height: verticalScale(20),
    width: scale(48),
    borderRadius: moderateScale(15),
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flexDirection: "row",
    paddingVertical: verticalScale(10),
    justifyContent: 'center',
    alignItems: "center"
  },
  mainleft: {
    width: "40%",
    alignItems: 'center',
  },
  mainright: {
    width: "60%",
    overflow: 'hidden', // second clip guard, local to the chart cell
  },
  score: {
    fontSize: moderateScale(55),
    fontWeight: "bold",
    color: "#6F49F6",
    alignSelf: "center"
  },
  jobBadge: {
    backgroundColor: "rgba(0,255,156,0.2)",
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(3),
    borderRadius: moderateScale(10),
    marginTop: verticalScale(2),
  },
  jobBadgeText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: "#0A8A5A",
  }
});

export default ReadinessContainer;