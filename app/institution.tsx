import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Check, MessageCircle, Phone } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { ImageModal } from '@/components/ui/ImageModal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { imageAssets } from '@/content/imageAssets';
import { institutionBenefits, relatedDiscountGroups, strengths, teachingSupports } from '@/content/institution';
import { site } from '@/content/site';
import { callAssociation } from '@/lib/contact';
import { colors, radius, shadow } from '@/lib/theme';

export default function InstitutionScreen() {
  const router = useRouter();
  const [brochureOpen, setBrochureOpen] = useState(false);

  return (
    <Screen bottomInset={112}>
      <BrandHeader title="기관수업" back />
      <SectionHeader eyebrow="Institution" title="우리 기관에 맞는 음악 수업" caption="대상·회차·악기 구성에 맞춰 강사가 직접 찾아가는 생활음악 수업을 안내합니다." />

      <Padded>
        <View style={styles.motto}>
          <Text style={styles.mottoText}>{site.motto}</Text>
        </View>
      </Padded>

      <SectionHeader title="기관수업 강점" />
      <View style={styles.cardList}>
        {strengths.map((item) => (
          <View key={item.id} style={styles.infoCard}>
            <Text style={styles.infoTitle}>{item.title}</Text>
            <Text style={styles.infoDesc}>{item.desc}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="지원 자료" />
      <View style={styles.supportWrap}>
        {teachingSupports.map((support) => (
          <View key={support.id} style={styles.supportChip}>
            <Text style={styles.supportText}>{support.label}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="기관 혜택" />
      <View style={styles.cardList}>
        {institutionBenefits.map((benefit) => (
          <View key={benefit.id} style={styles.benefitCard}>
            <View style={[styles.benefitBar, { backgroundColor: benefit.accent }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>{benefit.title}</Text>
              <Text style={styles.infoDesc}>{benefit.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <SectionHeader title="관련 기관 그룹" />
      <View style={styles.discountList}>
        {relatedDiscountGroups.map((group) => (
          <View key={group.id} style={styles.discountRow}>
            <Check size={17} color={colors.primary} />
            <Text style={styles.discountText}>{group.label}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title="기관수업 브로셔" />
      <Padded>
        <Pressable onPress={() => setBrochureOpen(true)} style={styles.brochureCard}>
          <Image source={imageAssets.brochure} accessibilityLabel="기관수업 브로셔" contentFit="cover" style={styles.brochureImage} transition={180} />
          <Text style={styles.brochureText}>탭해서 크게 보기</Text>
        </Pressable>
      </Padded>

      <Padded>
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>기관 출강을 문의하세요</Text>
          <Text style={styles.ctaText}>기관명·인원·희망 악기를 알려주시면 상담에 도움이 됩니다.</Text>
          <View style={styles.ctaButtons}>
            <PrimaryButton label="문의 폼 작성하기" onPress={() => router.push({ pathname: '/contact', params: { type: 'institution' } })} icon={<MessageCircle size={18} color={colors.white} />} />
            <PrimaryButton label="전화 문의" outline onPress={callAssociation} icon={<Phone size={18} color={colors.primary} />} />
          </View>
        </View>
      </Padded>

      <ImageModal visible={brochureOpen} source={imageAssets.brochure} label="기관수업 브로셔" onClose={() => setBrochureOpen(false)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  motto: { padding: 22, borderRadius: radius.panel, backgroundColor: colors.primary },
  mottoText: { color: colors.white, fontSize: 23, lineHeight: 32, fontWeight: '900' },
  cardList: { paddingHorizontal: 20, gap: 11 },
  infoCard: { padding: 16, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  infoTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  infoDesc: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: 6 },
  supportWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20 },
  supportChip: { paddingHorizontal: 13, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.bgMint, borderWidth: 1, borderColor: colors.primarySoft },
  supportText: { color: colors.primaryDeep, fontSize: 14, fontWeight: '900' },
  benefitCard: { flexDirection: 'row', gap: 13, padding: 16, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  benefitBar: { width: 5, borderRadius: 3 },
  discountList: { paddingHorizontal: 20, gap: 8 },
  discountRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  discountText: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  brochureCard: { padding: 14, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  brochureImage: { width: '100%', height: 330, borderRadius: 16, backgroundColor: colors.bgSoft },
  brochureText: { color: colors.inkSoft, fontSize: 13, fontWeight: '800', textAlign: 'center', marginTop: 10 },
  cta: { marginTop: 24, padding: 20, borderRadius: radius.panel, backgroundColor: colors.bgMint, borderWidth: 1, borderColor: colors.primarySoft },
  ctaTitle: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  ctaText: { color: colors.inkSoft, fontSize: 15, lineHeight: 22, marginTop: 6, marginBottom: 14 },
  ctaButtons: { gap: 9 },
});
