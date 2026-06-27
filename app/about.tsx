import { Image } from 'expo-image';
import { CheckCircle2, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { ImageModal } from '@/components/ui/ImageModal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { associationStrengths, identityStatements } from '@/content/association';
import { imageAssets, processSteps } from '@/content/imageAssets';
import { site } from '@/content/site';
import { openCafe } from '@/lib/contact';
import { colors, radius, shadow } from '@/lib/theme';

export default function AboutScreen() {
  const [image, setImage] = useState<number | null>(null);

  return (
    <Screen bottomInset={100}>
      <BrandHeader title="협회소개" back />
      <SectionHeader eyebrow="About" title="기관 수업을 연구하고 개발하는 협회" caption={site.description} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.heroImages}>
        {[
          { key: 'about-01', label: '협회소개 이미지 1' },
          { key: 'about-02', label: '협회소개 이미지 2' },
        ].map((item) => (
          <Pressable key={item.key} onPress={() => setImage(imageAssets[item.key] as number)}>
            <Image source={imageAssets[item.key]} accessibilityLabel={item.label} contentFit="cover" style={styles.heroImage} transition={180} />
          </Pressable>
        ))}
      </ScrollView>

      <SectionHeader title="협회의 정체성" />
      <View style={styles.identityList}>
        {identityStatements.map((statement) => (
          <View key={statement} style={styles.identityCard}>
            <CheckCircle2 size={21} color={colors.primary} />
            <Text style={styles.identityText}>{statement}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="수강 프로세스 아웃라인" caption="원본 아웃라인 이미지를 순서대로 확인할 수 있습니다." />
      <FlatList
        horizontal
        data={processSteps}
        keyExtractor={(_, index) => `process-${index}`}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => setImage(item as number)} style={styles.processCard}>
            <Image source={item} accessibilityLabel={`수강 프로세스 아웃라인 ${index + 1}`} contentFit="contain" style={styles.processImage} transition={180} />
            <Text style={styles.processText}>Step {index + 1}</Text>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.heroImages}
      />

      <SectionHeader title="강점 5가지" />
      <View style={styles.strengthList}>
        {associationStrengths.map((strength, index) => (
          <View key={strength} style={styles.strengthRow}>
            <Text style={styles.strengthNo}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.strengthText}>{strength}</Text>
          </View>
        ))}
      </View>

      <Padded>
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>협회 자료를 더 보고 싶으신가요?</Text>
          <Text style={styles.ctaText}>새 소식과 자료는 네이버카페에서 가장 빠르게 확인할 수 있습니다.</Text>
          <PrimaryButton label="네이버카페 바로가기" onPress={openCafe} icon={<MessageCircle size={18} color={colors.white} />} />
        </View>
      </Padded>

      <ImageModal visible={!!image} source={image ?? undefined} label="협회 소개 이미지" onClose={() => setImage(null)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroImages: { paddingHorizontal: 20, gap: 14 },
  heroImage: { width: 286, height: 360, borderRadius: radius.card, backgroundColor: colors.bgSoft },
  identityList: { paddingHorizontal: 20, gap: 11 },
  identityCard: { flexDirection: 'row', gap: 12, padding: 16, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  identityText: { flex: 1, color: colors.ink, fontSize: 15, lineHeight: 23, fontWeight: '800' },
  processCard: { width: 238, padding: 12, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  processImage: { width: '100%', height: 258, borderRadius: 14, backgroundColor: colors.bgSoft },
  processText: { color: colors.primaryDeep, fontSize: 13, fontWeight: '900', marginTop: 8 },
  strengthList: { paddingHorizontal: 20, gap: 9 },
  strengthRow: { flexDirection: 'row', gap: 14, padding: 15, borderRadius: radius.card, backgroundColor: colors.bgMint },
  strengthNo: { color: colors.primaryDeep, fontSize: 15, fontWeight: '900' },
  strengthText: { flex: 1, color: colors.ink, fontSize: 16, lineHeight: 23, fontWeight: '800' },
  cta: { marginTop: 24, padding: 20, borderRadius: radius.panel, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  ctaTitle: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  ctaText: { color: colors.inkSoft, fontSize: 15, lineHeight: 22, marginTop: 6, marginBottom: 14 },
});
