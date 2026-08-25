import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import BackBotton from '../../../components/BackButton';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

const ProfileInfo = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScreenWrapper>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.left}>
            <BackBotton />
          </View>

          <Text style={styles.headerTitle}>
            Profile Information
          </Text>

          <Pressable style={styles.saveButton}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>

        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar} />

          <Pressable style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>
              Change Photo
            </Text>
          </Pressable>
        </View>

        {/* Form */}
        <View style={styles.form}>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              style={styles.input}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

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

  /* Header */
  header: {
    height: verticalScale(55),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  left: {
    width: scale(70),
    alignItems: 'flex-start',
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: moderateScale(17),
    fontWeight: '600',
  },

  saveButton: {
    width: scale(55),
    height: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: '#764ba2',
  },

  /* Avatar */
  avatarWrapper: {
    marginTop: verticalScale(25),
    alignItems: 'center',
    width: '100%',
  },

  avatar: {
    height: scale(120),
    width: scale(120),
    borderRadius: scale(60),
    backgroundColor: '#E5E5E5',
    borderWidth: 2,
    borderColor: '#764ba2',
  },

  changePhotoButton: {
    marginTop: verticalScale(12),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
  },

  changePhotoText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#764ba2',
  },

  /* Form */
  form: {
    width: '100%',
    paddingHorizontal: scale(10),
    marginTop: verticalScale(20),
  },

  inputContainer: {
    marginBottom: verticalScale(5),
  },

  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
    marginBottom:scale(3)
   
  },

  input: {
    width: '100%',
    height: verticalScale(35),
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(14),
    fontSize: moderateScale(14),
    color: '#222',
    backgroundColor: '#FAFAFA',
  },
});

export default ProfileInfo;