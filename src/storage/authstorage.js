import * as Keychain from 'react-native-keychain';
import { jwtDecode } from 'jwt-decode';

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


export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    return Date.now() >= exp * 1000; // exp is in seconds, Date.now() in ms
  } catch (e) {
    return true; // malformed/undecodable token = treat as expired
  }
};