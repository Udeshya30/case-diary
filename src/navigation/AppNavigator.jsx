import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddCaseScreen } from "../screens/AddCaseScreen";
import { CaseDetailScreen } from "../screens/CaseDetailScreen";
import { DiaryEntryScreen } from "../screens/DiaryEntryScreen";
import { CurvedTabs } from "./CurvedTabBar";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={CurvedTabs} />
        <Stack.Screen name="CaseDetail" component={CaseDetailScreen} />
        <Stack.Screen name="DiaryEntry" component={DiaryEntryScreen} />
        <Stack.Screen name="EditCase" component={AddCaseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
