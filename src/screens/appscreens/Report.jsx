import React from 'react';
import {View,StyleSheet} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import ReportHeader from '../../../components/Report Screen/ReportHeader';
import ScoreCard from '../../../components/Report Screen/ScoreCard';
import PerformaceCard from '../../../components/Report Screen/PerformanceCard';
import FeedbackCard from '../../../components/Report Screen/FeedbackCard';
import Breakdown from '../../../components/Breakdown';
import { scale } from 'react-native-size-matters';
const Report=()=>{
    return (
        <ScreenWrapper>
            <View style={styles.Container}>
             <ReportHeader />
             <ScoreCard />
             <PerformaceCard/>
             <Breakdown />
             <FeedbackCard />


            </View>

        </ScreenWrapper>

    );
}
const styles =StyleSheet.create({

    Container:{
        flex:1,
        width:"100%",
        paddingHorizontal:scale(10)
    }
})
export default Report;