export const INQUIRY_TYPES = [
  { value: 'license', label: '자격과정 문의', color: '#2A6FDB' },
  { value: 'institution', label: '기관수업 문의', color: '#3AA655' },
  { value: 'book', label: '교재·연습곡집', color: '#E0732B' },
  { value: 'etc', label: '기타 문의', color: '#9B5E7A' },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]['value'];

export const REGIONS = ['서울', '경기', '인천', '강원', '대전·충청', '대구·경북', '부산·울산·경남', '광주·전라', '제주', '전국/온라인'] as const;

export const INTEREST_OPTIONS = [
  '급수별 자격과정',
  '자격 과정별 속성과정',
  '카테고리별 융합수업',
  '자격 과정별 심화수업',
  '칼림바',
  '텅드럼',
  '미니하프',
  '기타',
  '우쿨렐레',
  '드럼',
  '컵타',
  '난타',
  '장구',
  '젬베',
  '카혼',
  '아살라토',
  '실용반주',
  '톤차임',
  '실로폰',
  '밴드',
  '베이스기타',
  '스푼난타',
  '가창합창',
  '핸드벨&톤차임',
] as const;
