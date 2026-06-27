import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, shadow } from '@/lib/theme';

export function Card({ children, accent }: { children: ReactNode; accent?: string }) {
  return (
    <View style={[styles.card, shadow.soft]}>
      {accent && <View style={[styles.accent, { backgroundColor: accent }]} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  accent: {
    height: 5,
  },
});
