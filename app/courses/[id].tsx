import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AlertCircle, Award, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { StickyCtaBar } from '@/components/layout/StickyCtaBar';
import { InstrumentChip } from '@/components/ui/InstrumentChip';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { fusionExamples, fusionGroups, getCourseById, type Course } from '@/content/courses';
import { getImage } from '@/content/imageAssets';
import { tapLight } from '@/lib/haptics';
import { colors, radius, shadow } from '@/lib/theme';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const course = getCourseById(id);

  if (!course) {
    return (
      <Screen scroll={false}>
        <BrandHeader title="찾을 수 없음" back />
        <View style={styles.center}>
          <AlertCircle size={42} color={colors.inkSoft} />
          <Text style={styles.notFoundTitle}>과정을 찾을 수 없어요</Text>
          <PrimaryButton label="자격과정으로 돌아가기" onPress={() => router.replace('/courses')} />
        </View>
      </Screen>
    );
  }

  return (
    <View style={styles.root}>
      <Screen bottomInset={150}>
        <BrandHeader title={course.title} back />
        <View style={[styles.hero, { backgroundColor: course.color }]}>
          <View style={styles.heroMeta}>
            <Award size={18} color={colors.white} />
            <Text style={styles.heroNo}>{course.no}</Text>
          </View>
          <Text style={styles.heroTitle}>{course.title}</Text>
          <Text style={styles.heroSummary}>{course.summary}</Text>
        </View>

        <Padded>
          {getImage(course.image) && <Image source={getImage(course.image)} accessibilityLabel={`${course.title} 안내 이미지`} contentFit="contain" style={styles.poster} transition={180} />}
        </Padded>

        {course.id === 'level' && <LevelDetail course={course} />}
        {course.id === 'fast' && <FastDetail course={course} />}
        {course.id === 'fusion' && <FusionDetail />}
        {course.id === 'advanced' && <AdvancedDetail course={course} />}

        <Padded>
          <View style={styles.notice}>
            <Text style={styles.noticeTitle}>비용·일정은 별도 문의로 안내합니다</Text>
            <Text style={styles.noticeText}>운영 상황에 따라 과정 구성과 진행 방식이 달라질 수 있습니다.</Text>
          </View>
        </Padded>
      </Screen>
      <StickyCtaBar courseId={course.id} contactParams={{ type: 'license', course: course.title }} />
    </View>
  );
}

function LevelDetail({ course }: { course: Course }) {
  return (
    <Padded>
      <View style={styles.detailStack}>
        {course.groups?.map((group) => (
          <View key={group.label} style={styles.detailCard}>
            <Text style={styles.groupTitle}>{group.label} 자격과정</Text>
            <View style={styles.chipWrap}>
              {group.instruments.map((name) => (
                <InstrumentChip key={name} name={name} />
              ))}
            </View>
          </View>
        ))}
      </View>
    </Padded>
  );
}

function FastDetail({ course }: { course: Course }) {
  return (
    <Padded>
      <View style={styles.detailStack}>
        {course.groups?.map((group) => (
          <View key={group.label} style={styles.detailCard}>
            <Text style={styles.groupTitle}>{group.label}</Text>
            <Text style={styles.groupCaption}>과목은 개인 상황과 목표에 맞춰 별도 문의로 안내합니다.</Text>
          </View>
        ))}
      </View>
    </Padded>
  );
}

function FusionDetail() {
  const [open, setOpen] = useState<string | null>('fg1');

  return (
    <Padded>
      <View style={styles.detailStack}>
        {fusionGroups.map((group) => {
          const active = open === group.id;
          return (
            <Pressable
              key={group.id}
              onPress={() => {
                tapLight();
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOpen(active ? null : group.id);
              }}
              style={styles.detailCard}
            >
              <View style={styles.accordionHead}>
                <Text style={styles.groupTitle}>{group.label}</Text>
                <ChevronDown size={18} color={colors.inkSoft} style={{ transform: [{ rotate: active ? '180deg' : '0deg' }] }} />
              </View>
              {active && (
                <View style={styles.fusionRows}>
                  {group.items.map((item) => (
                    <View key={item.title} style={styles.fusionRow}>
                      <Text style={styles.fusionTitle}>{item.title}</Text>
                      <Text style={styles.fusionTime}>{item.time}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
          );
        })}
        <Text style={styles.subsectionTitle}>융합 예시</Text>
        <View style={styles.chipWrap}>
          {fusionExamples.map((example) => (
            <View key={example} style={styles.exampleChip}>
              <Text style={styles.exampleText}>{example}</Text>
            </View>
          ))}
        </View>
      </View>
    </Padded>
  );
}

function AdvancedDetail({ course }: { course: Course }) {
  return (
    <Padded>
      <View style={styles.timeline}>
        {course.durations?.map((duration, index, all) => (
          <View key={duration} style={styles.timelineRow}>
            <View style={styles.timelineRail}>
              <View style={styles.timelineDot} />
              {index < all.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <View style={styles.timelineText}>
              <Text style={styles.groupTitle}>{duration}</Text>
              <Text style={styles.groupCaption}>레퍼토리·합주·지도력을 단계적으로 끌어올리는 심화 흐름입니다.</Text>
            </View>
          </View>
        ))}
      </View>
    </Padded>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 14 },
  notFoundTitle: { color: colors.ink, fontSize: 20, fontWeight: '900' },
  hero: { marginHorizontal: 20, marginTop: 18, padding: 22, borderRadius: radius.panel },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroNo: { color: colors.white, fontSize: 14, fontWeight: '900' },
  heroTitle: { color: colors.white, fontSize: 28, lineHeight: 35, fontWeight: '900', marginTop: 9 },
  heroSummary: { color: 'rgba(255,255,255,0.9)', fontSize: 15, lineHeight: 23, marginTop: 10 },
  poster: { width: '100%', height: 300, marginTop: 16, borderRadius: radius.card, backgroundColor: colors.surface },
  detailStack: { gap: 13, marginTop: 18 },
  detailCard: { padding: 16, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  groupTitle: { color: colors.ink, fontSize: 18, lineHeight: 24, fontWeight: '900' },
  groupCaption: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: 8 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  accordionHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  fusionRows: { gap: 9, marginTop: 13 },
  fusionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, borderTopColor: colors.line, borderTopWidth: StyleSheet.hairlineWidth, paddingTop: 10 },
  fusionTitle: { flex: 1, color: colors.ink, fontSize: 15, fontWeight: '800' },
  fusionTime: { color: colors.courseFusion, fontSize: 14, fontWeight: '900' },
  subsectionTitle: { color: colors.ink, fontSize: 19, fontWeight: '900', marginTop: 8 },
  exampleChip: { paddingHorizontal: 12, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: '#FBE9DD' },
  exampleText: { color: colors.courseFusion, fontSize: 13, lineHeight: 18, fontWeight: '800' },
  timeline: { marginTop: 20 },
  timelineRow: { flexDirection: 'row', minHeight: 86 },
  timelineRail: { width: 24, alignItems: 'center' },
  timelineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.courseAdvanced },
  timelineLine: { flex: 1, width: 2, backgroundColor: colors.line, marginVertical: 5 },
  timelineText: { flex: 1, paddingBottom: 20 },
  notice: { marginTop: 22, padding: 16, borderRadius: radius.card, backgroundColor: colors.bgMint, borderWidth: 1, borderColor: colors.primarySoft },
  noticeTitle: { color: colors.primaryDeep, fontSize: 16, fontWeight: '900' },
  noticeText: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: 6 },
});
