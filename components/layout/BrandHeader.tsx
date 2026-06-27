import { useRouter } from 'expo-router';
import { ArrowLeft, Music2, Phone, X } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { site } from '@/content/site';
import { callAssociation } from '@/lib/contact';
import { colors, fonts } from '@/lib/theme';

type Props = {
  title?: string;
  back?: boolean;
  close?: boolean;
};

export function BrandHeader({ title, back = false, close = false }: Props) {
  const router = useRouter();
  const Icon = close ? X : ArrowLeft;

  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        {back || close ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={close ? '닫기' : '뒤로가기'}
            hitSlop={8}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
            style={styles.iconButton}
          >
            <Icon size={20} color={colors.ink} />
          </Pressable>
        ) : (
          <View style={styles.mark} accessibilityElementsHidden>
            <Music2 size={17} color={colors.white} />
          </View>
        )}
        <View style={styles.titleBlock}>
          <Text style={styles.brandKo} numberOfLines={1}>
            {title ?? site.name}
          </Text>
          <Text style={styles.brandEn} numberOfLines={1}>
            Korea Music Lifestyle Instructors Assoc.
          </Text>
        </View>
      </View>

      {!close && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="전화 문의 010-5655-9152"
          hitSlop={8}
          onPress={callAssociation}
          style={({ pressed }) => [styles.callButton, pressed && styles.pressed]}
        >
          <Phone size={18} color={colors.white} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 58,
    paddingHorizontal: 16,
    backgroundColor: colors.bg,
    borderBottomColor: colors.line,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mark: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  brandKo: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
    fontFamily: fonts.sans,
  },
  brandEn: {
    color: colors.inkSoft,
    fontSize: 10,
    fontStyle: 'italic',
    fontFamily: fonts.display,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.82,
  },
});
