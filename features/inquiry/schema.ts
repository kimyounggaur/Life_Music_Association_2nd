import { z } from 'zod';

const PHONE_REGEX = /^01[016789]-?\d{3,4}-?\d{4}$/;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, '이름을 2자 이상 입력해 주세요').max(20, '이름은 20자 이내로 입력해 주세요'),
  phone: z.string().trim().regex(PHONE_REGEX, '올바른 휴대폰 번호를 입력해 주세요 (예: 010-1234-5678)'),
  type: z.enum(['license', 'institution', 'book', 'etc'], '문의 유형을 선택해 주세요'),
  interests: z.array(z.string()).max(8, '관심 항목은 최대 8개까지 선택할 수 있어요').default([]),
  region: z.string().optional(),
  message: z.string().trim().max(500, '문의 내용은 500자 이내로 입력해 주세요').optional().or(z.literal('')),
  agree: z.boolean().refine((value) => value, '개인정보 수집·이용에 동의해 주세요'),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type InquiryData = z.output<typeof inquirySchema>;

export const normalizePhone = (raw: string) => raw.replace(/[^0-9]/g, '');

export const maskPhone = (raw: string) =>
  normalizePhone(raw)
    .replace(/^(\d{3})(\d{4})(\d{4}).*$/, '$1-$2-$3')
    .replace(/^(\d{3})(\d{3})(\d{0,4}).*$/, '$1-$2-$3')
    .replace(/-$/, '');
