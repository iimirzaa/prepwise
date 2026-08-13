import React from 'react';
import {View, StyleSheet, Pressable, Text, ScrollView} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';

const Dropdown = ({data, onSelect}) => {
  return (
    <View style={styles.dropdown}>
       <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        {data.map(item => (
          <Pressable
            key={item.value}
            style={styles.item}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.text}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    width: '100%',
    maxHeight: moderateScale(300),
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  item: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(6),
    backgroundColor:"#F3F4F4",
    marginVertical:verticalScale(2),
    borderRadius:moderateScale(6),
    borderColor:"#DDDDDD",
    borderWidth:moderateScale(1)
  },

  text: {
    fontSize: moderateScale(15),
    color: '#222',
  },
});

export default Dropdown;