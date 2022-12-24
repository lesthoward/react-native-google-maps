import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NativeStack from './navigators/NativeStack';
import { init } from './utils/db';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    init().then(() => {
      setIsAppReady(true);
    });
  }, []);

  useEffect(() => {
    if (!isAppReady) return;
    SplashScreen.hideAsync();
  }, [isAppReady]);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <NativeStack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
