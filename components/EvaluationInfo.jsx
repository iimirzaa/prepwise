import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const EvaluationContainer = () => {
  const evaluations = [
    {
      icon: 'message-text-outline',
      title: 'Answer',
      subtitle: 'Quality',
    },
    {
      icon: 'pulse',
      title: 'Communication',
    },
    {
      icon: 'shield-star-outline',
      title: 'Confidence',
    },
    {
      icon: 'eye-outline',
      title: 'Eye Contact',
    },
    {
      icon: 'speedometer',
      title: 'Speaking',
      subtitle: 'Pace',
    },
    {
      icon: 'format-size',
      title: 'Filler',
      subtitle: 'Words',
    },
  ];

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        You'll be evaluated on
      </Text>

      <View style={styles.itemsContainer}>
        {evaluations.map((item, index) => (
          <View style={styles.item} key={index}>

            <View style={styles.iconCircle}>
              <MaterialDesignIcons
                name={item.icon}
                size={moderateScale(25)}
                color="#6F49F6"
              />
            </View>

            <Text style={styles.itemTitle}>
              {item.title}
            </Text>

            {item.subtitle && (
              <Text style={styles.itemSubtitle}>
                {item.subtitle}
              </Text>
            )}

          </View>
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',

    borderRadius: moderateScale(18),

    paddingHorizontal: scale(12),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(14),
    marginVertical:verticalScale(5),

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  heading: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: '#252525',

    marginLeft: scale(4),
    marginBottom: verticalScale(10),
  },

  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  iconCircle: {
    width: moderateScale(40),
    height: moderateScale(40),

    borderRadius: moderateScale(20),

    backgroundColor: '#F1EDFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: verticalScale(6),
  },

  itemTitle: {
    fontSize: moderateScale(9),
    fontWeight: '500',
    color: '#5B5B72',

    textAlign: 'center',
    lineHeight: moderateScale(15),
  },

  itemSubtitle: {
    fontSize: moderateScale(10.5),
    fontWeight: '500',
    color: '#5B5B72',

    textAlign: 'center',
    lineHeight: moderateScale(15),
  },
});

export default EvaluationContainer;