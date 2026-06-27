import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/lib/theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  bottomInset?: number;
};

export function Screen({ children, scroll = true, bottomInset = 28 }: Props) {
  const insets = useSafeAreaInsets();

  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + bottomInset }]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function Padded({ children }: { children: ReactNode }) {
  return <View style={styles.padded}>{children}</View>;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: 28,
  },
  padded: {
    paddingHorizontal: 20,
  },
});
