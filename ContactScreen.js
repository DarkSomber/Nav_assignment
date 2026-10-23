import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { colors, ui } from './Theme';

const LINKS = [
  { label: 'Email', value: 'jamespalas19@gmail.com', url: 'mailto:jamespalas19@gmail.com' },
  { label: 'GitHub', value: 'github.com/DarkSomber', url: 'https://github.com/DarkSomber' },
  { label: 'Phone', value: '+63 9692131752' },
];

export default function ContactsScreen() {
  return (
    <View>
      {LINKS.map((l) => (
        <TouchableOpacity key={l.label} style={ui.card} onPress={() => Linking.openURL(l.url)}>
          <Text style={ui.heading}>{l.label}</Text>
          <Text style={[ui.text, { color: colors.primary }]}>{l.value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}