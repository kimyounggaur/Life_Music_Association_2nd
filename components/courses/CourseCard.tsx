import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Course } from '@/content/courses';
import { getImage } from '@/content/imageAssets';
import { tapLight } from '@/lib/haptics';
import { colors, radius, shadow } from '@/lib/theme';

export function CourseCard({ course, compact = false }: { course: Course; compact?: boolean }) {
  const router = useRouter();
  const image = getImage(course.image);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${course.title} 상세 보기`}
      onPress={() => {
        tapLight();
        router.push(`/courses/${course.id}`);
      }}
      style={({ pressed }) => [styles.card, shadow.soft, compact && styles.compact, pressed && styles.pressed]}
    >
      <View style={[styles.colorBar, { backgroundColor: course.color }]} />
      <View style={styles.body}>
        <View style={styles.textArea}>
          <Text style={[styles.no, { color: course.color }]}>{course.no}</Text>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.when}>{course.when}</Text>
          <Text numberOfLines={compact ? 2 : 3} style={styles.summary}>
            {course.summary}
          </Text>
        </View>
        {image && <Image source={image} accessibilityLabel={`${course.title} 안내 이미지`} contentFit="cover" style={styles.image} transition={180} />}
      </View>
      <View style={styles.footer}>
        <Text style={[styles.more, { color: course.color }]}>자세히 보기</Text>
        <ArrowRight size={16} color={course.color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 284,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  compact: {
    width: '100%',
  },
  colorBar: {
    height: 5,
  },
  body: {
    flexDirection: 'row',
    gap: 12,
    padding: 15,
  },
  textArea: {
    flex: 1,
    minWidth: 0,
  },
  no: {
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    lineHeight: 25,
    fontWeight: '900',
    marginTop: 2,
  },
  when: {
    color: colors.inkSoft,
    fontSize: 13,
    marginTop: 8,
  },
  summary: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  image: {
    width: 82,
    height: 108,
    borderRadius: 14,
    backgroundColor: colors.bgSoft,
  },
  footer: {
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  more: {
    fontWeight: '900',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
