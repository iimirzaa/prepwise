import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const QuestionCard = ({type = 'Behavioral', question, hint = 'Take a moment to think before answering'}) => {
  return (
    <View>
      <View style={styles.badge}>
        <MaterialDesignIcons name="account-group-outline" size={moderateScale(14)} color="#7B61E0" />
        <Text style={styles.badgeText}>{type}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <MaterialDesignIcons name="comment-text-outline" size={moderateScale(20)} color="#7B61E0" />
        </View>

        <Text style={styles.question}>{question}</Text>

        {hint ? (
          <View style={styles.hintRow}>
            <MaterialDesignIcons name="lightbulb-outline" size={moderateScale(13)} color="#999" />
            <Text style={styles.hintText}>{hint}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EFEAFB',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(20),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(8),
  },
  badgeText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: '#7B61E0',
    marginLeft: scale(4),
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  iconWrap: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#EFEAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  question: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    lineHeight: moderateScale(21),
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  hintText: {
    fontSize: moderateScale(11),
    color: '#999',
    marginLeft: scale(5),
  },
});

export default QuestionCard;