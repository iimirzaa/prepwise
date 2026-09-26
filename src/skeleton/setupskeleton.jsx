import React from 'react';
import { View, StyleSheet } from 'react-native';

import ShimmerBox from '../../components/shimmer';

import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const SetupSkeleton = () => {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleBox}>
          <ShimmerBox
            width={scale(190)}
            height={moderateScale(22)}
            borderRadius={6}
          />

          <ShimmerBox
            width={scale(230)}
            height={moderateScale(13)}
            borderRadius={5}
          />
        </View>
      </View>

      {/* Overview */}
      <View style={styles.overview}>
        <ShimmerBox
          width="100%"
          height={moderateScale(70)}
          borderRadius={12}
        />
      </View>

      {/* Interview Type */}
      <View style={styles.section}>
        <ShimmerBox
          width={scale(120)}
          height={moderateScale(18)}
          borderRadius={5}
        />

        <View style={styles.typeRow}>
          <ShimmerBox
            width={scale(105)}
            height={moderateScale(55)}
            borderRadius={12}
          />

          <ShimmerBox
            width={scale(105)}
            height={moderateScale(55)}
            borderRadius={12}
          />

          <ShimmerBox
            width={scale(105)}
            height={moderateScale(55)}
            borderRadius={12}
          />
        </View>
      </View>

      {/* Target Role */}
      <View style={styles.section}>
        <ShimmerBox
          width="100%"
          height={moderateScale(55)}
          borderRadius={12}
        />
      </View>

      {/* Experience + Difficulty */}
      <View style={styles.row}>
        <ShimmerBox
          width="48%"
          height={moderateScale(55)}
          borderRadius={12}
        />

        <ShimmerBox
          width="48%"
          height={moderateScale(55)}
          borderRadius={12}
        />
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <ShimmerBox
          width={scale(90)}
          height={moderateScale(18)}
          borderRadius={5}
        />

        <ShimmerBox
          width="100%"
          height={moderateScale(55)}
          borderRadius={12}
        />
      </View>

      {/* Documents */}
      <View style={styles.section}>
        <ShimmerBox
          width={scale(150)}
          height={moderateScale(18)}
          borderRadius={5}
        />

        <View style={styles.documentRow}>
          <ShimmerBox
            width="48%"
            height={moderateScale(75)}
            borderRadius={12}
          />

          <ShimmerBox
            width="48%"
            height={moderateScale(75)}
            borderRadius={12}
          />
        </View>
      </View>

      {/* Evaluation */}
      <View style={styles.section}>
        <ShimmerBox
          width="100%"
          height={moderateScale(85)}
          borderRadius={12}
        />
      </View>

      {/* Start Button */}
      <ShimmerBox
        width="100%"
        height={moderateScale(50)}
        borderRadius={12}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(10),
  },

  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },

  titleBox: {
    width: '100%',
    alignItems: 'center',
  },

  overview: {
    width: '100%',
    marginBottom: verticalScale(8),
  },

  section: {
    width: '100%',
    marginVertical: verticalScale(5),
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
  },

  typeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },

  documentRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },
});

export default SetupSkeleton;