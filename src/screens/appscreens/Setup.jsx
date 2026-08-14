import React ,{ useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

import InterviewSettingContainer from '../../../components/CustomSetting';
import ScreenWrapper from '../../../components/ScreenWrapper';
import InterviewType from '../../../components/InterviewType';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import TargetRoleContainer from '../../../components/TargetRole';
import Dropdown from '../../../components/Dropdown';
const jobs = [
  { title: 'Software Engineer', value: 'software_engineer' },
  { title: 'Frontend Developer', value: 'frontend_developer' },
  { title: 'Backend Developer', value: 'backend_developer' },
  { title: 'Full Stack Developer', value: 'full_stack_developer' },
  { title: 'Mobile App Developer', value: 'mobile_app_developer' },
  { title: 'React Native Developer', value: 'react_native_developer' },
  { title: 'Flutter Developer', value: 'flutter_developer' },
  { title: 'UI/UX Designer', value: 'ui_ux_designer' },
  { title: 'Graphic Designer', value: 'graphic_designer' },
  { title: 'Data Analyst', value: 'data_analyst' },
  { title: 'Data Scientist', value: 'data_scientist' },
  { title: 'Machine Learning Engineer', value: 'machine_learning_engineer' },
  { title: 'AI Engineer', value: 'ai_engineer' },
  { title: 'DevOps Engineer', value: 'devops_engineer' },
  { title: 'Cloud Engineer', value: 'cloud_engineer' },
  { title: 'Cybersecurity Analyst', value: 'cybersecurity_analyst' },
  { title: 'QA Engineer', value: 'qa_engineer' },
  { title: 'Software Tester', value: 'software_tester' },
  { title: 'Project Manager', value: 'project_manager' },
  { title: 'Product Manager', value: 'product_manager' },
  { title: 'Business Analyst', value: 'business_analyst' },
  { title: 'Marketing Manager', value: 'marketing_manager' },
  { title: 'Sales Representative', value: 'sales_representative' },
  { title: 'Customer Support Representative', value: 'customer_support' },
  { title: 'HR Manager', value: 'hr_manager' },
  { title: 'Accountant', value: 'accountant' },
  { title: 'Financial Analyst', value: 'financial_analyst' },
  { title: 'Teacher', value: 'teacher' },
  { title: 'Content Writer', value: 'content_writer' },
  { title: 'Social Media Manager', value: 'social_media_manager' },
];

import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Overview from '../../../components/InterviewOverview';
const SetupScreen = () => {
  const [showDropdown, setDropdown] = useState(false);
  const [selectedJob,setJob]=useState('');
  return (
    <ScreenWrapper>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          

          {/* Back Button */}
          <Pressable style={styles.backButton}>
            <MaterialDesignIcons
              name="arrow-left"
              size={moderateScale(22)}
              color="black"
            />
          </Pressable>
          

          {/* Title */}
          <View style={styles.titleBox}>
            <Text style={styles.title}>
              Let's start your Interview
            </Text>

            <Text style={styles.subtitle}>
              Review your setting before we begin!
            </Text>
          </View>

        </View>
        <Overview/>
        <InterviewType/>
        <View style={styles.targetRoleWrapper}>
        <TargetRoleContainer job={selectedJob} showDropdown={showDropdown}press={()=>setDropdown(prev => !prev)}/>
        {showDropdown &&(
                        <View style={styles.dropdownview}>
                        <Dropdown data={jobs} onSelect={(job)=>setJob(job)}/>
                    </View>
                    )}

        </View>
        <View style={styles.customsetting}>
         <InterviewSettingContainer/>
         <InterviewSettingContainer/>
        </View>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width:'100%'
    
  },
   targetRoleWrapper: {
    position: 'relative',
  // zIndex: 9999,
  // elevation: 9999,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"flex-start",
  },

  backButton: {
    height: moderateScale(30),
    width: moderateScale(30),

    borderRadius: moderateScale(15),

    backgroundColor: 'white',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  titleBox: {
    marginLeft: scale(12),
    flex:1,
    alignItems:"center"

  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: moderateScale(12),
    color: '#777',
    marginTop: verticalScale(2),
  },
  dropdownview:{
    
     position: 'absolute',
  top: verticalScale(55), // adjust according to TargetRole height
  left: 0,
  width: '100%',
  zIndex: 1,
  elevation: 8,
  
    },
    customsetting:{
      width:"100%",
      flexDirection:"row",
      gap:5
    }


});

export default SetupScreen;