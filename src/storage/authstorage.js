import * as Keychain from 'react-native-keychain';

export const saveTokens = async (accessToken, refreshToken) => {
  await Keychain.setGenericPassword('access', accessToken, { service: 'accessToken' });
  await Keychain.setGenericPassword('refresh', refreshToken, { service: 'refreshToken' });
};

export const getAccessToken = async () => {
  const creds = await Keychain.getGenericPassword({ service: 'accessToken' });
  return creds ? creds.password : null;
};

export const getRefreshToken = async () => {
  const creds = await Keychain.getGenericPassword({ service: 'refreshToken' });
  return creds ? creds.password : null;
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword({ service: 'accessToken' });
  await Keychain.resetGenericPassword({ service: 'refreshToken' });
};