import { z } from 'zod';

/**
 * 비밀번호 규칙 — SSO 서버 정책과 1:1.
 * (`@Size(min = 8)` + `@Pattern(regexp = "^(?=.*[^a-zA-Z0-9]).+$")`)
 *
 * 입력 중 체크리스트(`PasswordRequirements`)와 제출 검증(`createNewPasswordSchema`)이
 * 이 배열 하나만 바라본다 — 정책이 바뀌면 여기만 고치면 양쪽이 함께 따라간다.
 * 라벨/메시지는 `user` 네임스페이스의 i18n 키다.
 */
export const PASSWORD_RULES = [
  {
    key: 'length',
    labelKey: 'passwordRuleLength',
    messageKey: 'passwordTooShort',
    test: (value: string) => value.length >= 8,
  },
  {
    key: 'special',
    labelKey: 'passwordRuleSpecial',
    messageKey: 'passwordNoSpecial',
    test: (value: string) => /[^a-zA-Z0-9]/.test(value),
  },
] as const;

const [LENGTH_RULE, SPECIAL_RULE] = PASSWORD_RULES;

/** 모든 규칙 충족 여부 — 폼을 쓰지 않는 화면의 버튼 활성 판단용. */
export const isPasswordValid = (password: string) =>
  PASSWORD_RULES.every((rule) => rule.test(password));

/**
 * 새 비밀번호 필드용 zod 스키마.
 * 프론트에서 먼저 걸러야 저장 후 서버 400 으로 되돌아오지 않는다.
 */
export const createNewPasswordSchema = (t: (key: string) => string) =>
  z
    .string()
    .min(1, t('newPasswordRequired'))
    .refine((value) => LENGTH_RULE.test(value), t(LENGTH_RULE.messageKey))
    .refine((value) => SPECIAL_RULE.test(value), t(SPECIAL_RULE.messageKey));
