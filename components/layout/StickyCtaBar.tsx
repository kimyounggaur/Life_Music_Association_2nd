import { useRouter } from 'expo-router';
import { MessageCircle, Phone } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { getCourseById } from '@/content/courses';
import { callAssociation, openCafe } from '@/lib/contact';
import { colors } from '@/lib/theme';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

type Props = {
  courseId?: string;
  contactParams?: Record<string, string>;
};

export function StickyCtaBar({ courseId, contactParams }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const tone = getCourseById(courseId)?.color ?? colors.primary;

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom + 12 }]}>
      <PrimaryButton label="전화 문의" tone={tone} onPress={callAssociation} icon={<Phone size={18} color={colors.white} />} />
      <PrimaryButton
        label="문의 폼"
        tone={tone}
        outline
        onPress={() => router.push({ pathname: '/contact', params: contactParams ?? (courseId ? { course: courseId } : {}) })}
        icon={<MessageCircle size={18} color={tone} />}
      />
      <PrimaryButton label="카페" tone={colors.primaryDeep} outline onPress={openCafe} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
