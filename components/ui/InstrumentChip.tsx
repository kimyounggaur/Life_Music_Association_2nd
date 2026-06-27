import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { getInstrumentIcon } from '@/content/instruments';
import { colors, radius } from '@/lib/theme';

type Props = {
  name: string;
  variant?: 'subject' | 'player';
};

export function InstrumentChip({ name, variant = 'subject' }: Props) {
  return (
    <View style={styles.chip}>
      <Image source={getInstrumentIcon(name, variant)} accessibilityLabel={`${name} 아이콘`} contentFit="contain" style={styles.icon} />
      <Text style={styles.label}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.bgMint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
});
