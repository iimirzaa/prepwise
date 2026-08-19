import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const TipsCard = ({
  text = 'Structure your answer using STAR method: Situation, Task, Action, Result.',
  onViewExample,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialDesignIcons name="star-four-points-outline" size={moderateScale(16)} color="#7B61E0" />
      </View>

      <Text style={styles.text}>{text}</Text>

      {onViewExample ? (
        <Pressable style={styles.link} onPress={onViewExample} hitSlop={8}>
          <Text style={styles.linkText}>View example</Text>
          <MaterialDesignIcons name="chevron-right" size={moderateScale(14)} color="#7B61E0" />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEAFB',
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  iconWrap: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(13),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  text: {
    flex: 1,
    fontSize: moderateScale(11),
    color: '#5A4E7A',
    lineHeight: moderateScale(15),
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(6),
  },
  linkText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: '#7B61E0',
  },
});

export default TipsCard;