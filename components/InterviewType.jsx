import React ,{useState}from 'react';
import {View,StyleSheet,Text} from 'react-native';
import { moderateScale,scale, verticalScale } from 'react-native-size-matters';
import IChip from './InterviewTypeChip';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { PrepwiseConstants } from '../constants/constants';
const InterviewType=({onTypeChange})=>{
    const [selectedType, setSelectedType] = useState('behavioural');
      const handleTypeChange = (type) => {
    setSelectedType(type);

    // Send selected type to parent
    onTypeChange(type);
  };
   



    return(
        <View style={styles.container}>
            <View style={styles.headingbox}>
                <View style={styles.icon}>
                <MaterialDesignIcons
                          name='account-outline'
                          size={moderateScale(15)}
                          color="#6f49f6"
                        />
                        </View>
                <Text style={styles.heading}>Interview Type</Text>
                
            </View>
            
            <View style={styles.overviewchips}>
                
        {PrepwiseConstants.types.map(item => (
          <IChip
            key={item.id}
            icon={item.icon}
            title={item.title}
            selected={selectedType === item.id}
            onPress={() => handleTypeChange(item.id)}
          />
        ))}
                
                
            </View>

        </View>

    );

}
const styles=StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:"white",
        elevation:6,
        paddingVertical: moderateScale(10),
        paddingHorizontal: moderateScale(12),
        marginVertical:moderateScale(5),
        borderRadius:moderateScale(12),
    },
     icon: {
    width: moderateScale(28),
    height: moderateScale(28),

    borderRadius: moderateScale(12),

    backgroundColor: '#C9CAF7',

    justifyContent: 'center',
    alignItems: 'center',

  },
    headingbox:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        marginBottom:verticalScale(5)
        

    },
    heading:{
    fontWeight:"600",
    fontSize:moderateScale(14),
    paddingLeft:scale(5)
    },
    overviewchips:{
        flexDirection:"row",
        gap:scale(8)
        
    }

})
export default InterviewType;