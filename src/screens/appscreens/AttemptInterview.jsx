import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useMicrophonePermission,
} from 'react-native-vision-camera';
import {Circle, Svg} from 'react-native-svg';
import BarBox from '../../../components/Bar';

const AttemptInterview = () => {
  const device = useCameraDevice('front');

  const cameraRef = useRef(null);

  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  const {
    hasPermission: hasMicrophonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const permissionsGranted =
    hasCameraPermission && hasMicrophonePermission;

  /*
   * Request camera + microphone permissions
   */
  const requestPermissions = async () => {
    try {
      const cameraPermission = await requestCameraPermission();
      const microphonePermission = await requestMicrophonePermission();

      console.log('Camera permission:', cameraPermission);
      console.log('Microphone permission:', microphonePermission);
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  /*
   * Recording timer
   */
  useEffect(() => {
    let interval;

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRecording]);

  /*
   * Format seconds into MM:SS
   */
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  /*
   * Start recording
   */
  const startRecording = () => {
    if (!cameraRef.current) {
      console.log('Camera ref is not ready');
      return;
    }

    if (isRecording) {
      return;
    }

    setRecordingTime(0);
    setIsRecording(true);

    try {
      cameraRef.current.startRecording({
        onRecordingFinished: video => {
          console.log('Recording finished');
          console.log('Video path:', video.path);

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

  /*
   * Stop recording
   */
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

  /*
   * Waiting for permissions
   */
  if (!permissionsGranted) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <View style={styles.permissionIconWrap}>
            <MaterialDesignIcons
              name="camera-off"
              size={moderateScale(36)}
              color="#7B61E0"
            />
          </View>

          <Text style={styles.permissionTitle}>
            Camera & Microphone Access
          </Text>

          <Text style={styles.permissionSubtitle}>
            We need access to your camera and mic to record your practice
            interview.
          </Text>

          <Pressable
            style={styles.permissionButton}
            onPress={requestPermissions}>
            <Text style={styles.permissionButtonText}>Allow Access</Text>
          </Pressable>
        </View>
      </ScreenWrapper>
    );
  }

  /*
   * Device not available
   */
  if (!device) {
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <MaterialDesignIcons
            name="camera-off"
            size={moderateScale(40)}
            color="#7B61E0"
          />

          <Text style={styles.permissionTitle}>
            Camera Not Available
          </Text>

          <Text style={styles.permissionSubtitle}>
            No front camera was found on this device.
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  /*
   * Main interview screen
   */
  return (
    <ScreenWrapper>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>

          {/* Back */}
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
              React Native Interview
            </Text>

            {isRecording && (
              <View style={styles.recordingContainer}>
                <Svg width={10} height={10}>
                  <Circle
                    cx="5"
                    cy="5"
                    r="5"
                    fill="red"
                  />
                </Svg>

                <Text style={styles.subtitle}>
                  Recording {formatTime(recordingTime)}
                </Text>
              </View>
            )}
          </View>

          {/* Stop button */}
          {isRecording && (
            <Pressable
              style={styles.stopbtncontainer}
              onPress={stopRecording}>

              <View style={styles.stopbtn}>
                <MaterialDesignIcons
                  name="stop"
                  size={20}
                  color="red"
                />

                <Text style={styles.stopText}>
                  Stop
                </Text>
              </View>

            </Pressable>
          )}
        </View>

        {/* Question progress */}
        <BarBox
          icon="help-circle"
          title="Question 3 of 10"
          percentage="30"
        />

        {/* Interview type */}
        <View style={styles.interviewtype}>
          <MaterialDesignIcons
            name="account"
            size={moderateScale(22)}
            color="black"
          />

          <Text style={styles.type}>
            Custom
          </Text>
        </View>

        {/* Camera */}
        <View style={styles.cameraContainer}>

          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            isActive={true}
            video={true}
            audio={true}
          />

          {/* Start recording button */}
          {!isRecording && (
            <View style={styles.startButtonContainer}>
              <Pressable
                style={styles.startButton}
                onPress={startRecording}>

                <MaterialDesignIcons
                  name="record"
                  size={moderateScale(24)}
                  color="white"
                />

                <Text style={styles.startButtonText}>
                  Start Recording
                </Text>

              </Pressable>
            </View>
          )}

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
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(28),
    borderRadius: moderateScale(24),
    elevation: 4,
  },

  permissionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    alignItems: 'center',
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#222',
  },

  recordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  subtitle: {
    fontSize: moderateScale(12),
    color: '#777',
    marginTop: verticalScale(2),
  },

  stopbtncontainer: {
    backgroundColor: 'white',
    borderRadius: moderateScale(12),
    padding: moderateScale(8),
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stopbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },

  stopText: {
    color: '#222',
    fontSize: moderateScale(12),
  },

  interviewtype: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#D1C9ED',
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(5),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(10),
  },

  type: {
    paddingLeft: scale(5),
  },

  cameraContainer: {
    height:verticalScale(300),
    overflow: 'hidden',
    borderRadius: moderateScale(12),
    position: 'relative',
  },

  camera: {
    flex: 1,
  },

  startButtonContainer: {
    position: 'absolute',
    bottom: verticalScale(25),
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7B61E0',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(25),
    borderRadius: moderateScale(30),
    elevation: 5,
  },

  startButtonText: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: scale(8),
  },
});

export default AttemptInterview;