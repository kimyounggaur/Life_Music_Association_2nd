import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Send } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { INTEREST_OPTIONS, INQUIRY_TYPES, REGIONS, type InquiryType } from '@/content/inquiry';
import { tapLight, warningTap } from '@/lib/haptics';
import { colors, radius, shadow } from '@/lib/theme';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

import { ChipMultiSelect } from './ChipMultiSelect';
import { clearDraft, loadDraft, saveDraft } from './draftStorage';
import { QuickContactBar } from './QuickContactBar';
import { inquirySchema, maskPhone, type InquiryInput } from './schema';
import { submitInquiry, type SubmitResult } from './submit';

type Props = {
  defaultType?: InquiryType;
  defaultInterest?: string;
  onSuccess: (result: Extract<SubmitResult, { ok: true }>) => void;
};

export function InquiryForm({ defaultType = 'license', defaultInterest, onSuccess }: Props) {
  const insets = useSafeAreaInsets();
  const [isSubmitting, setSubmitting] = useState(false);
  const savingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      type: defaultType,
      interests: defaultInterest ? [defaultInterest] : [],
      region: '',
      message: '',
      agree: false,
    },
  });

  useEffect(() => {
    let alive = true;
    loadDraft().then((draft) => {
      if (!alive || !draft) return;
      reset({
        name: draft.name ?? '',
        phone: draft.phone ?? '',
        type: draft.type ?? defaultType,
        interests: draft.interests?.length ? draft.interests : defaultInterest ? [defaultInterest] : [],
        region: draft.region ?? '',
        message: draft.message ?? '',
        agree: draft.agree ?? false,
      });
    });
    return () => {
      alive = false;
    };
  }, [defaultInterest, defaultType, reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      if (savingTimer.current) clearTimeout(savingTimer.current);
      savingTimer.current = setTimeout(() => saveDraft(values), 900);
    });
    return () => {
      if (savingTimer.current) clearTimeout(savingTimer.current);
      subscription.unsubscribe();
    };
  }, [watch]);

  const onSubmit = async (data: InquiryInput) => {
    if (isSubmitting) return;
    const parsed = inquirySchema.parse(data);
    setSubmitting(true);
    const result = await submitInquiry(parsed);
    setSubmitting(false);
    if (result.ok) {
      await clearDraft();
      onSuccess(result);
      return;
    }
    Alert.alert('문의 전송 안내', result.reason);
  };

  const onInvalid = () => {
    warningTap();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 132 }]}
        showsVerticalScrollIndicator={false}
      >
        <Field label="이름" required error={errors.name?.message}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="이름을 입력해 주세요"
                placeholderTextColor={colors.inkSoft}
                returnKeyType="next"
                style={[styles.input, errors.name && styles.inputError]}
              />
            )}
          />
        </Field>

        <Field label="연락처" required error={errors.phone?.message}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                onChangeText={(text) => onChange(maskPhone(text))}
                onBlur={onBlur}
                placeholder="010-0000-0000"
                placeholderTextColor={colors.inkSoft}
                keyboardType="phone-pad"
                maxLength={13}
                style={[styles.input, errors.phone && styles.inputError]}
              />
            )}
          />
        </Field>

        <Field label="문의 유형" required error={errors.type?.message}>
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View style={styles.optionGrid}>
                {INQUIRY_TYPES.map((item) => {
                  const active = value === item.value;
                  return (
                    <Pressable
                      key={item.value}
                      accessibilityRole="button"
                      accessibilityLabel={item.label}
                      onPress={() => {
                        tapLight();
                        onChange(item.value);
                      }}
                      style={[styles.typeChip, active && { borderColor: item.color, backgroundColor: colors.bgMint }]}
                    >
                      <View style={[styles.typeDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.typeText, active && { color: item.color }]}>{item.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          />
        </Field>

        <Field label="관심 과정·악기" error={errors.interests?.message}>
          <Controller
            control={control}
            name="interests"
            render={({ field: { onChange, value } }) => <ChipMultiSelect options={INTEREST_OPTIONS} value={value ?? []} onChange={onChange} />}
          />
        </Field>

        <Field label="지역" error={errors.region?.message}>
          <Controller
            control={control}
            name="region"
            render={({ field: { onChange, value } }) => (
              <View style={styles.optionGrid}>
                {REGIONS.map((region) => {
                  const active = value === region;
                  return (
                    <Pressable key={region} onPress={() => onChange(active ? '' : region)} style={[styles.regionChip, active && styles.regionActive]}>
                      <Text style={[styles.regionText, active && styles.regionTextActive]}>{region}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}
          />
        </Field>

        <Field label="문의 내용" error={errors.message?.message}>
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value ?? ''}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="문의 내용을 자유롭게 적어 주세요"
                placeholderTextColor={colors.inkSoft}
                multiline
                maxLength={500}
                textAlignVertical="top"
                style={[styles.textarea, errors.message && styles.inputError]}
              />
            )}
          />
        </Field>

        <Controller
          control={control}
          name="agree"
          render={({ field: { onChange, value } }) => (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: value }}
              accessibilityLabel="개인정보 수집 이용 동의"
              onPress={() => {
                tapLight();
                onChange(!value);
              }}
              style={styles.agreeRow}
            >
              <View style={[styles.checkbox, value && styles.checkboxOn]}>{value && <Check size={16} color={colors.white} />}</View>
              <Text style={styles.agreeText}>
                (필수) 개인정보 수집·이용에 동의합니다. 이름과 연락처는 상담 및 문의 응대를 위해 사용됩니다.
              </Text>
            </Pressable>
          )}
        />
        {errors.agree && <Text style={styles.errorText}>{errors.agree.message}</Text>}

        <View style={styles.privacyBox}>
          <Text style={styles.privacyText}>수집 항목: 이름, 휴대폰 번호 (선택: 관심 과정, 지역, 문의 내용)</Text>
          <Text style={styles.privacyText}>이용 목적: 자격과정·기관수업 상담 및 문의 응대</Text>
          <Text style={styles.privacyText}>보유 기간: 상담 완료 후 1년, 이후 지체 없이 파기</Text>
        </View>

        <View style={styles.quickBox}>
          <Text style={styles.quickTitle}>더 빠른 상담이 필요하신가요?</Text>
          <QuickContactBar />
        </View>
      </ScrollView>

      <View style={[styles.submitBar, { paddingBottom: insets.bottom + 12 }]}>
        <PrimaryButton
          label={isSubmitting ? '전송 중' : '문의 보내기'}
          disabled={!isValid || isSubmitting}
          onPress={handleSubmit(onSubmit, onInvalid)}
          icon={isSubmitting ? <ActivityIndicator color={colors.white} /> : <Send size={18} color={colors.white} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {children}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    padding: 20,
    gap: 2,
  },
  field: {
    marginBottom: 17,
  },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  required: {
    color: colors.coral,
  },
  input: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    color: colors.ink,
    fontSize: 16,
  },
  textarea: {
    minHeight: 126,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    padding: 14,
    color: colors.ink,
    fontSize: 16,
    lineHeight: 23,
  },
  inputError: {
    borderColor: colors.coral,
  },
  errorText: {
    color: colors.coral,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    minHeight: 42,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  typeDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  typeText: {
    color: colors.inkSoft,
    fontSize: 14,
    fontWeight: '800',
  },
  regionChip: {
    minHeight: 38,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  regionActive: {
    backgroundColor: colors.bgMint,
    borderColor: colors.primary,
  },
  regionText: {
    color: colors.inkSoft,
    fontWeight: '700',
    fontSize: 14,
  },
  regionTextActive: {
    color: colors.primaryDeep,
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11,
    paddingVertical: 4,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  checkboxOn: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  agreeText: {
    flex: 1,
    color: colors.inkSoft,
    fontSize: 13,
    lineHeight: 20,
  },
  privacyBox: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: colors.bgSoft,
    gap: 5,
  },
  privacyText: {
    color: colors.inkSoft,
    fontSize: 12,
    lineHeight: 18,
  },
  quickBox: {
    marginTop: 22,
    padding: 16,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.soft,
  },
  quickTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
    textAlign: 'center',
  },
  submitBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: 'rgba(251,248,241,0.97)',
    borderTopColor: colors.line,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
