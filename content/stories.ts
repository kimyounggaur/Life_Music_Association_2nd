export type StoryTabId = 'notice' | 'case' | 'activity' | 'gallery';

export interface Story {
  id: string;
  tab: StoryTabId;
  title: string;
  date: string;
  excerpt?: string;
  cover?: string;
  href?: string;
}

export interface StoryTab {
  id: StoryTabId;
  label: string;
  emptyTitle: string;
  emptyMessage: string;
  icon: string;
}

export const storyTabs = [
  { id: 'notice', label: '공지사항', icon: 'Megaphone', emptyTitle: '공지 준비 중', emptyMessage: '새로운 공지가 등록되면 이곳에 표시됩니다.' },
  { id: 'case', label: '기관수업 사례', icon: 'Building2', emptyTitle: '사례 준비 중', emptyMessage: '기관 출강 사례를 곧 공유할 예정입니다.' },
  { id: 'activity', label: '강사 활동 소식', icon: 'Users', emptyTitle: '소식 준비 중', emptyMessage: '강사님들의 활동 소식을 준비하고 있어요.' },
  { id: 'gallery', label: '갤러리', icon: 'Image', emptyTitle: '갤러리 준비 중', emptyMessage: '수업·행사 사진을 곧 담을 예정입니다.' },
] as const satisfies readonly StoryTab[];

export const stories: Story[] = [];

export function storiesByTab(tab: StoryTabId): Story[] {
  return stories.filter((story) => story.tab === tab);
}
