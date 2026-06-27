import { Image } from 'expo-image';
import { ChevronDown, HelpCircle } from 'lucide-react-native';
import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from 'react-native';

import { CourseCard } from '@/components/courses/CourseCard';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { StickyCtaBar } from '@/components/layout/StickyCtaBar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { courseFaqs, courseTypes } from '@/content/courses';
import { imageAssets } from '@/content/imageAssets';
import { tapLight } from '@/lib/haptics';
import { colors, radius, shadow } from '@/lib/theme';

export default function CoursesScreen() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <View style={styles.root}>
      <Screen bottomInset={148}>
        <BrandHeader title="자격과정" />
        <SectionHeader eyebrow="Become a Lecturer" title="생활음악 강사, 여기서 시작하세요" caption="급수별·속성·융합·심화 과정의 차이를 확인하고 문의로 이어가세요." />

        <Padded>
          <View style={styles.guide}>
            <Text style={styles.guideTitle}>수강료와 일정은 별도 문의로 안내합니다</Text>
            <Text style={styles.guideText}>과정·인원·지역에 따라 운영 방식이 달라질 수 있어, 확정되지 않은 가격이나 날짜는 앱에 표시하지 않습니다.</Text>
          </View>
        </Padded>

        <View style={styles.courseList}>
          {courseTypes.map((course) => (
            <CourseCard key={course.id} course={course} compact />
          ))}
        </View>

        <SectionHeader title="수강 프로세스" caption="검정과정과 수강 흐름은 원본 자료 이미지를 그대로 사용했습니다." />
        <Padded>
          <Image source={imageAssets.process} accessibilityLabel="자격증 검정과정과 자격과정 수강 프로세스" contentFit="contain" style={styles.processImage} transition={180} />
        </Padded>

        <SectionHeader title="자주 묻는 질문" />
        <View style={styles.faqList}>
          {courseFaqs.map((faq, index) => {
            const active = openFaq === index;
            return (
              <Pressable
                key={faq.q}
                accessibilityRole="button"
                accessibilityLabel={`${faq.q} 답변 ${active ? '닫기' : '열기'}`}
                onPress={() => {
                  tapLight();
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setOpenFaq(active ? null : index);
                }}
                style={styles.faqCard}
              >
                <View style={styles.faqHead}>
                  <HelpCircle size={18} color={colors.primary} />
                  <Text style={styles.faqQ}>{faq.q}</Text>
                  <ChevronDown size={18} color={colors.inkSoft} style={{ transform: [{ rotate: active ? '180deg' : '0deg' }] }} />
                </View>
                {active && <Text style={styles.faqA}>{faq.a}</Text>}
              </Pressable>
            );
          })}
        </View>
      </Screen>
      <StickyCtaBar contactParams={{ type: 'license' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  guide: {
    padding: 17,
    borderRadius: radius.card,
    backgroundColor: colors.bgMint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  guideTitle: {
    color: colors.primaryDeep,
    fontSize: 17,
    fontWeight: '900',
  },
  guideText: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },
  courseList: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 14,
  },
  processImage: {
    width: '100%',
    height: 420,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  faqList: {
    paddingHorizontal: 20,
    gap: 10,
  },
  faqCard: {
    padding: 16,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.soft,
  },
  faqHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  faqQ: {
    flex: 1,
    color: colors.ink,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
  },
  faqA: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
    paddingLeft: 28,
  },
});
