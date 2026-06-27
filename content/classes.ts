export type ClassCategoryId = 'strings' | 'percussion' | 'traditional' | 'voice' | 'digital';

export interface ClassItem {
  name: string;
  features: readonly string[];
}

export interface ClassCategory {
  id: ClassCategoryId;
  label: string;
  accent: string;
  classes: readonly ClassItem[];
}

export const classCategories = [
  {
    id: 'strings',
    label: '현악',
    accent: '#1B9E8F',
    classes: [
      { name: '기타', features: ['코드 반주 입문', '동요·가요 연주', '합주 확장'] },
      { name: '우쿨렐레', features: ['작은 손에도 부담 없음', '빠른 성취감', '단체 합주'] },
      { name: '미니하프', features: ['맑은 음색', '집중·정서 안정', '멜로디 입문'] },
      { name: '칼림바', features: ['누구나 즉시 소리', '힐링 수업', '번호 악보'] },
    ],
  },
  {
    id: 'percussion',
    label: '타악',
    accent: '#F2715A',
    classes: [
      { name: '드럼', features: ['리듬감 강화', '에너지 발산', '밴드 연계'] },
      { name: '카혼', features: ['앉아서 연주', '몸 전체 리듬', '핸디한 교구'] },
      { name: '젬베', features: ['공동체 리듬', '활동량 큼', '즉흥 연주'] },
      { name: '실로폰', features: ['음정 학습', '합주 멜로디', '저연령 적합'] },
      { name: '타악기', features: ['소근육 자극', '협응력', '단체 활동'] },
    ],
  },
  {
    id: 'traditional',
    label: '난타·전통',
    accent: '#F2B441',
    classes: [
      { name: '난타', features: ['신나는 합주', '스트레스 해소', '대규모 가능'] },
      { name: '스푼난타', features: ['저비용 교구', '어르신 인기', '손 협응'] },
      { name: '장구', features: ['우리 가락', '장단 학습', '전통 정서'] },
      { name: '소고', features: ['이동 합주', '리듬 놀이', '단체 율동'] },
      { name: '컵타', features: ['컵 하나로 시작', '집중력', '리듬 패턴'] },
    ],
  },
  {
    id: 'voice',
    label: '가창·보컬',
    accent: '#B59AD1',
    classes: [
      { name: '가창합창', features: ['함께 부르는 즐거움', '호흡·발성', '정서 교류'] },
      { name: '보컬', features: ['발성 교정', '곡 표현력', '자신감 향상'] },
      { name: '핸드벨&톤차임', features: ['협동 연주', '화음 체험', '집중·협응'] },
    ],
  },
  {
    id: 'digital',
    label: '밴드·디지털',
    accent: '#137A6E',
    classes: [
      { name: '밴드', features: ['파트 협업', '무대 경험', '성취감 큼'] },
      { name: '베이스기타', features: ['저음 그루브', '밴드 기초', '합주 핵심'] },
      { name: '실용반주', features: ['반주 패턴', '코드 응용', '현장 활용'] },
      { name: '아살라토', features: ['양손 리듬', '집중·균형', '휴대 간편'] },
      { name: '디지털 합주', features: ['앱·반주 활용', '파트 협업', '기관 디지털 수업에 적합'] },
    ],
  },
] as const satisfies readonly ClassCategory[];

export const flatClasses = classCategories.flatMap((category) =>
  category.classes.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryLabel: category.label,
    accent: category.accent,
  })),
);

export const highlightedClasses = [
  { name: '디지털 합주', categoryId: 'digital', badge: 'NEW' },
  { name: '스푼난타', categoryId: 'traditional', badge: '인기' },
  { name: '소고난타', categoryId: 'traditional', badge: '추천' },
] as const;

export function classesByCategory(id: ClassCategoryId | 'all') {
  return id === 'all' ? flatClasses : flatClasses.filter((item) => item.categoryId === id);
}
