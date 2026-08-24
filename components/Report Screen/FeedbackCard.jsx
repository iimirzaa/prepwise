import React from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { Scale } from 'lucide-react-native';
const FeedbackCard=()=>{
    return(
        <View style={styles.card}>
            <View>
                <Text style={styles.title}>
                    AI Feedback
                </Text>
            </View>
            <View style={styles.feedback}>
                <View style={styles.left}>
                    <Text style={styles.titleleft}>What You did well</Text>
                    <FeedbackLine icon={'check-circle-outline'} text={"Clear and relevant answers"} color={"#7EC151"}/>

                </View>
                <View style={styles.right}>
                      <Text style={styles.titleright}>What to Improve</Text>
                      <FeedbackLine icon={'alert-circle-outline'} text={'Too much filler words'}color={'#FF9137'}/>
;
                </View>

            </View>

        </View>

    );

}
const FeedbackLine=({icon,text,color})=>{
    return (
        <View style={styles.line}>
            <MaterialDesignIcons
                    name={icon}
                    size={moderateScale(14)}
                    color={color}
                   
                  />
                  <Text style={styles.fline}>
                    {text}
                  </Text>

        </View>

    );
}
const styles=StyleSheet.create({
    card:{
        backgroundColor:'white',
        marginVertical:verticalScale(5),
        elevation:6,
        borderRadius:moderateScale(12),
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(10),
        width:"100%"

    },
    title:{
        fontSize:moderateScale(14),
        fontWeight:"800"
    },
    feedback:{
        width:"100%",
        borderRadius:moderateScale(12),
        borderWidth:moderateScale(1),
        borderColor:"#EEEEEE",
        flexDirection:"row",
        paddingHorizontal:scale(5),
        paddingVertical:verticalScale(5)
        
    },
    left:{
        width:'50%',
        borderRightWidth:moderateScale(1),
        borderColor:"#EEEEEE",
        
        paddingVertical:verticalScale(5),
    },
    right:{
         width:'50%',
        paddingHorizontal:scale(5),
        paddingVertical:verticalScale(5)

    },
    titleleft:{
        color:"#7EC151",
        fontWeight:"600"

    },
    titleright:{
        color:'#FF9137',
        fontWeight:"600"

    },
    line:{
        flexDirection:"row",
        
        width:"100%",
        justifyContent:'flex-start',
        alignItems:"center"
    },
    fline:{
        fontSize:moderateScale(12),
        flex:1,
        marginLeft:scale(2)
    }
})
export default FeedbackCard;