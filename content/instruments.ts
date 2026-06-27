import type { ImageSourcePropType } from 'react-native';

export const subjectIcons: Record<string, ImageSourcePropType> = {
  칼림바: require('@/assets/kmla/icons/subject/kalimba.jpg'),
  텅드럼: require('@/assets/kmla/icons/subject/tonguedrum.png'),
  미니하프: require('@/assets/kmla/icons/subject/miniharp.png'),
  기타: require('@/assets/kmla/icons/subject/guitar.png'),
  기타렐레: require('@/assets/kmla/icons/subject/guitar.png'),
  일렉기타: require('@/assets/kmla/icons/subject/electric-guitar.png'),
  베이스: require('@/assets/kmla/icons/subject/bass.png'),
  베이스기타: require('@/assets/kmla/icons/subject/bass-guitar.png'),
  우쿨렐레: require('@/assets/kmla/icons/subject/ukulele.png'),
  드럼: require('@/assets/kmla/icons/subject/drum.jpg'),
  컵타: require('@/assets/kmla/icons/subject/cupta.png'),
  난타: require('@/assets/kmla/icons/subject/nanta.png'),
  장구: require('@/assets/kmla/icons/subject/janggu.png'),
  장구난타: require('@/assets/kmla/icons/subject/janggu.png'),
  젬베: require('@/assets/kmla/icons/subject/djembe.png'),
  카혼: require('@/assets/kmla/icons/subject/cajon.png'),
  아살라토: require('@/assets/kmla/icons/subject/asalato.png'),
  실용반주: require('@/assets/kmla/icons/subject/accompaniment.png'),
  톤차임: require('@/assets/kmla/icons/subject/tonechime.png'),
  '핸드벨&톤차임': require('@/assets/kmla/icons/subject/tonechime.png'),
  실로폰: require('@/assets/kmla/icons/subject/xylophone.png'),
  밴드: require('@/assets/kmla/icons/subject/band.jpg'),
  스푼난타: require('@/assets/kmla/icons/subject/spoon-nanta.jpg'),
  소고: require('@/assets/kmla/icons/subject/nanta.png'),
  소고난타: require('@/assets/kmla/icons/subject/nanta.png'),
  가창합창: require('@/assets/kmla/icons/player/vocal-choir.jpg'),
  가창: require('@/assets/kmla/icons/player/vocal-choir.jpg'),
  보컬: require('@/assets/kmla/icons/player/vocal-training.png'),
  보컬트레이닝: require('@/assets/kmla/icons/player/vocal-training.png'),
  타악기: require('@/assets/kmla/icons/player/percussion.jpg'),
  리듬악기: require('@/assets/kmla/icons/player/rhythm.jpg'),
  무릎카혼: require('@/assets/kmla/icons/player/knee-cajon.jpg'),
  '디지털 합주': require('@/assets/kmla/icons/player/band.jpg'),
};

export const playerIcons: Record<string, ImageSourcePropType> = {
  가창합창: require('@/assets/kmla/icons/player/vocal-choir.jpg'),
  '가창·합창': require('@/assets/kmla/icons/player/vocal-choir.jpg'),
  기타: require('@/assets/kmla/icons/player/guitar.jpg'),
  난타: require('@/assets/kmla/icons/player/nanta.jpg'),
  드럼: require('@/assets/kmla/icons/player/drum.jpg'),
  리듬악기: require('@/assets/kmla/icons/player/rhythm.jpg'),
  무릎카혼: require('@/assets/kmla/icons/player/knee-cajon.jpg'),
  미니하프: require('@/assets/kmla/icons/player/miniharp.jpg'),
  밴드: require('@/assets/kmla/icons/player/band.jpg'),
  베이스기타: require('@/assets/kmla/icons/player/bass-guitar.png'),
  보컬: require('@/assets/kmla/icons/player/vocal-training.png'),
  보컬트레이닝: require('@/assets/kmla/icons/player/vocal-training.png'),
  스푼난타: require('@/assets/kmla/icons/player/spoon-nanta.jpg'),
  실로폰: require('@/assets/kmla/icons/player/xylophone.jpg'),
  실용반주: require('@/assets/kmla/icons/player/accompaniment.png'),
  아살라토: require('@/assets/kmla/icons/player/asalato.jpg'),
  우쿨렐레: require('@/assets/kmla/icons/player/ukulele.jpg'),
  장구: require('@/assets/kmla/icons/player/janggu.jpg'),
  칼림바: require('@/assets/kmla/icons/player/kalimba.png'),
  컵타: require('@/assets/kmla/icons/player/cupta.jpg'),
  타악기: require('@/assets/kmla/icons/player/percussion.jpg'),
  텅드럼: require('@/assets/kmla/icons/player/tonguedrum.jpg'),
  '핸드벨&톤차임': require('@/assets/kmla/icons/player/handbell-tonechime.jpg'),
  '디지털 합주': require('@/assets/kmla/icons/player/band.jpg'),
  소고난타: require('@/assets/kmla/icons/player/nanta.jpg'),
};

export const fallbackIcon: ImageSourcePropType = require('@/assets/kmla/icons/subject/tonguedrum.png');

export function getInstrumentIcon(name: string, variant: 'subject' | 'player' = 'subject') {
  const table = variant === 'player' ? playerIcons : subjectIcons;
  return table[name] ?? subjectIcons[name] ?? fallbackIcon;
}
