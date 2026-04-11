# 06_운영생산 (Operations & Service Delivery)

## 부서 개요

온체인 코리아의 서비스 운영, 수강생 지원, 변경 이력 관리를 담당하는 부서입니다.
- 수강생 온보딩 및 관리
- 진도 추적 및 완료율 모니터링
- 커뮤니티 운영 (KakaoTalk, Telegram)
- 고객 지원 및 문제 해결
- 모든 변경 이력 기록 (Changelog)

## 현재 상태

### 완료된 작업
- ✅ Phase 1 Semester 1 (4주 → 8주 확장) 운영 중
- ✅ 실시간 enrollment_stats 대시보드
- ✅ 학습자 진도 추적 시스템
- ✅ 어드민 대시보드 (진도율, 퀴즈/테스트 이력 조회)
- ✅ 전체 변경 이력 기록 (Changelog, 역순)
- ✅ sessionStorage 캐싱 (5분 TTL)

### 진행 중인 작업
- 🔄 Phase 1 수강생 모집 및 등록 (5월~)
- 🔄 KakaoTalk 오픈채팅 커뮤니티 운영
- 🔄 주간 라이브 Q&A 세션 (선택)
- 🔄 수강생 피드백 수집 및 반영

### 다음 우선순위
1. Phase 1 개강식 및 오리엔테이션 (5월)
2. 주간 진도 리포트 및 독려 메시지 자동화
3. Phase 1 수료 후 Proof of Attendance 민팅 준비

## 에이전트 역할

**운영생산 에이전트**는 다음 업무를 담당합니다:

| 작업 | 빈도 | 소유자 |
|------|------|--------|
| 일일 enrollment 현황 확인 | 매일 | 운영생산 에이전트 |
| 진도 부진 학습자 독려 | 주 2회 | 운영생산 에이전트 |
| 커뮤니티 모니터링 및 응답 | 매일 | 운영생산 에이전트 |
| 주간 진도율 리포트 | 주 1회 | 운영생산 에이전트 |
| 변경 사항 기록 (Changelog) | 매일 | 운영생산 에이전트 |
| 수강생 피드백 수집 | 주 1회 | 운영생산 에이전트 |
| Proof of Attendance 민팅 확인 | 수료시 | 운영생산 에이전트 |

## 주요 문서

| 파일 | 설명 | 최종 수정일 |
|------|------|---------|
| `changelog.md` | 모든 변경 이력 (역순) | 2026-04-06 |
| `enrollment-tracking.md` | 주차별 등록 현황 | - |
| `learner-support-guide.md` | 수강생 지원 FAQ | - |
| `community-guidelines.md` | KakaoTalk/Telegram 규칙 | - |
| `completion-checklist.md` | 주차별 수료 기준 | - |

## 운영 지표 (KPI)

| 지표 | 목표 | 추적 방법 |
|------|------|---------|
| **총 등록 수강생** | 500+ (6개월) | enrollment_stats 테이블 |
| **주차별 완료율** | 주차별 60%+ | learner_progress 테이블 |
| **최종 완료율** | 40%+ (200+명) | completion_status = completed |
| **평균 완료 시간** | 8주 | completedAt - enrolledAt |
| **커뮤니티 활동** | 주 100+ 메시지 | KakaoTalk 통계 |
| **고객 만족도** | 4.5/5.0 이상 | 사후 피드백 설문 |

## 주차별 운영 계획

### Week 1~2 (5월~중순)
- 개강식 및 오리엔테이션
- 첫 아티클(w1-0, w1-1) 진도 안내
- 커뮤니티 활성화

### Week 3~4 (5월 중순~말)
- 중간 체크인 (10% 미만 진도자 독려)
- Action Lab 참여 유도

### Week 5~6 (6월)
- 최종 주차 진입
- Hidden Topic 참여 독려

### Week 7~8 (6월 말)
- Weekly Test 완료 관리
- 수료자 인터뷰 시작
- Proof of Attendance 민팅 준비

## 에이전트 설정

```yaml
Agent: 운영생산_에이전트
Type: Operations Manager
Frequency: Daily check + weekly review
Responsibilities:
  - enrollment monitoring & tracking
  - learner support & engagement
  - community management (KakaoTalk, Telegram)
  - progress reporting & analytics
  - changelog maintenance
  - completion verification
  - PoA minting coordination
  - learner feedback collection
```

## 통신 채널

- Slack: #onchain-korea-operations
- KakaoTalk: 오픈채팅 "온체인코리아 1기"
- Telegram: t.me/onchain_korea
- 회의: 주 1회 금요일 3:00 PM (전담 운영팀)

## 응급 연락처

- 긴급 기술 문제: #onchain-korea-engineering
- 수강생 위기 상황: MinGoo (긴급)
