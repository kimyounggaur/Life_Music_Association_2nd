import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import * as StoreReview from 'expo-store-review';
import { BookOpen, Building2, ChevronRight, FileText, Info, MessageCircle, Phone, Star, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { ImageModal } from '@/components/ui/ImageModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { etcIcons, socialLinks } from '@/content/social';
import { site } from '@/content/site';
import { callAssociation, openCafe, openExternalUrl } from '@/lib/contact';
import { tapLight } from '@/lib/haptics';
import { colors, fonts, radius, shadow } from '@/lib/theme';

const qr = require('@/assets/kmla/posters/sns-qr.jpg');

export default function MoreScreen() {
  const router = useRouter();
  const [qrOpen, setQrOpen] = useState(false);
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <Screen bottomInset={92}>
      <BrandHeader title="더보기" />
      <Padded>
        <View style={styles.brandCard}>
          <View style={styles.mark}>
            <Text style={styles.markText}>LM</Text>
          </View>
          <Text style={styles.name}>{site.name}</Text>
          <Text style={styles.english}>{site.englishName}</Text>
          <Text style={styles.tagline}>{site.tagline}</Text>
        </View>
      </Padded>

      <SectionHeader title="바로가기" />
      <View style={styles.sectionCard}>
        <MoreRow icon={<Info size={20} color={colors.primary} />} label="협회소개" onPress={() => router.push('/about')} />
        <MoreRow icon={<Building2 size={20} color={colors.primary} />} label="기관수업" onPress={() => router.push('/institution')} />
        <MoreRow icon={<Users size={20} color={colors.primary} />} label="스토리" onPress={() => router.push('/stories')} />
        <MoreRow icon={<MessageCircle size={20} color={colors.primary} />} label="문의" onPress={() => router.push('/contact')} last />
      </View>

      <SectionHeader title="연락처" />
      <View style={styles.sectionCard}>
        <ContactRow icon={etcIcons.phone} label={site.contact.phone} onPress={callAssociation} />
        <ContactRow icon={etcIcons.naver} label="네이버카페" onPress={openCafe} />
        <ContactRow icon={etcIcons.email} label="이메일 준비 중" disabled onPress={() => undefined} last />
      </View>

      <SectionHeader title="소셜" caption="채널 주소가 확정되지 않은 항목은 비활성 상태로 표시합니다." />
      <View style={styles.socialGrid}>
        {socialLinks.map((link) => (
          <Pressable
            key={link.key}
            accessibilityRole="button"
            accessibilityLabel={`${link.label} ${link.url ? '열기' : '준비 중'}`}
            onPress={() => openExternalUrl(link.url)}
            style={[styles.socialItem, !link.url && styles.disabled]}
          >
            <Image source={link.icon} accessibilityLabel={`${link.label} 로고`} contentFit="contain" style={styles.socialIcon} />
            <Text style={styles.socialLabel}>{link.label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="협회 QR" />
      <Padded>
        <Pressable onPress={() => setQrOpen(true)} style={styles.qrCard}>
          <Image source={qr} accessibilityLabel="협회 SNS QR코드" contentFit="contain" style={styles.qrImage} />
          <Text style={styles.qrText}>탭해서 크게 보기</Text>
        </Pressable>
      </Padded>

      <SectionHeader title="앱 정보" />
      <View style={styles.sectionCard}>
        <InfoRow label="버전" value={version} />
        <MoreRow icon={<FileText size={20} color={colors.inkSoft} />} label="개인정보처리방침 준비 중" disabled onPress={() => undefined} />
        <MoreRow icon={<BookOpen size={20} color={colors.inkSoft} />} label="이용약관 준비 중" disabled onPress={() => undefined} />
        <MoreRow icon={<Star size={20} color={colors.mustard} />} label="별점 남기기" onPress={askReview} last />
      </View>

      <ImageModal visible={qrOpen} source={qr} label="협회 SNS QR코드" onClose={() => setQrOpen(false)} />
    </Screen>
  );
}

async function askReview() {
  tapLight();
  if (await StoreReview.isAvailableAsync()) {
    await StoreReview.requestReview();
    return;
  }
  Alert.alert('앱 평가 안내', '현재 환경에서는 스토어 평가 창을 열 수 없습니다.');
}

function MoreRow({ icon, label, onPress, disabled, last }: { icon: React.ReactNode; label: string; onPress: () => void; disabled?: boolean; last?: boolean }) {
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={[styles.row, last && styles.lastRow, disabled && styles.disabled]}>
      <View style={styles.rowIcon}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      <ChevronRight size={18} color={colors.inkSoft} />
    </Pressable>
  );
}

function ContactRow({ icon, label, onPress, disabled, last }: { icon: number; label: string; onPress: () => void; disabled?: boolean; last?: boolean }) {
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={[styles.row, last && styles.lastRow, disabled && styles.disabled]}>
      <Image source={icon} accessibilityLabel={`${label} 아이콘`} contentFit="contain" style={styles.contactIcon} />
      <Text style={styles.rowLabel}>{label}</Text>
      {!disabled && <Phone size={16} color={colors.primary} />}
    </Pressable>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brandCard: {
    marginTop: 16,
    padding: 22,
    borderRadius: radius.panel,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: 'center',
    ...shadow.soft,
  },
  mark: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginBottom: 12,
  },
  markText: { color: colors.white, fontSize: 18, fontWeight: '900' },
  name: { color: colors.ink, fontSize: 24, fontWeight: '900', textAlign: 'center' },
  english: { color: colors.primaryDeep, fontFamily: fonts.display, fontStyle: 'italic', fontSize: 20, textAlign: 'center', marginTop: 4 },
  tagline: { color: colors.inkSoft, fontSize: 15, textAlign: 'center', marginTop: 8 },
  sectionCard: { marginHorizontal: 20, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, overflow: 'hidden', ...shadow.soft },
  row: { minHeight: 54, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 15, borderBottomColor: colors.line, borderBottomWidth: StyleSheet.hairlineWidth },
  lastRow: { borderBottomWidth: 0 },
  rowIcon: { width: 24, alignItems: 'center' },
  rowLabel: { flex: 1, color: colors.ink, fontSize: 16, fontWeight: '800' },
  contactIcon: { width: 25, height: 25, borderRadius: 6 },
  infoValue: { color: colors.inkSoft, fontSize: 15, fontWeight: '800' },
  disabled: { opacity: 0.45 },
  socialGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20 },
  socialItem: { width: '22.8%', alignItems: 'center', gap: 7, paddingVertical: 12, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  socialIcon: { width: 34, height: 34 },
  socialLabel: { color: colors.inkSoft, fontSize: 12, fontWeight: '800', textAlign: 'center' },
  qrCard: { alignItems: 'center', padding: 18, borderRadius: radius.panel, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line, ...shadow.soft },
  qrImage: { width: 220, height: 220, borderRadius: 16 },
  qrText: { color: colors.inkSoft, fontSize: 13, fontWeight: '800', marginTop: 10 },
});
