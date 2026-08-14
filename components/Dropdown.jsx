
import { useState } from 'react';
import React from 'react';
import {View, StyleSheet, Pressable, Text, ScrollView,TextInput} from 'react-native';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const Dropdown = ({data, onSelect}) => {
  const  [selected,setselected]=useState(null);
  const [searchJob,setSearch]=useState('');
  const filteredData=data.filter(item=>item.title.toLowerCase().includes(searchJob.toLowerCase()))
  const handlePress=(item)=>{
    setselected(item.value);
    onSelect(item)

  }
  return (
    <View style={styles.dropdown}>
       <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchContainer}>
  <MaterialDesignIcons
    name="magnify"
    size={moderateScale(20)}
    color="#777"
  />

  <TextInput
    placeholder="Search Role"
    placeholderTextColor="#999"
    style={styles.input}
    value={searchJob}
    onChangeText={setSearch}
  />

  {searchJob.length > 0 && (
    <Pressable onPress={() => setSearch('')}>
      <MaterialDesignIcons
        name="close-circle"
        size={moderateScale(18)}
        color="#999"
      />
    </Pressable>
  )}
</View>
        {filteredData.map(item => (
          <Pressable
            key={item.value}
            style={[styles.item,{borderColor:selected===item.value?"#6f49f6":"#DDDDDD"}]}
            onPress={()=>{handlePress(item)}}
          >
            <Text style={styles.text}>
              {item.title}
            </Text>
            {selected===item.value &&(
              
               <MaterialDesignIcons
                                         name='check-circle'
                                         size={moderateScale(18)}
                                         color="#6f49f6"
                                       />
              )
            
              
            

            }
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
  searchContainer: {
  
  flexDirection: 'row',
  alignItems: 'center',

  backgroundColor: '#F7F7F8',

  borderWidth: moderateScale(1),
  borderColor: '#E2E2E5',
  borderRadius: moderateScale(6),

  paddingHorizontal: moderateScale(6),
  paddingVertical: verticalScale(4),

  marginBottom: moderateScale(8),
},

input: {
  flex: 1,
  color: '#222',
  fontSize: moderateScale(12),

  paddingVertical: 0,
  paddingHorizontal: moderateScale(8),
},
  item: {
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(6),
    backgroundColor:"#F3F4F4",
    marginVertical:verticalScale(2),
    borderRadius:moderateScale(6),
    borderColor:"#DDDDDD",
    borderWidth:moderateScale(1),
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },

  text: {
    fontSize: moderateScale(15),
    color: '#222',
    flex:1
  },
});

export default Dropdown;