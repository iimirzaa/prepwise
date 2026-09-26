import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import InterviewSettingContainer from '../../../components/CustomSetting';
import ScreenWrapper from '../../../components/ScreenWrapper';
import InterviewType from '../../../components/InterviewType';
import TargetRoleContainer from '../../../components/TargetRole';
import Dropdown from '../../../components/Dropdown';
import SkillsContainer from '../../../components/Skills';
import MyButton from '../../../components/Botton';
import EvaluationContainer from '../../../components/EvaluationInfo';
import UploadDocuments from '../../../components/QuestionSource';
import SetupSkeleton from '../../skeleton/setupskeleton';
import Loader from '../../../components/Loading';
import { pick, types } from '@react-native-documents/picker';
import { useAuth } from '../../Utils/authcontext';
import interviewHandler from '../../../handlers/interview.handler'; 
import {PrepwiseConstants} from '../../../constants/constants';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import Overview from '../../../components/InterviewOverview';

const SetupScreen = ({ navigation }) => {
  const [showDropdown, setDropdown] = useState(false);
  const [showexpDropdown, setexpDropdown] = useState(false);
  const [showdifDropdown, setdifDropdown] = useState(false);
  const [interviewType, setInterviewType] = useState('behavioural');
  const [selectedJob, setJob] = useState({ title: 'Software Engineer', value: 'software_engineer' });
  const [selectedExperience, setExperience] = useState({ title: 'Student', value: 'student' });
  const [selectedDifficulty, setDifficulty] = useState({ title: 'Easy', value: 'easy' });
  const [resume, setResume] = useState(null);
  const [JobDescription, setJobDescription] = useState(null);
  const [setupError,setSetupError]=useState('');
  const [skills,setSkills]=useState([
    'React Native',
    'JavaScript',
    'Node.js',
  ]);
  const [loading, setLoading] = useState(false);


  const { logout } = useAuth();


  const [status, setStatus] = useState('idle'); 
  const [statusMessage, setStatusMessage] = useState('');
  const MAX_SIZE=10*1024*1024;


  const boxRef = useRef(null);
  const [boxLayout, setBoxLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const measureBox = () => {
    if (boxRef.current) {
      boxRef.current.measureInWindow((x, y, width, height) => {
        setBoxLayout({ x, y, width, height });
      });
    }
  };

  const uploadResume = async () => {
    try {
      const [result] = await pick({ type: [types.pdf, types.doc, types.docx] });
     
      setResume(result);
    } catch (e) {
      console.log(e);
    }
  }

  const uploadJobDescription = async () => {
    try {
      const [result] = await pick({ type: [types.pdf, types.doc, types.docx] });
      
      setJobDescription(result);
    } catch (e) {
      console.log(e)
    }
  }

  const handleStartPress = async () => {
   
    setSetupError('');
   const formData = new FormData();

formData.append('interviewType', interviewType);          // must be hr | technical | viva | custom
formData.append('targetRole[title]', selectedJob.title);
formData.append('targetRole[value]', selectedJob.value);
formData.append('experience', selectedExperience.value);
formData.append('difficulty', selectedDifficulty.value);
formData.append('questionCount', String(10));

skills.forEach((skill) => formData.append('skills[]', skill));

// text fields first, files last
if (resume) {
  if(resume.size && resume.size>MAX_SIZE){
        setStatus("error");
        setStatusMessage("File is too large! Maximum Size is 10MB");
         setTimeout(() => {
                setStatus('idle');
                setResume(null);
            
            }, 3000);
            return;
        
      }
  formData.append('resume', {
    uri: resume.uri,
    name: resume.name,
    type: resume.type,
  });
}
if (JobDescription) {
  if(JobDescription.size && JobDescription.size>MAX_SIZE){
        setStatus("error");
        setStatusMessage("File is too large! Maximum Size is 10MB");
         setTimeout(() => {
                setStatus('idle');
                setJobDescription(null);
            
            }, 3000);
            return;
      }
  formData.append('jobDescription', {
    uri: JobDescription.uri,
    name: JobDescription.name,
    type: JobDescription.type,
  });
}

    try {
      await interviewHandler.handleGenerateQuestion(
        
         formData,
        
        {
          setStatus,
          setStatusMessage,
          measureBox,
          logout,
          onSuccess: (response) => navigation.replace('attempt', { questions: response?.data?.data }),
          
        }
      );
    } catch {

    }
  };

  const isBusy = status === 'loading' || status === 'success';

  return (
    <ScreenWrapper>
      {loading ? <SetupSkeleton /> :
        <View style={styles.container} ref={boxRef} onLayout={measureBox}>
          <View pointerEvents={isBusy ? "none" : "auto"} style={isBusy ? styles.disabledContent : null} >

            <View style={styles.header}>
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
            <Overview difficulty={selectedDifficulty.title} />
            <InterviewType onTypeChange={(type) => setInterviewType(type)}/>
            <View style={styles.targetRoleWrapper}>
              <TargetRoleContainer job={selectedJob} showDropdown={showDropdown} press={() => {
                setexpDropdown(false)
                setdifDropdown(false)
                setDropdown(prev => !prev)
              }} />
              {showDropdown && (
                <View style={styles.dropdownview}>
                  <Dropdown data={PrepwiseConstants.jobs} onSelect={(job) => setJob(job)} />
                </View>
              )}
            </View>
            <View style={styles.customsetting}>
              <InterviewSettingContainer selected={selectedExperience} icon={"speedometer"} title={"Experience"} showDropdown={showexpDropdown} press={() => {
                setdifDropdown(false)
                setDropdown(false)
                setexpDropdown(prev => !prev)
              }} />
              <InterviewSettingContainer selected={selectedDifficulty} icon={'signal-cellular-3'} title={'Difficulty'} showDropdown={showdifDropdown} press={() => {
                setexpDropdown(false)
                setDropdown(false)
                setdifDropdown(prev => !prev)
              }} />
              {showexpDropdown && (
                <View style={styles.dropdownview}>
                  <Dropdown data={PrepwiseConstants.experienceLevels} onSelect={(exp) => { setExperience(exp) }} />
                </View>
              )}
              {showdifDropdown && (
                <View style={styles.dropdownview}>
                  <Dropdown data={PrepwiseConstants.difficultyLevels} onSelect={(dif) => setDifficulty(dif)} />
                </View>
              )}
            </View>
            <SkillsContainer onSkillsChange={(skill) => setSkills(skill)}/>
            <UploadDocuments resume={resume} jobDescription={JobDescription} onResumePress={uploadResume} onJobDescriptionPress={uploadJobDescription} />
            <EvaluationContainer />

         

            <MyButton text={"Start Interview"} onPress={handleStartPress}></MyButton>
          </View>
        </View>
      }

      <Modal
        visible={status !== 'idle'}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View
          style={[
            styles.loadingOverlay,
            {
              top: boxLayout.y,
              left: boxLayout.x,
              width: boxLayout.width,
              height: boxLayout.height,
            },
          ]}
        >
          <Loader
            status={status === 'loading' ? 'loading' : status}
            title={
              status === 'loading' ? 'Generating your interview....' :
              status === 'success' ? 'Ready to start!' :
              'Setup failed'
            }
            subtitle={status === 'error' ? statusMessage : null}
          />
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(10)
  },
  targetRoleWrapper: {
    position: 'relative',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
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
    flex: 1,
    alignItems: "center"
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
  dropdownview: {
    position: 'absolute',
    top: verticalScale(55), 
    left: 0,
    width: '100%',
    zIndex: 1,
    elevation: 8,
  },
  customsetting: {
    width: "100%",
    flexDirection: "row",
    gap: 5
  },
  disabledContent: {
    opacity: 0.5,
  },
  loadingOverlay: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(12),
  },
  errorText: {
    color: 'red',
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(8),
  },
});

export default SetupScreen;