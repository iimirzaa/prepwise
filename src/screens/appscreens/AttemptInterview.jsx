import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {Camera, useCameraDevice, useCameraPermission, useMicrophonePermission} from 'react-native-vision-camera';
import BarBox from '../../../components/Bar';
import InterviewHeader from '../../../components/InterviewHeader';
import QuestionCard from '../../../components/Questioncard';
import RecordingWaveform from '../../../components/Recordingwaveform';
import MetricsRow from '../../../components/Metricsrow';
import TipsCard from '../../../components/Tipscard';
import BottomControls from '../../../components/Bottomcontrols';

const TOTAL_QUESTIONS = 10;

const AttemptInterview = ({navigation}) => {
  const [cameraPosition, setCameraPosition] = useState('front');
  const device = useCameraDevice(cameraPosition);

  const cameraRef = useRef(null);

  const {hasPermission: hasCameraPermission, requestPermission: requestCameraPermission} =
    useCameraPermission();
  const {hasPermission: hasMicrophonePermission, requestPermission: requestMicrophonePermission} =
    useMicrophonePermission();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(3);


  const [metrics, setMetrics] = useState({
    eyeContact: 81,
    eyeContactDelta: 6,
    speakingPace: 138,
    speakingPaceDelta: 12,
    fillerWords: 2,
    fillerWordsDelta: -1,
    confidence: 'Good',
    clarity: 'Good',
  });

  const permissionsGranted = hasCameraPermission && hasMicrophonePermission;

  const requestPermissions = async () => {
    try {
      await requestCameraPermission();
      await requestMicrophonePermission();
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  useEffect(() => {
    let interval;

    if (isRecording) {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    }

    return () => interval && clearInterval(interval);
  }, [isRecording]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const startRecording = () => {
    if (!cameraRef.current || isRecording) {
      return;
    }

    setRecordingTime(0);
    setIsRecording(true);

    try {
      cameraRef.current.startRecording({
        onRecordingFinished: video => {
          console.log('Recording finished:', video.path);
          setIsRecording(false);
        },
        onRecordingError: error => {
          console.error('Recording error:', error);
          setIsRecording(false);
        },
      });
    } catch (error) {
      console.error('Start recording error:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!cameraRef.current || !isRecording) {
      return;
    }

    try {
      await cameraRef.current.stopRecording();
    } catch (error) {
      console.error('Stop recording error:', error);
      setIsRecording(false);
    }
  };

  const handleToggleRecord = () => (isRecording ? stopRecording() : startRecording());

  const handleFlipCamera = () => setCameraPosition(prev => (prev === 'front' ? 'back' : 'front'));

  const handleSkip = () => {
    if (isRecording) {
      stopRecording();
    }
    setQuestionIndex(prev => Math.min(prev + 1, TOTAL_QUESTIONS));
  };

  const handleEndInterview = () => {
    if (isRecording) {
      stopRecording();
    }
    navigation.navigate('Home');
  };

  const handleHint = () => {
   
  };

  if (!permissionsGranted) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <View style={styles.permissionIconWrap}>
            <MaterialDesignIcons name="camera-off" size={moderateScale(36)} color="#7B61E0" />
          </View>

          <Text style={styles.permissionTitle}>Camera & Microphone Access</Text>

          <Text style={styles.permissionSubtitle}>
            We need access to your camera and mic to record your practice interview.
          </Text>

          <Text style={styles.permissionButton} onPress={requestPermissions}>
            Allow Access
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (!device) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <MaterialDesignIcons name="camera-off" size={moderateScale(40)} color="#7B61E0" />
          <Text style={styles.permissionTitle}>Camera Not Available</Text>
          <Text style={styles.permissionSubtitle}>No {cameraPosition} camera was found on this device.</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <InterviewHeader
          title="Mixed Interview"
          isRecording={isRecording}
          recordingTime={formatTime(recordingTime)}
          onBack={() => navigation?.goBack?.()}
          onEnd={handleEndInterview}
        />

        <View style={styles.progressWrap}>
          <BarBox
            icon="help-circle"
            title={`Question ${questionIndex} of ${TOTAL_QUESTIONS}`}
            percentage={String(Math.round((questionIndex / TOTAL_QUESTIONS) * 100))}
          />
        </View>

        <QuestionCard type="Behavioral" question="Tell me about a time you faced a challenge in a project. How did you handle it and what was the result?" />

        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={true}
            video={true}
            audio={true}
          />

          <RecordingWaveform isRecording={isRecording} onFlipCamera={handleFlipCamera} />
        </View>

        <View style={styles.metricsWrap}>
          <MetricsRow metrics={metrics} />
        </View>

        <View style={styles.tipsWrap}>
          <TipsCard onViewExample={() => {}} />
        </View>

        <View style={styles.controlsWrap}>
          <BottomControls
            isRecording={isRecording}
            onSkip={handleSkip}
            onToggleRecord={handleToggleRecord}
            onHint={handleHint}
          />
        </View>

        <View style={styles.footerRow}>
          <MaterialDesignIcons name="lock-outline" size={moderateScale(11)} color="#999" />
          <Text style={styles.footerText}>Your answers are recorded & analyzed securely</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  centerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(30),
  },
  permissionIconWrap: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    backgroundColor: '#EFEAFB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  permissionTitle: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: '#222',
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: moderateScale(13),
    color: '#777',
    textAlign: 'center',
    lineHeight: moderateScale(18),
    marginBottom: verticalScale(20),
  },
  permissionButton: {
    backgroundColor: '#7B61E0',
    color: 'white',
    fontWeight: '600',
    fontSize: moderateScale(14),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(28),
    borderRadius: moderateScale(24),
    overflow: 'hidden',
  },
  progressWrap: {
    marginTop: verticalScale(10),
  },
  cameraContainer: {
    height: verticalScale(230),
    borderRadius: moderateScale(14),
    overflow: 'hidden',
    marginTop: verticalScale(10),
  },
  camera: {
    flex: 1,
  },
  metricsWrap: {
    marginTop: verticalScale(10),
  },
  tipsWrap: {
    marginTop: verticalScale(10),
  },
  controlsWrap: {
    marginTop: verticalScale(14),
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(6),
  },
  footerText: {
    fontSize: moderateScale(10),
    color: '#999',
    marginLeft: scale(4),
  },
});

export default AttemptInterview;