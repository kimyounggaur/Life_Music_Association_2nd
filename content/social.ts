import type { ImageSourcePropType } from 'react-native';

export interface SocialLink {
  key: string;
  label: string;
  url: string | null;
  icon: ImageSourcePropType;
}

export const socialLinks = [
  { key: 'instagram', label: '인스타그램', url: null, icon: require('@/assets/kmla/sns/instagram.png') },
  { key: 'youtube', label: '유튜브', url: null, icon: require('@/assets/kmla/sns/youtube.png') },
  { key: 'facebook', label: '페이스북', url: null, icon: require('@/assets/kmla/sns/facebook.png') },
  { key: 'x', label: 'X', url: null, icon: require('@/assets/kmla/sns/x.png') },
  { key: 'threads', label: '스레드', url: null, icon: require('@/assets/kmla/sns/threads.png') },
  { key: 'tiktok', label: '틱톡', url: null, icon: require('@/assets/kmla/sns/tiktok.png') },
  { key: 'linkedin', label: '링크드인', url: null, icon: require('@/assets/kmla/sns/linkedin.png') },
  { key: 'kakao', label: '카카오톡', url: null, icon: require('@/assets/kmla/sns/kakao.jpg') },
] as const satisfies readonly SocialLink[];

export const etcIcons = {
  phone: require('@/assets/kmla/etc/phone.png'),
  naver: require('@/assets/kmla/etc/naver.jpg'),
  email: require('@/assets/kmla/etc/email.png'),
  site: require('@/assets/kmla/etc/site.png'),
} as const;
