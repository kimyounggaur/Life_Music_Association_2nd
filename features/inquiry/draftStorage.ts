import AsyncStorage from '@react-native-async-storage/async-storage';

import type { InquiryData } from './schema';

const KEY = 'kmla:inquiry-draft:v1';

export async function saveDraft(values: Partial<InquiryData>) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    // Draft saving is best-effort only.
  }
}

export async function loadDraft(): Promise<Partial<InquiryData> | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<InquiryData>) : null;
  } catch {
    return null;
  }
}

export async function clearDraft() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    // Best-effort only.
  }
}
