import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={styles.wrapper}
        colors={['#14141F', '#0A0A14']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: moderateScale(20),
  },
});

export default ScreenWrapper;