<p align="center">
  <img src="https://img.shields.io/badge/POREST-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="POREST" />
</p>

<h1 align="center">POREST HR Frontend</h1>

<p align="center">
  <strong>사업장 근로자를 위한 일정관리 및 휴가관리 서비스</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## 소개

**POREST HR Frontend**는 [POREST](https://github.com/lshdainty/POREST) 서비스의 HR(인사관리) 프론트엔드입니다.

React 19와 TypeScript를 기반으로 하며, shadcn/ui 컴포넌트와 Tailwind CSS를 사용하여 모던한 UI를 구현했습니다.

---

## 기술 스택

| Category | Technology |
|----------|------------|
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript_5.9-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Framework** | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) |
| **Build Tool** | ![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) |
| **UI Library** | ![Ant Design](https://img.shields.io/badge/Ant_Design_5-0170FE?style=flat-square&logo=antdesign&logoColor=white) ![MUI](https://img.shields.io/badge/MUI_7-007FFF?style=flat-square&logo=mui&logoColor=white) |
| **State Management** | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square) ![Jotai](https://img.shields.io/badge/Jotai-000000?style=flat-square) |
| **Routing** | ![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white) |
| **Form** | ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white) |
| **Chart** | ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square) |
| **DnD** | ![dnd-kit](https://img.shields.io/badge/dnd--kit-EF4444?style=flat-square) ![react-dnd](https://img.shields.io/badge/react--dnd-CA4245?style=flat-square) |
| **i18n** | ![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat-square&logo=i18next&logoColor=white) |

---

## 프로젝트 구조

```text
src/
├── app/             # 앱 초기화, 라우터, 전역 Provider, 설정
├── entities/        # 도메인 엔티티 API/모델 (user, vacation, work 등)
├── features/        # 기능 단위 모듈 (admin-*, vacation-*, work-*, auth 등)
├── pages/           # 라우트 단위 페이지 컴포넌트
├── shared/          # 공용 API/자산/설정/훅/UI
├── widgets/         # 화면 조합 위젯 (layout, sidebar, notice-popup)
├── locales/         # 다국어 리소스 (ko, en)
├── main.tsx         # 엔트리포인트
└── index.css        # 전역 스타일
```

---

## 시작하기

### 요구사항

- **Node.js**: 18+
- **npm**: 9+ (또는 yarn, pnpm)

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 프리뷰
npm run serve

# 린트 검사
npm run lint

# 다국어 파일 생성
npm run i18n:generate
```

---

## 국제화 (i18n)

번역 키는 CSV 파일을 **단일 소스(Single Source of Truth)**로 관리하며, 빌드 시 자동으로 JSON 파일이 생성됩니다.

```text
i18n/
└── translations.csv      # 마스터 번역 파일 (ko/en 포함, 이 파일만 직접 수정)

src/locales/              # 자동 생성 (직접 수정 금지)
├── en/                   # 영어 JSON (자동 생성)
└── ko/                   # 한국어 JSON (자동 생성)
```

번역 추가 시 `i18n/translations.csv`에 키와 값을 등록한 후 `npm run i18n:generate`를 실행하세요.

---

## 관련 저장소

| Repository | Description |
|------------|-------------|
| [POREST](https://github.com/lshdainty/POREST) | 통합 레포지토리 (서비스 소개) |
| [porest-hr-back](https://github.com/lshdainty/porest-hr-back) | HR 백엔드 |
| [porest-core](https://github.com/lshdainty/porest-core) | 공통 라이브러리 |
| [porest-sso-back](https://github.com/lshdainty/porest-sso-back) | SSO 백엔드 |
| [porest-sso-front](https://github.com/lshdainty/porest-sso-front) | SSO 프론트엔드 |

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/lshdainty">lshdainty</a>
</p>
