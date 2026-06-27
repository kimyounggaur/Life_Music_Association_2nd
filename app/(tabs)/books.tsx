import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

import { DonutChart } from '@/components/charts/DonutChart';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { ImageModal } from '@/components/ui/ImageModal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { bookCovers, practiceCategories, practiceCovers, songbookSeries } from '@/content/books';
import { teachingSupports } from '@/content/institution';
import { colors, radius, shadow } from '@/lib/theme';

export default function BooksScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<{ source: ImageSourcePropType; title: string } | null>(null);

  return (
    <Screen bottomInset={110}>
      <BrandHeader title="교재" />
      <SectionHeader eyebrow="Songbooks & Materials" title="수업에 바로 쓰는 교재와 연습곡집" caption="원본 교재 표지와 대표 연습곡집 시리즈를 모바일 카탈로그로 정리했습니다." />

      <FlatList
        horizontal
        data={bookCovers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable accessibilityRole="imagebutton" accessibilityLabel={`${item.title} 크게 보기`} onPress={() => setSelected({ source: item.image, title: item.title })} style={styles.coverCard}>
            <Image source={item.image} accessibilityLabel={`${item.title} 표지`} contentFit="cover" style={styles.coverImage} transition={180} />
            <Text numberOfLines={2} style={styles.coverTitle}>
              {item.title}
            </Text>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={164}
        decelerationRate="fast"
        contentContainerStyle={styles.horizontalList}
      />

      <SectionHeader title="연습곡집 시리즈" caption="대상별 곡 구성 비율을 한눈에 볼 수 있게 정리했습니다." />
      <View style={styles.seriesList}>
        {songbookSeries.map((series) => (
          <View key={series.id} style={styles.seriesCard}>
            <Text style={styles.seriesTitle}>{series.title}</Text>
            <Text style={styles.seriesDesc}>{series.description}</Text>
            <DonutChart data={series.ratios} label={series.title} />
            {series.note && <Text style={styles.seriesNote}>{series.note}</Text>}
          </View>
        ))}
      </View>

      <SectionHeader title="대표 연습곡집 표지" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {practiceCovers.map((source, index) => (
          <Pressable key={index} onPress={() => setSelected({ source, title: `대표 연습곡집 ${index + 1}` })}>
            <Image source={source} accessibilityLabel={`대표 연습곡집 표지 ${index + 1}`} contentFit="cover" style={styles.practiceImage} transition={180} />
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title="악기별 카테고리" caption="전체 카탈로그는 준비 중이며, 자료 문의는 카페와 문의 폼으로 연결됩니다." />
      <View style={styles.categoryWrap}>
        {practiceCategories.map((category) => (
          <View key={category} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="수업자료 지원" />
      <View style={styles.supportWrap}>
        {teachingSupports.map((support) => (
          <View key={support.id} style={styles.supportChip}>
            <Text style={styles.supportText}>{support.label}</Text>
          </View>
        ))}
      </View>

      <Padded>
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>교재·연습곡집 자료가 궁금하신가요?</Text>
          <Text style={styles.ctaText}>확정되지 않은 구매 링크나 가격 대신, 문의로 필요한 자료를 안내합니다.</Text>
          <PrimaryButton label="자료 문의하기" onPress={() => router.push({ pathname: '/contact', params: { type: 'book' } })} icon={<MessageCircle size={18} color={colors.white} />} />
        </View>
      </Padded>

      <ImageModal visible={!!selected} source={selected?.source} label={selected?.title ?? '교재 표지'} onClose={() => setSelected(null)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  horizontalList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  coverCard: {
    width: 150,
  },
  coverImage: {
    width: 150,
    height: 210,
    borderRadius: 16,
    backgroundColor: colors.bgSoft,
  },
  coverTitle: {
    color: colors.ink,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
    marginTop: 9,
  },
  seriesList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  seriesCard: {
    padding: 18,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 12,
    ...shadow.soft,
  },
  seriesTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '900',
  },
  seriesDesc: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  seriesNote: {
    color: colors.primaryDeep,
    fontSize: 13,
    fontWeight: '800',
  },
  practiceImage: {
    width: 132,
    height: 176,
    borderRadius: 15,
    backgroundColor: colors.bgSoft,
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: colors.bgMint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  categoryText: {
    color: colors.primaryDeep,
    fontWeight: '800',
    fontSize: 14,
  },
  supportWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
    paddingHorizontal: 20,
  },
  supportChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  supportText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  cta: {
    marginTop: 26,
    padding: 20,
    borderRadius: radius.panel,
    backgroundColor: colors.bgMint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
  },
  ctaTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '900',
  },
  ctaText: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 14,
  },
});
