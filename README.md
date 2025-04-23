# Translate-app: AI 기반 번역 웹 애플리케이션

현대적이고 미니멀한 디자인의 AI 기반 번역 웹 애플리케이션입니다. 사용자 친화적인 인터페이스와 강력한 번역 기능을 제공합니다.

## 🚀 주요 기능

- 직관적인 번역 인터페이스
- 이메일 기반 사용자 인증
- 파일 업로드를 통한 문서 번역
- 반응형 디자인

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Type Safety**: TypeScript

### AI/번역
- Vercel AI SDK
- OpenAI API 통합

### 인프라
- Vercel 호스팅
- Next.js API Routes

## 🎯 개발 마일스톤

### Phase 1: 기본 설정 및 UI 구현
- [x] 프로젝트 초기 설정 (Next.js, Tailwind CSS)
- [x] 기본 레이아웃 구현 (헤더, 푸터)
- [x] 반응형 디자인 적용
- [x] 랜딩 페이지 디자인

### Phase 2: 사용자 인증
- [ ] 이메일 유효성 검사 구현
- [ ] 로그인/회원가입 폼 개발
- [ ] 인증 상태 관리
- [ ] 보안 설정

### Phase 3: 파일 처리
- [ ] 파일 업로드 컴포넌트 구현
- [ ] 파일 형식 검증
- [ ] 파일 저장 및 관리
- [ ] 진행 상태 표시

### Phase 4: 번역 기능
- [ ] Vercel AI SDK 통합
- [ ] 번역 API 엔드포인트 구현
- [ ] 에러 처리

### Phase 5: 최적화 및 배포
- [ ] 성능 최적화
- [ ] 테스트 작성
- [ ] 문서화
- [ ] Vercel 배포

## 🚦 시작하기

```bash
# 저장소 클론
git clone https://github.com/your-username/translate-app.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🔑 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```
NEXT_PUBLIC_API_URL=your_api_url
OPENAI_API_KEY=your_openai_api_key
```

## �� 라이선스

## Documents
- [wiki](https://github.com/daehyun99/Using-AI-Tools-Front/wiki)
- [통합 wiki (v1.0.0)](https://github.com/daehyun99/Translate-app/wiki/Front-end)