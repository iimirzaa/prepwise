import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const UploadDocuments = ({
  resume,
  jobDescription,
  onResumePress,
  onJobDescriptionPress,
}) => {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            Upload Documents
          </Text>

          <Text style={styles.subtitle}>
            Upload at least one document to personalize your interview
          </Text>
        </View>

        <View style={styles.requiredBadge}>
          <Text style={styles.requiredText}>
            Required
          </Text>
        </View>
      </View>

      {/* Resume */}
      <Pressable
        style={[
          styles.uploadBox,
          resume && styles.selectedBox,
        ]}
        onPress={onResumePress}>

        <View style={styles.iconContainer}>
          <MaterialDesignIcons
            name={resume ? 'file-check-outline' : 'file-account-outline'}
            size={moderateScale(23)}
            color="#6F49F6"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Resume / CV
          </Text>

          <Text style={styles.description}>
            {resume ? resume.name : 'Upload your resume'}
          </Text>
        </View>

        <MaterialDesignIcons
          name={resume ? 'check-circle' : 'plus-circle-outline'}
          size={moderateScale(21)}
          color="#6F49F6"
        />

      </Pressable>

      {/* OR */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Job Description */}
      <Pressable
        style={[
          styles.uploadBox,
          jobDescription && styles.selectedBox,
        ]}
        onPress={onJobDescriptionPress}>

        <View style={styles.iconContainer}>
          <MaterialDesignIcons
            name={
              jobDescription
                ? 'file-check-outline'
                : 'file-document-outline'
            }
            size={moderateScale(23)}
            color="#6F49F6"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Job Description
          </Text>

          <Text style={styles.description}>
            {jobDescription
              ? jobDescription.name
              : 'Upload the job description'}
          </Text>
        </View>

        <MaterialDesignIcons
          name={
            jobDescription
              ? 'check-circle'
              : 'plus-circle-outline'
          }
          size={moderateScale(21)}
          color="#6F49F6"
        />

      </Pressable>

      {/* Both optional */}
      <Text style={styles.bottomText}>
        You can upload both for better personalized questions
      </Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),

    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),

    marginVertical: verticalScale(5),

    elevation: 6,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  headingContainer: {
    flex: 1,
  },

  heading: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#252525',
  },

  subtitle: {
    fontSize: moderateScale(10),
    color: '#888',
    marginTop: verticalScale(3),
  },

  requiredBadge: {
    backgroundColor: '#FFF1F1',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(10),
    marginLeft: scale(5),
  },

  requiredText: {
    color: '#D9534F',
    fontSize: moderateScale(9),
    fontWeight: '600',
  },

  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FAF9FF',

    borderWidth: 1,
    borderColor: '#E5E0FF',

    borderRadius: moderateScale(10),

    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(9),

    marginTop: verticalScale(10),
  },

  selectedBox: {
    borderColor: '#6F49F6',
    backgroundColor: '#F7F4FF',
  },

  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),

    borderRadius: moderateScale(10),

    backgroundColor: '#EEE9FF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginLeft: scale(10),
  },

  title: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#2C2C2C',
  },

  description: {
    fontSize: moderateScale(9.5),
    color: '#888',
    marginTop: verticalScale(2),
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(3),
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  orText: {
    fontSize: moderateScale(9),
    color: '#999',
    marginHorizontal: scale(8),
    fontWeight: '600',
  },

  bottomText: {
    textAlign: 'center',
    fontSize: moderateScale(9),
    color: '#999',
    marginTop: verticalScale(8),
  },
});

export default UploadDocuments;