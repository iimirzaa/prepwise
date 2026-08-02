import React from 'react';
import { StyleSheet, View, Dimensions ,ScrollView} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get("window");

const d = `
M0 100
C${width * 0.25} 20 ${width * 0.5} 30 ${width * 0.75} 60
C${width * 0.875} 70 ${width * 0.95} 80 ${width} 60
L${width} 0
L0 0
Z
`;

const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <View
        style={styles.wrapper}
      >

        {children}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
 
});

export default ScreenWrapper;