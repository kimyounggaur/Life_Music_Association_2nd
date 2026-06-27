import { Activity, Bell, BriefcaseBusiness, Image as ImageIcon } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandHeader } from '@/components/layout/BrandHeader';
import { Screen } from '@/components/layout/Screen';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { storiesByTab, storyTabs, type StoryTabId } from '@/content/stories';
import { colors, radius } from '@/lib/theme';

const iconByTab = {
  notice: Bell,
  case: BriefcaseBusiness,
  activity: Activity,
  gallery: ImageIcon,
} as const;

export default function StoriesScreen() {
  const [active, setActive] = useState<StoryTabId>('notice');
  const tab = storyTabs.find((item) => item.id === active) ?? storyTabs[0];
  const items = useMemo(() => storiesByTab(active), [active]);
  const Icon = iconByTab[active];

  return (
    <Screen bottomInset={80}>
      <BrandHeader title="스토리" back />
      <SectionHeader eyebrow="Stories" title="소식과 활동" caption="공지·기관수업 사례·강사 활동·갤러리는 데이터가 추가되면 자동으로 표시됩니다." />

      <View style={styles.tabBar}>
        {storyTabs.map((item) => {
          const isActive = item.id === active;
          return (
            <Pressable key={item.id} onPress={() => setActive(item.id)} style={[styles.tab, isActive && styles.tabActive]}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {items.length === 0 ? (
        <View>
          {active === 'gallery' && (
            <View style={styles.placeholderGrid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.placeholderCell} />
              ))}
            </View>
          )}
          <EmptyState title={tab.emptyTitle} message={tab.emptyMessage} icon={Icon} />
        </View>
      ) : (
        <View style={styles.storyList}>
          {items.map((item) => (
            <View key={item.id} style={styles.storyCard}>
              <Text style={styles.storyTitle}>{item.title}</Text>
              <Text style={styles.storyDate}>{item.date}</Text>
              {item.excerpt && <Text style={styles.storyExcerpt}>{item.excerpt}</Text>}
            </View>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabBar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20 },
  tab: { minHeight: 40, paddingHorizontal: 13, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { color: colors.inkSoft, fontSize: 14, fontWeight: '800' },
  tabTextActive: { color: colors.white },
  placeholderGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 20, marginTop: 24, opacity: 0.7 },
  placeholderCell: { width: '31.8%', aspectRatio: 1, borderRadius: 16, backgroundColor: colors.bgSoft },
  storyList: { padding: 20, gap: 10 },
  storyCard: { padding: 16, borderRadius: radius.card, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.line },
  storyTitle: { color: colors.ink, fontSize: 17, fontWeight: '900' },
  storyDate: { color: colors.inkSoft, fontSize: 13, marginTop: 5 },
  storyExcerpt: { color: colors.inkSoft, fontSize: 14, lineHeight: 21, marginTop: 8 },
});
