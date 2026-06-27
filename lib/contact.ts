import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';

import { site } from '@/content/site';

export const PHONE_DISPLAY = site.contact.phone;
export const TEL_URL = site.contact.tel;
export const CAFE_URL = site.contact.cafe;

export async function callAssociation() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
  try {
    const canOpen = await Linking.canOpenURL(TEL_URL);
    if (!canOpen) throw new Error('unsupported');
    await Linking.openURL(TEL_URL);
  } catch {
    Alert.alert('전화 연결 안내', `${PHONE_DISPLAY} 로 직접 연락해 주세요.`);
  }
}

export async function openCafe() {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
  try {
    await WebBrowser.openBrowserAsync(CAFE_URL);
  } catch {
    Alert.alert('카페 열기 안내', CAFE_URL);
  }
}

export async function copyPhone() {
  await Clipboard.setStringAsync(PHONE_DISPLAY);
  await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);
  Alert.alert('복사 완료', '전화번호를 복사했어요.');
}

export async function openExternalUrl(url: string | null) {
  if (!url) return;
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert('링크 열기 안내', url);
  }
}
