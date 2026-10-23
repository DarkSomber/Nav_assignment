import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#F5F0FF',
  primary: '#7C3AED',
  dark: '#4C1D95',
  mid: '#A78BFA',
  light: '#DDD6FE',
  text: '#2E1065',
  white: '#FFFFFF',
};

export const ui = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: colors.light },
  heading: { fontSize: 18, fontWeight: '600', color: colors.primary, marginBottom: 6 },
  text: { color: colors.text, fontSize: 15, lineHeight: 22 },
});