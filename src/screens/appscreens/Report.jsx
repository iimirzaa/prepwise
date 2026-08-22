import React from 'react';
import {View,StyleSheet} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import ReportHeader from '../../../components/Report Screen/ReportHeader';
import ScoreCard from '../../../components/Report Screen/ScoreCard';
const Report=()=>{
    return (
        <ScreenWrapper>
            <View style={styles.Container}>
             <ReportHeader />
             <ScoreCard />

            </View>

        </ScreenWrapper>

    );
}
const styles =StyleSheet.create({

    Container:{
        flex:1,
        width:"100%"
    }
})
export default Report;