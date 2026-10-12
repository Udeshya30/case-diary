import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AddCaseScreen } from "../screens/AddCaseScreen";
import { AllCasesScreen } from "../screens/AllCasesScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { colors } from "../theme/colors";
import { styles } from "./CurvedTabBar.styles";

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: ["home-outline", "home"],
  "All Cases": ["briefcase-outline", "briefcase"],
  "Add Case": ["add-circle-outline", "add-circle"],
  Profile: ["person-outline", "person"],
  Settings: ["settings-outline", "settings"]
};

const BAR_HEIGHT = 86;
const BAR_TOP = 18;
const BUBBLE_SIZE = 54;

export function CurvedTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MovingIslandTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="All Cases" component={AllCasesScreen} />
      <Tab.Screen name="Add Case" component={AddCaseScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function MovingIslandTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const [barWidth, setBarWidth] = useState(0);
  const tabCount = state.routes.length;

  const path = useMemo(() => {
    if (!barWidth) return "";
    return getBarPath(barWidth, state.index, tabCount);
  }, [barWidth, state.index, tabCount]);

  return (
    <View
      style={[styles.shell, { height: BAR_HEIGHT + Math.max(insets.bottom, 0) }]}
    >
      <View
        style={styles.shadow}
        onLayout={(event) => {
          setBarWidth(event.nativeEvent.layout.width);
        }}
      >
        {path ? (
          <Svg width="100%" height={BAR_HEIGHT} style={styles.svg}>
            <Path d={path} fill={colors.surface} stroke="#E8EEF5" strokeWidth={1} />
          </Svg>
        ) : null}

        <View style={styles.tabs}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const options = descriptors[route.key].options;
            const label = options.tabBarLabel ?? options.title ?? route.name;

            return (
              <TabButton
                key={route.key}
                label={label}
                routeName={route.name}
                focused={focused}
                onPress={() => {
                  const event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true
                  });

                  if (!focused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }}
                onLongPress={() => {
                  navigation.emit({
                    type: "tabLongPress",
                    target: route.key
                  });
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

function TabButton({ label, routeName, focused, onPress, onLongPress }) {
  const progress = useRef(new Animated.Value(focused ? 1 : 0)).current;
  const iconMotion = useRef(new Animated.Value(0)).current;
  const icon = focused ? tabIcons[routeName][1] : tabIcons[routeName][0];

  useEffect(() => {
    const progressAnimation = Animated.spring(progress, {
      toValue: focused ? 1 : 0,
      useNativeDriver: true,
      speed: 18,
      bounciness: 7
    });

    if (focused) {
      iconMotion.setValue(0);
      Animated.parallel([
        progressAnimation,
        Animated.timing(iconMotion, {
          toValue: 1,
          duration: 520,
          useNativeDriver: true
        })
      ]).start();
    } else {
      progressAnimation.start();
      iconMotion.setValue(0);
    }
  }, [focused, iconMotion, progress]);

  const bubbleTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -38]
  });
  const inactiveOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const activeOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });
  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06]
  });

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} onLongPress={onLongPress} style={styles.tab}>
      <Animated.View style={[styles.activeBubble, { opacity: activeOpacity, transform: [{ translateY: bubbleTranslate }, { scale }] }]}>
        <Animated.View style={[styles.activeIcon, getActiveIconAnimation(routeName, iconMotion)]}>
          <Ionicons name={icon} size={26} color={colors.primary} />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.inactiveIcon, { opacity: inactiveOpacity }]}>
        <Ionicons name={tabIcons[routeName][0]} size={23} color={colors.disabled} />
      </Animated.View>
      <Text numberOfLines={1} style={[styles.label, focused && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

function getActiveIconAnimation(routeName, motion) {
  if (routeName === "Settings") {
    return {
      transform: [
        {
          rotate: motion.interpolate({
            inputRange: [0, 0.45, 1],
            outputRange: ["-8deg", "8deg", "0deg"]
          })
        },
        {
          scale: motion.interpolate({
            inputRange: [0, 0.55, 1],
            outputRange: [0.94, 1.08, 1]
          })
        }
      ]
    };
  }

  if (routeName === "Add Case") {
    return {
      transform: [
        {
          scale: motion.interpolate({
            inputRange: [0, 0.55, 1],
            outputRange: [0.82, 1.2, 1]
          })
        },
        {
          rotate: motion.interpolate({
            inputRange: [0, 1],
            outputRange: ["-18deg", "0deg"]
          })
        }
      ]
    };
  }

  if (routeName === "Home") {
    return {
      transform: [
        {
          translateY: motion.interpolate({
            inputRange: [0, 0.55, 1],
            outputRange: [5, -3, 0]
          })
        }
      ]
    };
  }

  if (routeName === "All Cases") {
    return {
      transform: [
        {
          translateX: motion.interpolate({
            inputRange: [0, 0.35, 0.7, 1],
            outputRange: [-5, 3, -1, 0]
          })
        }
      ]
    };
  }

  return {
    transform: [
      {
        scale: motion.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0.9, 1.16, 1]
        })
      }
    ]
  };
}

function getBarPath(width, activeIndex, tabCount) {
  const height = BAR_HEIGHT;
  const top = BAR_TOP;
  const corner = 20;
  const tabWidth = width / tabCount;
  const center = tabWidth * activeIndex + tabWidth / 2;
  const notchHalf = BUBBLE_SIZE / 2 + 11;
  const notchLeft = Math.max(corner + 8, center - notchHalf);
  const notchRight = Math.min(width - corner - 8, center + notchHalf);
  const notchDepth = top + BUBBLE_SIZE / 2 + 3;

  return [
    `M ${corner} ${top}`,
    `L ${notchLeft} ${top}`,
    `C ${notchLeft + 14} ${top} ${center - BUBBLE_SIZE / 2 - 5} ${notchDepth} ${center} ${notchDepth}`,
    `C ${center + BUBBLE_SIZE / 2 + 5} ${notchDepth} ${notchRight - 14} ${top} ${notchRight} ${top}`,
    `L ${width - corner} ${top}`,
    `Q ${width} ${top} ${width} ${top + corner}`,
    `L ${width} ${height}`,
    `L 0 ${height}`,
    `L 0 ${top + corner}`,
    `Q 0 ${top} ${corner} ${top}`,
    "Z"
  ].join(" ");
}
