import React from "react";
import {View,StyleSheet} from 'react-native';
import ShimmerBox from '../../components/shimmer';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
const ProfileSkeleton=()=>{
      return (
      <View style={styles.card}>
        {/* Avatar shimmer - circle */}
        <ShimmerBox
          width={scale(58)}
          height={verticalScale(58)}
          borderRadius={moderateScale(29)}
        />

        <View style={[styles.userInfo, { marginLeft: scale(12) }]}>
          {/* Name line shimmer */}
          <ShimmerBox
            width={scale(120)}
            height={verticalScale(17)}
            borderRadius={moderateScale(4)}
          />
          <View style={{ height: verticalScale(6) }} />

          {/* Email line shimmer */}
          <ShimmerBox
            width={scale(150)}
            height={verticalScale(12)}
            borderRadius={moderateScale(4)}
          />
          <View style={{ height: verticalScale(8) }} />

          {/* Progress pill shimmer */}
          <ShimmerBox
            width={scale(80)}
            height={verticalScale(20)}
            borderRadius={moderateScale(12)}
          />
        </View>

        {/* Arrow shimmer */}
        <ShimmerBox
          width={moderateScale(20)}
          height={moderateScale(20)}
          borderRadius={moderateScale(4)}
        />
      </View>
    );
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: verticalScale(5),

    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),

    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),

    elevation: 5,
  },
   userInfo: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default ProfileSkeleton;