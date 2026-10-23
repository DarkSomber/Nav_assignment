import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import AboutScreen from "./AboutScreen";
import ProfileScreen from "./ProfileScreen";
import MinigameScreen from "./MinigameScreen";
import ContactsScreen from "./ContactScreen";
import EducationScreen from "./EducationScreen";
import { colors } from "./Theme";

// Order matters: Minigame must stay in the middle
const TABS = [
  { key: "About", icon: "i", Screen: AboutScreen },
  { key: "Profile", icon: "👤", Screen: ProfileScreen },
  { key: "Minigame", icon: "🟣", Screen: MinigameScreen },
  { key: "Contacts", icon: "☎️", Screen: ContactsScreen },
  { key: "Education", icon: "🎓", Screen: EducationScreen },
];
const INITIAL = "Minigame";
const ACTIVE_SCALE = 1.5;

export default function App() {
  const [tab, setTab] = useState(INITIAL);
  const [points, setPoints] = useState(100);
  const [ballCount, setBallCount] = useState(5);
  const scales = useRef(
    TABS.map((t) => new Animated.Value(t.key === INITIAL ? ACTIVE_SCALE : 1)),
  ).current;

  const select = (i) => {
    setTab(TABS[i].key);
    scales.forEach((v, j) =>
      Animated.spring(v, {
        toValue: j === i ? ACTIVE_SCALE : 1,
        useNativeDriver: true,
      }).start(),
    );
  };

  const { Screen } = TABS.find((t) => t.key === tab);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />

      {tab === "Minigame" ? (
        <Screen points={points} setPoints={setPoints} ballCount={ballCount} setBallCount={setBallCount} />
      ) : (
        <ScrollView contentContainerStyle={s.page}>
          <Text style={s.title}>{tab}</Text>
          <Screen />
        </ScrollView>
      )}

      <View style={s.bar}>
        <View style={s.line} />
        {TABS.map((t, i) => (
          <TouchableOpacity
            key={t.key}
            style={s.slot}
            onPress={() => select(i)}
            activeOpacity={0.8}
            accessibilityLabel={t.key}
          >
            <Animated.View
              style={[
                s.circle,
                tab === t.key && s.circleActive,
                { transform: [{ scale: scales[i] }] },
              ]}
            >
              <Text style={s.icon}>{t.icon}</Text>
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: { padding: 20 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 16,
    marginTop: 15,
  },
  bar: {
    height: 190,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  line: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    marginTop: -1.5,
    height: 3,
    backgroundColor: colors.primary,
  },
  slot: { flex: 1, alignItems: "center", justifyContent: "center" },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  circleActive: { backgroundColor: colors.primary, borderColor: colors.dark },
  icon: { fontSize: 20 },
});
