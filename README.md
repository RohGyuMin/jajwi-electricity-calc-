# 자취 전기세 계산기

원룸/자취생을 위한 전기요금 계산기입니다.  
월 사용량(kWh)을 입력하면 누진구간, 예상 청구액, 절약 시뮬레이션을 바로 확인할 수 있습니다.

## 주요 기능

- 월 전기 사용량 기반 예상 청구액 계산
- 누진구간(1/2/3단계) 및 다음 구간까지 남은 사용량 표시
- 지난달 대비 이번 달 예상 전기세 비교
- 절약 목표(kWh) 기반 절감액/연간 절약액 시뮬레이션
- AdSense 광고 컴포넌트 및 `public/ads.txt` 제공

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 환경 변수

`.env.local` 파일을 생성하고 아래 값을 설정하세요.

```bash
# Google Analytics (선택)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google AdSense (광고 사용 시 필수)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxxxxx

# 사이트 URL (sitemap/robots용)
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## AdSense 연결 체크리스트

1. 로컬/배포 환경에 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 설정
2. `public/ads.txt`에서 `pub-xxxxxxxxxxxxxxxx`를 실제 publisher ID로 교체
3. 재배포
4. `https://your-domain.com/ads.txt` 확인
5. 아래 형식으로 노출되는지 확인

```txt
google.com, pub-xxxxxxxxxxxxxxxx, DIRECT, f08c47fec0942fa0
```

6. 페이지 소스에서 아래 항목 확인
- `meta name="google-adsense-account"`
- `adsbygoogle.js?client=ca-pub-...`

## 스크립트

```bash
npm run dev     # 개발 서버
npm run lint    # ESLint 검사
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
```

## 배포

Vercel 배포를 기준으로, 환경변수를 먼저 등록한 뒤 배포하세요.

- `Project Settings -> Environment Variables`
- Production에 `NEXT_PUBLIC_ADSENSE_CLIENT_ID` 설정 필수
