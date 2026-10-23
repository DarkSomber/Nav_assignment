import { View, Text, StyleSheet } from 'react-native';
import { colors, ui } from './Theme';

const SKILLS = ['Java', 'Python', 'JavaScript', 'React Native', 'C++ / C#', 'Lua', 'GODOT script' ];

export default function ProfileScreen() {
  return (
    <View>
      <View style={s.avatar}><Text style={s.initial}> J </Text></View>
      <View style={ui.card}>
        <Text style={ui.heading}> James T. Pala s</Text>
        <Text style={ui.text}> Student / Game Developer </Text>
      </View>
      <View style={ui.card}>
        <Text style={ui.heading}> Programming Languages Skills </Text>
        <View style={s.tags}>
          {SKILLS.map((k) => (
            <Text key={k} style={s.tag}>{k}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 16 },
  initial: { color: colors.white, fontSize: 40, fontWeight: 'bold' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { backgroundColor: colors.light, color: colors.dark, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, overflow: 'hidden' },
});