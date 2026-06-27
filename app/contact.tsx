import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle2 } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Screen } from '@/components/layout/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { getCourseById } from '@/content/courses';
import type { InquiryType } from '@/content/inquiry';
import { InquiryForm } from '@/features/inquiry/InquiryForm';
import { QuickContactBar } from '@/features/inquiry/QuickContactBar';
import type { SubmitResult } from '@/features/inquiry/submit';
import { successTap } from '@/lib/haptics';
import { colors, radius } from '@/lib/theme';

export default function ContactScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ type?: InquiryType; course?: string }>();
  const [success, setSuccess] = useState<Extract<SubmitResult, { ok: true }> | null>(null);
  const defaultInterest = useMemo(() => {
    const course = getCourseById(params.course);
    return course?.title ?? params.course;
  }, [params.course]);

  if (success) {
    return (
      <Screen scroll={false}>
        <BrandHeader title="문의 접수" close />
        <View style={styles.success}>
          <View style={styles.successIcon}>
            <CheckCircle2 size={48} color={colors.primary} />
          </View>
          <Text style={styles.successTitle}>문의가 접수되었습니다</Text>
          <Text style={styles.successText}>
            담당자가 확인 후 연락드릴게요.{'\n'}
            {success.via === 'local' ? '현재 제출 endpoint가 없어 접수번호를 앱에서 생성했습니다. 빠른 상담은 전화 또는 카페를 이용해 주세요.' : '접수 내용이 전송되었습니다.'}
          </Text>
          <Text style={styles.ref}>접수번호 {success.ref}</Text>
          <View style={styles.quick}>
            <QuickContactBar />
          </View>
          <PrimaryButton label="닫기" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <BrandHeader title="문의하기" close />
      <InquiryForm
        defaultType={params.type ?? 'license'}
        defaultInterest={defaultInterest}
        onSuccess={(result) => {
          successTap();
          setSuccess(result);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  success: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  successIcon: { width: 92, height: 92, borderRadius: 46, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bgMint },
  successTitle: { marginTop: 22, color: colors.ink, fontSize: 25, fontWeight: '900', textAlign: 'center' },
  successText: { color: colors.inkSoft, fontSize: 15, lineHeight: 23, textAlign: 'center', marginTop: 10 },
  ref: { marginTop: 16, paddingHorizontal: 13, paddingVertical: 7, borderRadius: radius.pill, backgroundColor: colors.bgSoft, color: colors.inkSoft, fontSize: 13, fontWeight: '800' },
  quick: { width: '100%', marginTop: 28, marginBottom: 14 },
});
