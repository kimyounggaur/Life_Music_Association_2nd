import type { InquiryData } from './schema';

export type SubmitResult =
  | { ok: true; ref: string; via: 'endpoint' | 'local' }
  | { ok: false; reason: string };

function buildRef() {
  const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LMLA-${date}-${suffix}`;
}

export async function submitInquiry(data: InquiryData): Promise<SubmitResult> {
  const ref = buildRef();
  const endpoint = process.env.EXPO_PUBLIC_CONTACT_ENDPOINT;

  if (!endpoint) {
    return { ok: true, ref, via: 'local' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref, ...data }),
    });

    if (!response.ok) {
      return { ok: false, reason: '문의 전송에 실패했습니다. 전화 또는 네이버카페로 문의해 주세요.' };
    }

    return { ok: true, ref, via: 'endpoint' };
  } catch {
    return { ok: false, reason: '일시적인 오류가 발생했어요. 전화 또는 네이버카페로 문의해 주세요.' };
  }
}
