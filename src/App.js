import React, {useEffect} from 'react';
import {AppState, StyleSheet} from 'react-native';
import {FontSize} from './constants/Fonts';
import Toast, {
  BaseToast,
  ErrorToast,
  SuccessToast,
} from 'react-native-toast-message';
import {Provider, useDispatch} from 'react-redux';
import ApplicationNavigator from './navigators/ApplicationNavigator';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor, store} from './reduxStore';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import Colors from './constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearJobData} from './features/Jobs/JobSlice';

const App = () => {
  const toastConfig = {
    success: props => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: FontSize.regularVariant,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: FontSize.small,
          fontWeight: '400',
        }}
      />
    ),
    error: props => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: FontSize.regularVariant,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: FontSize.small,
          fontWeight: '400',
        }}
      />
    ),
    info: props => {
      <BaseToast
        {...props}
        style={{borderLeftColor: Colors.info}}
        text1Style={{
          fontSize: FontSize.regularVariant,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: FontSize.small,
          fontWeight: '400',
        }}
      />;
    },
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.white}}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* <SplashScreenLocal /> */}
            <ApplicationNavigator />
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
