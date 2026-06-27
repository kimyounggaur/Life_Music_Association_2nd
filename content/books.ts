import type { ImageSourcePropType } from 'react-native';

export interface DonutRatio {
  label: string;
  value: number;
  color: string;
}

export interface SongbookSeries {
  id: string;
  title: string;
  description: string;
  note?: string;
  ratios: readonly DonutRatio[];
}

export interface BookCover {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export const songbookSeries: readonly SongbookSeries[] = [
  {
    id: 'lower',
    title: '저학년용',
    description: '동요·창작동요 중심으로 음악 흥미를 키우는 입문 연습곡집.',
    ratios: [
      { label: '동요', value: 50, color: '#1B9E8F' },
      { label: '창작동요', value: 30, color: '#7FD1C6' },
      { label: '대중곡', value: 20, color: '#F2B441' },
    ],
  },
  {
    id: 'teen',
    title: '청소년용',
    description: '인기 가요와 OST를 난이도별로 편곡한 연습곡집.',
    ratios: [
      { label: '가요', value: 45, color: '#F2715A' },
      { label: 'OST', value: 30, color: '#B59AD1' },
      { label: '팝', value: 25, color: '#2A6FDB' },
    ],
  },
  {
    id: 'adult',
    title: '성인용',
    description: '대중가요·발라드를 합주와 솔로로 즐기는 연습곡집.',
    ratios: [
      { label: '발라드', value: 40, color: '#137A6E' },
      { label: '가요', value: 40, color: '#1B9E8F' },
      { label: '트로트', value: 20, color: '#F2B441' },
    ],
  },
  {
    id: '7080',
    title: '7080',
    description: '추억의 7080 명곡으로 정서 교류와 합창에 적합한 연습곡집.',
    note: '복지관·주간보호 어르신 수업 인기',
    ratios: [
      { label: '7080 가요', value: 60, color: '#F2715A' },
      { label: '민요·동요', value: 25, color: '#3AA655' },
      { label: '트로트', value: 15, color: '#F2B441' },
    ],
  },
] as const;

export const bookCovers = [
  { id: 'guitar', title: '기타 교과서', image: require('@/assets/kmla/books/cover-guitar.jpg') },
  { id: 'nanta', title: '난타 교과서', image: require('@/assets/kmla/books/cover-nanta.png') },
  { id: 'bass-bite', title: '베이스기타 한입', image: require('@/assets/kmla/books/cover-bass-bite.png') },
  { id: 'ukulele', title: '우쿨렐레 교과서', image: require('@/assets/kmla/books/cover-ukulele.jpg') },
  { id: 'theory', title: '음악이론 교과서', image: require('@/assets/kmla/books/cover-theory.png') },
  { id: 'elec-bite', title: '일렉기타 한입', image: require('@/assets/kmla/books/cover-elec-bite.png') },
  { id: 'kalimba', title: '칼림바 교과서', image: require('@/assets/kmla/books/cover-kalimba.jpg') },
  { id: 'tonguedrum', title: '텅드럼 교과서', image: require('@/assets/kmla/books/cover-tonguedrum.jpg') },
  { id: 'handbell', title: '핸드벨&실로폰', image: require('@/assets/kmla/books/cover-handbell.jpg') },
] as const satisfies readonly BookCover[];

export const practiceCategories = ['기타', '우쿨렐레', '베이스', '일렉', '칼림바', '텅드럼', '실로폰', '드럼', '밴드', '컵타'] as const;

export const practiceCovers = [
  require('@/assets/kmla/songbooks/guitar-7080.png'),
  require('@/assets/kmla/songbooks/ukulele-7080-a.jpg'),
  require('@/assets/kmla/songbooks/kalimba-17.png'),
  require('@/assets/kmla/songbooks/tonguedrum-15.png'),
  require('@/assets/kmla/songbooks/bass-levelup.jpg'),
] as const;

export function validateDonutRatios(): void {
  if (!__DEV__) return;
  for (const series of songbookSeries) {
    const sum = series.ratios.reduce((total, ratio) => total + ratio.value, 0);
    if (sum !== 100) {
      console.warn(`[books] '${series.title}' ratios 합계가 ${sum}입니다.`);
    }
  }
}
