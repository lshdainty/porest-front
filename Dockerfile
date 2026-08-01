FROM node:22-alpine AS builder

WORKDIR /app

# 의존성 설치
COPY package.json package-lock.json* ./
RUN npm ci

# 소스 복사 및 빌드
# build (tsc -b && vite build) 사용 — 타입 오류가 배포를 막도록 한다.
# (기존 build:skip-check 는 tsc 를 건너뛰어 타입 오류가 그대로 배포됐다)
COPY . .
RUN npm run i18n:generate && npm run build

# 실행 단계
FROM nginx:alpine AS runtime

# nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
