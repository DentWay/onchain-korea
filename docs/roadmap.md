# Roadmap

> 완료된 단계와 앞으로의 계획

---

## 완료

### Phase 1: 콘텐츠 완성
- [x] 20개 레슨 한국어 콘텐츠 (4주 × 4~5개)
- [x] 4개 히든토픽 에디토리얼 아티클
- [x] GA 원문 매핑 + "원문 읽기" 링크
- [x] 팩트체크 (35개 클레임 검증, 출처 확보)
- [x] 2026.3 기준 최신 정보 업데이트

### Phase 2: 백엔드 + 인증
- [x] Supabase Auth (email + Google OAuth)
- [x] 진도 데이터 서버 동기화 (localStorage + Supabase)
- [x] enrollment_stats 실시간 통계
- [x] ProtectedRoute + Auth 페이지
- [x] supabase-schema.sql

### 디자인 + 전환율 최적화
- [x] 디자인 리뉴얼 (LessonDetail, Dashboard, WeekDetail)
- [x] 이모지 → Lucide 아이콘 전환
- [x] 랜딩 전환율 최적화 (앵커링, FAQ, InlineCTA, 인터랙티브 Proof of Attendance 미리보기)
- [x] 가짜 데이터 전면 제거
- [x] 커리큘럼 한국 시장 최적화 (순서 재구성)
- [x] Beta 뱃지 + 홈 링크

---

## 미완료

### Phase 3: 온체인 Proof of Attendance (다음 우선순위)
- [ ] Solana NFT Proof of Attendance 민팅 기능
- [ ] 수료 조건 달성 시 지갑 연결 → Metaplex Core 민팅
- [ ] Proof of Attendance 디자인 (온체인 메타데이터)
- [ ] Twitter/LinkedIn 공유 기능
- [ ] Certificate 페이지 완성 (현재 미리보기만) — 용어는 "Proof of Attendance"로 통일

### Phase 4: 커뮤니티
- [ ] 히든토픽 댓글/토론 기능
- [ ] 주간 리더보드
- [ ] 동기 진도 비교
- [ ] 카카오톡 오픈채팅 연동 (알림)

### 추가 개선 가능 사항
- [ ] Supabase 프로젝트 생성 + 환경변수 설정
- [ ] Google OAuth 활성화
- [ ] Vercel 환경변수 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] 모바일 최적화 심화 (sticky bottom CTA, LiveTicker 모바일 대응)
- [ ] A/B 테스트 (CTA 문구, 섹션 순서)
- [ ] 코드 스플리팅 (500KB+ 번들 경고 해결)
- [ ] E2E 테스트 (Playwright)
- [ ] 접근성 감사 (WAVE, axe)
- [ ] 레슨 콘텐츠에 출처 링크 직접 삽입
- [ ] 하드웨어 지갑 레슨 (w1-3) 보너스/선택 콘텐츠로 복원
- [ ] ActivityFeed를 Supabase Realtime 기반 실제 데이터로 전환

---

## 장기 비전
- 백엔드 API로 실제 유저 인증 + 진도 동기화
- 온체인 Proof of Attendance 실제 발급 (Solana NFT)
- 커뮤니티 포럼 (댓글, 토론, 투표)
- 모바일 앱 (React Native)
- 고급 과정 (Semester 4+)
- 파트너 확대 (한국 거래소, DeFi 프로토콜)
