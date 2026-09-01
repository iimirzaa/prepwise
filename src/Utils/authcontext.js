import React, { createContext, useContext, useEffect, useState } from 'react';
import { getRefreshToken,isTokenExpired ,clearTokens} from '../storage/authstorage'; // wherever saveTokens lives — adjust path

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
  (async () => {
    const refreshToken = await getRefreshToken();
    if (refreshToken && !isTokenExpired(refreshToken)) {
      setIsLoggedIn(true);
    } else {
      await clearTokens(); // clean up a dead/expired refresh token
      setIsLoggedIn(false);
    }
    setIsReady(true);
  })();
}, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);