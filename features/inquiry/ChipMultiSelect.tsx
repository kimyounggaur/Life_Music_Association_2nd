import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tapLight } from '@/lib/haptics';
import { colors, radius } from '@/lib/theme';

type Props = {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function ChipMultiSelect({ options, value, onChange }: Props) {
  const toggle = (item: string) => {
    tapLight();
    onChange(value.includes(item) ? value.filter((entry) => entry !== item) : [...value, item]);
  };

  return (
    <View style={styles.wrap}>
      {options.map((option) => {
        const active = value.includes(option);
        return (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${option} ${active ? '선택 해제' : '선택'}`}
            key={option}
            onPress={() => toggle(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 38,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  chipActive: {
    backgroundColor: colors.bgMint,
    borderColor: colors.primary,
  },
  label: {
    color: colors.inkSoft,
    fontWeight: '700',
    fontSize: 14,
  },
  labelActive: {
    color: colors.primaryDeep,
  },
});
