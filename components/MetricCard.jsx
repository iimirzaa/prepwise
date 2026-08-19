import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {moderateScale, verticalScale} from 'react-native-size-matters';



const MetricCard = ({
  icon,
  label,
  value,
  unit,
  footerType,
  footerText,
  footerDirection = 'up', // 'up' | 'down' — only used for footerType="trend"
  footerColor = '#22A06B',
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialDesignIcons name={icon} size={moderateScale(16)} color="#7B61E0" />
      </View>

      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>

      {value !== '' && value !== undefined && value !== null ? (
        <View style={styles.valueRow}>
          <Text style={styles.value}>{value}</Text>
          {unit ? <Text style={styles.unit}>{unit}</Text> : null}
        </View>
      ) : null}

      {footerType === 'trend' && footerText ? (
        <View style={styles.footerRow}>
          <MaterialDesignIcons
            name={footerDirection === 'down' ? 'arrow-down' : 'arrow-up'}
            size={moderateScale(10)}
            color={footerColor}
          />
          <Text style={[styles.footerText, {color: footerColor}]}>{footerText}</Text>
        </View>
      ) : null}

      {footerType === 'dot' && footerText ? (
        <View style={styles.footerRow}>
          <Text style={[styles.footerTextBold, {color: footerColor}]}>{footerText}</Text>
          <View style={[styles.dot, {backgroundColor: footerColor}]} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: '#EFEAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(6),
  },
  label: {
    fontSize: moderateScale(10),
    color: '#888',
    marginBottom: verticalScale(2),
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  value: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#1E1E1E',
  },
  unit: {
    fontSize: moderateScale(9),
    color: '#888',
    marginLeft: 2,
    marginBottom: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(3),
  },
  footerText: {
    fontSize: moderateScale(9),
    fontWeight: '600',
    marginLeft: 2,
  },
  footerTextBold: {
    fontSize: moderateScale(11),
    fontWeight: '700',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginLeft: 4,
  },
});

export default MetricCard;