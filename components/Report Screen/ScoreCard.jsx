import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

import ScoreIndicator from './ScoreIndicator';
import ScoreChip from './ScoreCardChip';

const ScoreCard = () => {
  return (
    <View style={styles.scorecard}>

    
      <View style={styles.scoreSection}>
        <Text style={styles.scoreTitle}>
          Overall Score
        </Text>

        <View style={styles.indicatorContainer}>
          <ScoreIndicator />
        </View>
      </View>

      {/* RIGHT - Summary */}
      <View style={styles.rightSection}>

        <View style={styles.headingRow}>
          <View style={styles.headingIcon}>
            <MaterialDesignIcons
              name="trophy-outline"
              size={moderateScale(20)}
              color="#6F49F6"
            />
          </View>

          <View>
            <Text style={styles.heading}>
              Great Job!
            </Text>

            <Text style={styles.headingSubtitle}>
              Here's how you performed
            </Text>
          </View>
        </View>

        {/* Score Chips */}
        <View style={styles.chipbox}>

          <ScoreChip
            icon="star-circle-outline"
            title="Strengths"
            subtitle="3"
          />

          <ScoreChip
            icon="alert-circle-outline"
            title="To Improve"
            subtitle="2"
          />

          <ScoreChip
            icon="help-circle-outline"
            title="Questions"
            subtitle="10/10"
          />

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  scorecard: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',

    borderRadius: moderateScale(16),

    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(14),

    marginVertical: verticalScale(5),

    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  /* LEFT */

  scoreSection: {
    width: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#EEEAF3',
  },

  scoreTitle: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: '#6F6878',

    marginBottom: verticalScale(6),
  },

  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* RIGHT */

  rightSection: {
    flex: 1,

    marginLeft: scale(14),

    justifyContent: 'center',

    minWidth: 0,
  },

  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: verticalScale(12),
  },

  headingIcon: {
    width: moderateScale(36),
    height: moderateScale(36),

    borderRadius: moderateScale(18),

    backgroundColor: '#F1EBFA',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: scale(9),
  },

  heading: {
    fontSize: moderateScale(16),
    fontWeight: '700',

    color: '#2D2438',
  },

  headingSubtitle: {
    fontSize: moderateScale(11),
    color: '#8A8392',

    marginTop: verticalScale(2),
  },


  chipbox: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    gap: scale(7),

    width: '100%',
  },
});

export default ScoreCard;