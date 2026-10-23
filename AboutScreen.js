import { View, Text } from 'react-native';
import { ui } from './Theme';

export default function AboutScreen() {
  return (
    <View>
      <View style={ui.card}>
        <Text style={ui.heading}>Hewwo :3 </Text>
        <Text style={ui.text}> This app is a individual project given by my professor for individual work. </Text>
      </View>
      <View style={ui.card}>
        <Text style={ui.heading}>Built with</Text>
        <Text style={ui.text}>React Native - Expo - JavaScript</Text>
      </View>
    </View>
  );
}