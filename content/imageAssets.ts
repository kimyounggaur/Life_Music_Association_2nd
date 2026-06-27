import type { ImageSourcePropType } from 'react-native';

export const imageAssets: Record<string, ImageSourcePropType> = {
  'poster-level': require('@/assets/kmla/posters/level.png'),
  'poster-fast': require('@/assets/kmla/posters/fast.png'),
  'poster-fusion': require('@/assets/kmla/posters/fusion.png'),
  'poster-advanced': require('@/assets/kmla/posters/advanced.png'),
  process: require('@/assets/kmla/posters/process.png'),
  brochure: require('@/assets/kmla/posters/brochure.jpg'),
  trend: require('@/assets/kmla/posters/trend.jpg'),
  qr: require('@/assets/kmla/posters/sns-qr.jpg'),
  'about-01': require('@/assets/kmla/about/about-01.jpg'),
  'about-02': require('@/assets/kmla/about/about-02.jpg'),
};

export const cardNews = [
  require('@/assets/kmla/cardnews/cardnews-1.jpg'),
  require('@/assets/kmla/cardnews/cardnews-2.jpg'),
  require('@/assets/kmla/cardnews/cardnews-3.jpg'),
  require('@/assets/kmla/cardnews/cardnews-4.jpg'),
  require('@/assets/kmla/cardnews/cardnews-5.jpg'),
  require('@/assets/kmla/cardnews/cardnews-6.jpg'),
] as const;

export const processSteps = [
  require('@/assets/kmla/outline/outline-1.png'),
  require('@/assets/kmla/outline/outline-2.png'),
  require('@/assets/kmla/outline/outline-3.png'),
  require('@/assets/kmla/outline/outline-4.png'),
  require('@/assets/kmla/outline/outline-5.png'),
  require('@/assets/kmla/outline/outline-6.png'),
  require('@/assets/kmla/outline/outline-7.png'),
  require('@/assets/kmla/outline/outline-8.png'),
  require('@/assets/kmla/outline/outline-9.png'),
] as const;

export function getImage(key?: string): ImageSourcePropType | undefined {
  return key ? imageAssets[key] : undefined;
}
