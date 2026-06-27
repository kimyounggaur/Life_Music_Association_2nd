import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius } from '@/lib/theme';

type Props = {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  tone?: string;
  outline?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, icon, tone = colors.primary, outline = false, disabled = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        outline ? { backgroundColor: colors.surface, borderColor: tone, borderWidth: 1.4 } : { backgroundColor: disabled ? colors.primarySoft : tone },
        pressed && !disabled && styles.pressed,
      ]}
    >
      {icon}
      <Text style={[styles.label, { color: outline ? tone : colors.white }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radius.card,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
