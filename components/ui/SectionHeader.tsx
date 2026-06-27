import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/lib/theme';

type Props = {
  eyebrow?: string;
  title: string;
  caption?: string;
};

export function SectionHeader({ eyebrow, title, caption }: Props) {
  return (
    <View style={styles.wrap}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text style={styles.title}>{title}</Text>
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 12,
  },
  eyebrow: {
    color: colors.primaryDeep,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  title: {
    color: colors.ink,
    fontSize: 25,
    lineHeight: 32,
    fontWeight: '900',
    fontFamily: fonts.sans,
  },
  caption: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
});
