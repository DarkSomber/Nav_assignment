import { View, Text } from 'react-native';
import { ui } from './Theme';

const EDUCATION = [
  { school: 'Technological Institute of the Philippines', program: 'Bachelor of Science in Computer Science ', years: '2025 – Present' },
  { school: 'Jesus Dela Peña National Highschool', program: 'ICT Strand', years: '2024 – 2025' },
];

export default function EducationScreen() {
  return (
    <View>
      {EDUCATION.map((e) => (
        <View key={e.school} style={ui.card}>
          <Text style={ui.heading}>{e.school}</Text>
          <Text style={ui.text}>{e.program}</Text>
          <Text style={ui.text}>{e.years}</Text>
        </View>
      ))}
    </View>
  );
}