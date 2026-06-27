export interface SiteContact {
  phone: string;
  tel: string;
  cafe: string;
  kakao: string | null;
  email: string | null;
  address: string | null;
}

export interface Site {
  name: string;
  englishName: string;
  tagline: string;
  motto: string;
  description: string;
  contact: SiteContact;
}

export const site: Site = {
  name: '한국생활음악강사협회',
  englishName: 'Life Music Lecturer Association Of Korea',
  tagline: '기관 수업에 특화된 생활음악 교육 협회',
  motto: '실력과 교수법을 겸비한 전문강사 양성',
  description:
    '기관 수업에 바로 활용할 수 있는 커리큘럼·자격과정·교재·연습곡집·수업용 PPT·수업교구를 연구하고 개발합니다.',
  contact: {
    phone: '010-5655-9152',
    tel: 'tel:01056559152',
    cafe: 'https://cafe.naver.com/tonguedrum',
    kakao: null,
    email: null,
    address: null,
  },
};

export const conversionGoals = [
  { id: 'license', label: '자격과정 문의' },
  { id: 'institution', label: '기관수업 문의' },
  { id: 'trust', label: '교재·연습곡집' },
] as const;
