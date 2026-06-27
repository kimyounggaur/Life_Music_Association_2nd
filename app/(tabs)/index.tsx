import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Award, BookOpen, Building2, MessageCircle, Music2, Phone } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { CourseCard } from '@/components/courses/CourseCard';
import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { associationStrengths } from '@/content/association';
import { bookCovers } from '@/content/books';
import { courseTypes, fusionExamples } from '@/content/courses';
import { cardNews, imageAssets } from '@/content/imageAssets';
import { site } from '@/content/site';
import { callAssociation, openCafe } from '@/lib/contact';
import { tapLight } from '@/lib/haptics';
import { colors, fonts, radius, shadow } from '@/lib/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardNewsWidth = Math.min(width - 40, 390);

  return (
    <Screen bottomInset={110}>
      <BrandHeader />

      <Padded>
        <View style={styles.hero}>
          <View style={styles.heroText}>
            <Text style={styles.display}>Life Music{'\n'}Lecturer</Text>
            <Text style={styles.heroTitle}>기관 수업에 특화된{'\n'}생활음악 교육 협회</Text>
            <Text style={styles.heroCaption}>{site.motto}</Text>
            <PrimaryButton label="자격과정 문의" onPress={() => router.push('/contact')} icon={<MessageCircle size={18} color={colors.white} />} />
          </View>
          <Image source={imageAssets['about-01']} accessibilityLabel="협회 소개 이미지" contentFit="cover" style={styles.heroImage} transition={250} />
          <Text accessibilityElementsHidden style={[styles.note, styles.noteA]}>
            ♪
          </Text>
          <Text accessibilityElementsHidden style={[styles.note, styles.noteB]}>
            ♫
          </Text>
        </View>

        <View style={styles.quotePanel}>
          <Text style={styles.quoteText}>{site.motto}</Text>
        </View>

        <View style={styles.tileGrid}>
          <QuickTile label="자격과정" tint={colors.courseLevel} icon={<Award size={22} color={colors.courseLevel} />} onPress={() => router.push('/courses')} />
          <QuickTile label="클래스" tint={colors.primary} icon={<Music2 size={22} color={colors.primary} />} onPress={() => router.push('/classes')} />
          <QuickTile label="교재" tint={colors.mustard} icon={<BookOpen size={22} color={colors.mustard} />} onPress={() => router.push('/books')} />
          <QuickTile label="기관수업" tint={colors.courseFast} icon={<Building2 size={22} color={colors.courseFast} />} onPress={() => router.push('/institution')} />
        </View>
      </Padded>

      <SectionHeader eyebrow="Become a Lecturer" title="자격과정" caption="4가지 과정 유형에서 현재 상황에 맞는 흐름을 골라보세요." />
      <FlatList
        horizontal
        data={courseTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        showsHorizontalScrollIndicator={false}
        snapToInterval={298}
        decelerationRate="fast"
        contentContainerStyle={styles.horizontalList}
      />

      <SectionHeader title="협회가 다른 이유" caption="기관 현장에 맞춘 수업 운영을 중심에 둡니다." />
      <FlatList
        horizontal
        data={associationStrengths}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <View style={styles.strengthCard}>
            <Text style={styles.strengthNo}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.strengthText}>{item}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      <SectionHeader title="융합수업 예시" caption="기관 대상과 회차에 맞춰 여러 악기를 묶어 설계합니다." />
      <View style={styles.chipWrap}>
        {fusionExamples.map((example) => (
          <View key={example} style={styles.fusionChip}>
            <Text style={styles.fusionChipText}>{example}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="교재 프리뷰" caption="수업에 바로 쓰는 교재와 연습곡집을 함께 준비합니다." />
      <FlatList
        horizontal
        data={bookCovers.slice(0, 6)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.bookPreview} onPress={() => router.push('/books')}>
            <Image source={item.image} accessibilityLabel={`${item.title} 표지`} contentFit="cover" style={styles.bookImage} transition={180} />
            <Text numberOfLines={1} style={styles.bookTitle}>
              {item.title}
            </Text>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      <SectionHeader title="협회 소개 카드뉴스" caption="원본 카드뉴스 자료를 모바일 캐러셀로 확인하세요." />
      <FlatList
        horizontal
        pagingEnabled
        data={cardNews}
        keyExtractor={(_, index) => `cardnews-${index}`}
        renderItem={({ item, index }) => (
          <Image source={item} accessibilityLabel={`협회 소개 카드뉴스 ${index + 1}`} contentFit="cover" style={[styles.cardNews, { width: cardNewsWidth }]} transition={180} />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
      />

      <Padded>
        <View style={styles.finalCta}>
          <Text style={styles.finalTitle}>상담이 필요하신가요?</Text>
          <Text style={styles.finalCaption}>전화 또는 네이버카페로 바로 연결할 수 있습니다.</Text>
          <View style={styles.finalButtons}>
            <PrimaryButton label="전화 문의" onPress={callAssociation} icon={<Phone size={18} color={colors.white} />} />
            <PrimaryButton label="네이버카페" outline onPress={openCafe} icon={<MessageCircle size={18} color={colors.primary} />} />
          </View>
        </View>
      </Padded>
    </Screen>
  );
}

function QuickTile({ label, icon, tint, onPress }: { label: string; icon: React.ReactNode; tint: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label} 바로가기`}
      onPress={() => {
        tapLight();
        onPress();
      }}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={[styles.tileIcon, { backgroundColor: `${tint}18` }]}>{icon}</View>
      <Text style={styles.tileLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 486,
    marginTop: 14,
    borderRadius: radius.panel,
    backgroundColor: colors.bgMint,
    overflow: 'hidden',
    padding: 22,
  },
  heroText: {
    zIndex: 1,
    gap: 12,
  },
  display: {
    color: colors.primaryDeep,
    fontFamily: fonts.display,
    fontStyle: 'italic',
    fontSize: 48,
    lineHeight: 49,
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '900',
  },
  heroCaption: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 23,
    maxWidth: 260,
  },
  heroImage: {
    position: 'absolute',
    right: -16,
    bottom: -10,
    width: 210,
    height: 260,
    borderTopLeftRadius: radius.panel,
    backgroundColor: colors.bgSoft,
  },
  note: {
    position: 'absolute',
    color: colors.coral,
    fontSize: 28,
    fontWeight: '900',
  },
  noteA: { right: 26, top: 34 },
  noteB: { left: 26, bottom: 40, color: colors.mustard },
  quotePanel: {
    marginTop: 16,
    padding: 22,
    borderRadius: radius.panel,
    backgroundColor: colors.primary,
  },
  quoteText: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 31,
    fontWeight: '900',
  },
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  tile: {
    width: '48.5%',
    minHeight: 104,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14,
    justifyContent: 'space-between',
    ...shadow.soft,
  },
  tileIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: '900',
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  strengthCard: {
    width: 196,
    minHeight: 124,
    padding: 16,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.soft,
  },
  strengthNo: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  strengthText: {
    color: colors.ink,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '800',
    marginTop: 12,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 20,
  },
  fusionChip: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: '#FBE9DD',
  },
  fusionChipText: {
    color: colors.courseFusion,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '800',
  },
  bookPreview: {
    width: 118,
  },
  bookImage: {
    width: 118,
    height: 158,
    borderRadius: 14,
    backgroundColor: colors.bgSoft,
  },
  bookTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
  cardNews: {
    aspectRatio: 1,
    borderRadius: radius.card,
    backgroundColor: colors.bgSoft,
  },
  finalCta: {
    marginTop: 28,
    padding: 20,
    borderRadius: radius.panel,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.soft,
  },
  finalTitle: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: '900',
  },
  finalCaption: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 14,
  },
  finalButtons: {
    gap: 9,
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
});
