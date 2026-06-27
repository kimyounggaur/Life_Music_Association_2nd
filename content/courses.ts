import { colors, type CourseColor } from '@/lib/theme';

export type CourseId = 'level' | 'fast' | 'fusion' | 'advanced';

export interface CourseGroup {
  label: string;
  instruments: readonly string[];
}

export interface CourseType {
  id: CourseId;
  no: string;
  title: string;
  href: string;
  color: CourseColor;
  when: string;
  summary: string;
  image: string;
  groups?: readonly CourseGroup[];
  durations?: readonly string[];
}

export interface FusionItem {
  title: string;
  time: string;
  note?: string;
}

export interface FusionGroup {
  id: string;
  label: string;
  items: readonly FusionItem[];
}

export interface CourseFaq {
  q: string;
  a: string;
}

export const courseTypes: readonly CourseType[] = [
  {
    id: 'level',
    no: '01',
    title: '급수별 자격과정',
    href: '/courses/level',
    color: colors.courseLevel,
    when: '상시 모집',
    summary: '1급~3급 체계로 악기별 실기와 교수법을 단계적으로 취득하는 정규 자격과정.',
    image: 'poster-level',
    groups: [
      {
        label: '1급~3급',
        instruments: ['칼림바', '텅드럼', '미니하프', '기타', '우쿨렐레', '기타렐레', '밴드', '드럼', '타악기'],
      },
      {
        label: '1급~2급',
        instruments: ['가창합창', '보컬', '난타', '장구난타', '스푼난타', '실로폰', '핸드벨&톤차임', '컵타', '소고'],
      },
    ],
  },
  {
    id: 'fast',
    no: '02',
    title: '자격 과정별 속성과정',
    href: '/courses/fast',
    color: colors.courseFast,
    when: '상시 모집 · 단기 집중',
    summary: '단기간에 핵심 실기와 수업 운영법을 집중 이수하는 속성 자격과정.',
    image: 'poster-fast',
    groups: [
      { label: '6시간 과정', instruments: [] },
      { label: '4시간 과정', instruments: [] },
    ],
  },
  {
    id: 'fusion',
    no: '03',
    title: '카테고리별 융합수업',
    href: '/courses/fusion',
    color: colors.courseFusion,
    when: '협의 후 진행',
    summary: '여러 악기·활동을 묶어 한 회차에 융합하는 기관 맞춤 수업 설계.',
    image: 'poster-fusion',
  },
  {
    id: 'advanced',
    no: '04',
    title: '자격 과정별 심화수업',
    href: '/courses/advanced',
    color: colors.courseAdvanced,
    when: '기간 선택형',
    summary: '취득 자격을 바탕으로 레퍼토리·합주·지도력을 끌어올리는 심화 트랙.',
    image: 'poster-advanced',
    durations: ['4주 심화', '8주 심화', '12주 심화', '24주 심화'],
  },
] as const;

export type Course = CourseType;

export const fusionGroups = [
  {
    id: 'fg1',
    label: '리듬 융합',
    items: [
      { title: '난타 + 스푼난타', time: '40분' },
      { title: '컵타 + 소고', time: '40분' },
    ],
  },
  {
    id: 'fg2',
    label: '멜로디 융합',
    items: [
      { title: '칼림바 + 미니하프', time: '40분' },
      { title: '실로폰 + 톤차임', time: '40분' },
    ],
  },
  { id: 'fg3', label: '현악 융합', items: [{ title: '기타 + 우쿨렐레', time: '40분' }] },
  { id: 'fg4', label: '합주 융합', items: [{ title: '밴드 합주', time: '50분', note: '4인 이상 권장' }] },
  { id: 'fg5', label: '전통 융합', items: [{ title: '장구난타 + 소고', time: '40분' }] },
  { id: 'fg6', label: '보컬 융합', items: [{ title: '가창합창 + 보컬', time: '40분' }] },
  { id: 'fg7', label: '디지털 융합', items: [{ title: '디지털 합주', time: '50분', note: '앱·반주 활용' }] },
] as const satisfies readonly FusionGroup[];

export const fusionExamples = [
  '복지관 어르신 대상: 난타 + 스푼난타로 손·어깨 활동량을 높인 합주 수업',
  '방과후 교실: 칼림바 + 미니하프로 멜로디 감각을 키우는 입문 융합',
  '주간보호센터: 컵타 + 소고로 박자감을 자극하는 리듬 융합',
] as const;

export const courseFaqs = [
  {
    q: '음악 비전공자도 수강할 수 있나요?',
    a: '네, 입문 단계부터 단계별 커리큘럼으로 설계되어 비전공자도 수강 가능합니다.',
  },
  {
    q: '자격증은 어디에 활용할 수 있나요?',
    a: '복지관·주간보호센터·방과후 등 기관 수업 강사 활동에 활용할 수 있습니다.',
  },
  {
    q: '수강료와 일정은 어떻게 확인하나요?',
    a: '과정·인원·지역에 따라 달라 별도 문의로 안내드립니다. 전화 또는 네이버카페로 연락 주세요.',
  },
] as const satisfies readonly CourseFaq[];

export function getCourseById(id?: string | string[]) {
  const value = Array.isArray(id) ? id[0] : id;
  return courseTypes.find((course) => course.id === value);
}
