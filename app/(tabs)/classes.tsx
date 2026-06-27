import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronDown, MessageCircle } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { LayoutAnimation, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Padded, Screen } from '@/components/layout/Screen';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { classCategories, classesByCategory, highlightedClasses, type ClassCategoryId } from '@/content/classes';
import { getInstrumentIcon } from '@/content/instruments';
import { tapLight } from '@/lib/haptics';
import { colors, fonts, radius, shadow } from '@/lib/theme';

export default function ClassesScreen() {
  const router = useRouter();
  const [active, setActive] = useState<ClassCategoryId | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const list = useMemo(() => classesByCategory(active), [active]);

  return (
    <Screen bottomInset={108}>
      <BrandHeader title="클래스" />
      <SectionHeader eyebrow="Class" title="계열별 생활음악 수업" caption="기관·연령·회차에 맞춰 다양한 악기와 활동을 조합합니다." />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.highlightList}>
        {highlightedClasses.map((item) => (
          <View key={item.name} style={styles.highlightCard}>
            <Image source={getInstrumentIcon(item.name, 'player')} accessibilityLabel={`${item.name} 아이콘`} contentFit="contain" style={styles.highlightIcon} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
            <Text style={styles.highlightTitle}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterBar}>
        <FilterChip label="전체" active={active === 'all'} onPress={() => setActiveCategory('all')} />
        {classCategories.map((category) => (
          <FilterChip key={category.id} label={category.label} active={active === category.id} onPress={() => setActiveCategory(category.id)} />
        ))}
      </ScrollView>

      <View style={styles.list}>
        {list.map((item) => {
          const isOpen = expanded === item.name;
          return (
            <Pressable
              key={`${item.categoryId}-${item.name}`}
              accessibilityRole="button"
              accessibilityLabel={`${item.name} 수업 특징 ${isOpen ? '닫기' : '열기'}`}
              onPress={() => {
                tapLight();
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setExpanded(isOpen ? null : item.name);
              }}
              style={styles.classCard}
            >
              <View style={styles.classHead}>
                <Image source={getInstrumentIcon(item.name, 'player')} accessibilityLabel={`${item.name} 아이콘`} contentFit="contain" style={styles.classIcon} />
                <View style={styles.classText}>
                  <Text style={styles.className}>{item.name}</Text>
                  <Text style={styles.classCategory}>{item.categoryLabel}</Text>
                </View>
                <ChevronDown size={20} color={colors.inkSoft} style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }} />
              </View>
              {isOpen && (
                <View style={styles.features}>
                  {item.features.map((feature) => (
                    <View key={feature} style={styles.featureRow}>
                      <View style={[styles.featureDot, { backgroundColor: item.accent }]} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <Padded>
        <View style={styles.cta}>
          <Text style={styles.ctaTitle}>원하는 수업이 없나요?</Text>
          <Text style={styles.ctaText}>기관 상황에 맞춰 수업 구성을 함께 조율합니다.</Text>
          <PrimaryButton label="기관수업으로 문의하기" onPress={() => router.push({ pathname: '/contact', params: { type: 'institution' } })} icon={<MessageCircle size={18} color={colors.white} />} />
        </View>
      </Padded>
    </Screen>
  );

  function setActiveCategory(next: ClassCategoryId | 'all') {
    tapLight();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(null);
    setActive(next);
  }
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.filterChip, active && styles.filterChipActive]}>
      <Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  highlightList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  highlightCard: {
    width: 178,
    minHeight: 146,
    padding: 15,
    borderRadius: radius.card,
    backgroundColor: colors.bgMint,
    borderWidth: 1,
    borderColor: colors.primarySoft,
    ...shadow.soft,
  },
  highlightIcon: {
    width: 68,
    height: 68,
  },
  badge: {
    position: 'absolute',
    top: 14,
    right: 14,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.coral,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  highlightTitle: {
    marginTop: 12,
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  filterBar: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
    gap: 8,
  },
  filterChip: {
    minHeight: 40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    color: colors.inkSoft,
    fontSize: 14,
    fontWeight: '800',
  },
  filterTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  classCard: {
    padding: 15,
    borderRadius: radius.card,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.soft,
  },
  classHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  classIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: colors.bgSoft,
  },
  classText: {
    flex: 1,
  },
  className: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '900',
    fontFamily: fonts.sans,
  },
  classCategory: {
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 3,
  },
  features: {
    paddingTop: 14,
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  featureDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  featureText: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  cta: {
    marginTop: 24,
    padding: 20,
    borderRadius: radius.panel,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.soft,
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
