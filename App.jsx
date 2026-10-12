import "react-native-gesture-handler";

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { initDatabase } from "./src/database/database";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { LoaderScreen } from "./src/screens/LoaderScreen";

export default function App() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    initDatabase()
      .then(() => setReady(true))
      .catch((err) => {
        if (__DEV__) console.error(err);
        setError("Case Diary could not prepare local storage. Please restart the app.");
      });
  }, []);

  if (error) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LoaderScreen error={error} />
      </SafeAreaProvider>
    );
  }

  if (!ready) {
    return (
      <SafeAreaProvider>
        <StatusBar style="light" />
        <LoaderScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
