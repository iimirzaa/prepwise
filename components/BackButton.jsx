import React from "react";
import { Pressable,StyleSheet } from "react-native";
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { moderateScale ,scale,verticalScale} from "react-native-size-matters";
const BackBotton=({onBack})=>{
    return (
          <Pressable style={styles.backButton} onPress={onBack}>
        <MaterialDesignIcons name="arrow-left" size={moderateScale(20)} color="black" />
      </Pressable>
    )
}
const styles=StyleSheet.create({
      backButton: {
    height: moderateScale(32),
    width: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

})
export default BackBotton;