import React, { useState } from 'react';
import {
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ScreenWrapper from '../../../components/ScreenWrapper';
import BackBotton from '../../../components/BackButton';
import {
  moderateScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';

import { userService } from '../../services/user.service';
const pickerOptions = {
  mediaType: 'photo',
  quality: 0.8,
  maxWidth: 1080,
  maxHeight: 1080,
  saveToPhotos: true,
};

const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') return true;
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
    {
      title: 'Camera access',
      message: 'We need your camera to take a profile photo.',
      buttonPositive: 'OK',
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const handleResult = (result) => {
  if (result.didCancel) return null;
  if (result.errorCode) throw new Error(result.errorMessage || result.errorCode);
  return result.assets?.[0] ?? null;
};

const takePhoto = async () => {
  const ok = await requestCameraPermission();
  if (!ok) throw new Error('Camera permission denied');
  return handleResult(await launchCamera(pickerOptions));
};

const pickFromGallery = async () =>
  handleResult(await launchImageLibrary({ ...pickerOptions, selectionLimit: 1 }));


const uploadAvatar = async (asset,url) => {
  if (!asset?.uri) {
    throw new Error('No image selected');
  }

  const form = new FormData();
  form.append('image', {
    uri: asset.uri,
    type: asset.type || 'image/jpeg',
    name: asset.fileName || `upload-${Date.now()}.jpg`,
  });

  try {
    const data = await userService.uploadProfilePic(form);
    return data; // { url, publicId }
  } catch (err) {
    setPreview(url);
    const status = err.response?.status;
    const serverMessage = err.response?.data?.message;

    if (status === 400) {
      throw new Error(serverMessage || 'That image could not be uploaded.');
    }
    if (status === 401) {
      throw new Error('Your session expired. Please log in again.');
    }
    if (status === 413) {
      throw new Error('Image is too large. Try a smaller one.');
    }
    if (!err.response) {
      throw new Error('Network error — check your connection and try again.');
    }
    throw new Error(serverMessage || 'Upload failed. Please try again.');
  }
};

const ProfileInfo = ({ route }) => {
  const {userEmail,fullname,url}=route.params;
  
  const [fullName, setFullName] = useState(fullname);
  const [email, setEmail] = useState(userEmail);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [preview, setPreview] = useState(url);
  const [busy, setBusy] = useState(false);

  const handlePick = async (fn,url) => {
    setSheetVisible(false);
    try {
      const asset = await fn();
      if (!asset) return;
      setPreview(asset.uri);
      setBusy(true);
      const data = await uploadAvatar(asset,url);

    } catch (e) {
      console.warn(e.message);
    } finally {
      setBusy(false);
    }
  };

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
          <Pressable
            onPress={() => setSheetVisible(true)}
            style={styles.avatar}
          >
            {preview && (
              <Image source={{ uri: preview }} style={styles.avatarImage} />
            )}
            {busy && (
              <ActivityIndicator style={StyleSheet.absoluteFill} />
            )}
          </Pressable>

          <Pressable
            style={styles.changePhotoButton}
            onPress={() => setSheetVisible(true)}
            disabled={busy}
          >
            <Text style={styles.changePhotoText}>
              {preview ? 'Change Photo' : 'Add Photo'}
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

        {/* Source Sheet */}
        <Modal
          visible={sheetVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setSheetVisible(false)}
        >
          <Pressable
            style={styles.backdrop}
            onPress={() => setSheetVisible(false)}
          />
          <View style={styles.sheet}>
            <Pressable style={styles.sheetRow} onPress={() => handlePick(takePhoto)}>
              <Text style={styles.sheetRowText}>Take Photo</Text>
            </Pressable>
            <Pressable style={styles.sheetRow} onPress={() => handlePick(pickFromGallery)}>
              <Text style={styles.sheetRowText}>Choose from Library</Text>
            </Pressable>
            <Pressable
              style={[styles.sheetRow, styles.sheetCancel]}
              onPress={() => setSheetVisible(false)}
            >
              <Text style={[styles.sheetRowText, { color: '#d00' }]}>Cancel</Text>
            </Pressable>
          </View>
        </Modal>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: scale(10),
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
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
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
    marginBottom: scale(3),
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

  /* Source sheet */
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#fff',
    paddingBottom: verticalScale(32),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
  },
  sheetRow: {
    padding: scale(18),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eee',
  },
  sheetCancel: {
    borderBottomWidth: 0,
  },
  sheetRowText: {
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
});

export default ProfileInfo;