import { Platform, type ViewStyle } from 'react-native';

export const colors = {
  bg: '#FBF8F1',
  bgSoft: '#F4EEE2',
  bgMint: '#E6F5F2',
  surface: '#FFFFFF',
  primary: '#1B9E8F',
  primaryDeep: '#137A6E',
  primarySoft: '#7FD1C6',
  coral: '#F2715A',
  mustard: '#F2B441',
  lilac: '#B59AD1',
  ink: '#1F2A28',
  inkSoft: '#5C6A66',
  line: '#E7E1D4',
  courseLevel: '#2A6FDB',
  courseFast: '#3AA655',
  courseFusion: '#E0732B',
  courseAdvanced: '#9B5E7A',
  white: '#FFFFFF',
} as const;

export const radius = {
  card: 20,
  panel: 28,
  pill: 999,
} as const;

export const shadow = {
  soft: {
    boxShadow: '0 3px 10px rgba(31,42,40,0.07)',
  } as ViewStyle,
} as const;

export const fonts = {
  sans: Platform.select({ ios: 'Apple SD Gothic Neo', android: 'sans-serif', default: 'system' }),
  display: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
} as const;

export type CourseColor =
  | typeof colors.courseLevel
  | typeof colors.courseFast
  | typeof colors.courseFusion
  | typeof colors.courseAdvanced;
