# OnChain Korea Admin Dashboard Benchmark

작성일: 2026-04-12  
범위: 온라인 교육 서비스 관리자/운영 대시보드 레퍼런스 조사 후 OnChain Korea 운영 콘솔 구조로 번역

---

## 1. 문제 정의

현재 관리자 화면이 `개별 유저 클릭 -> 상세 확인` 중심이면, 학습자가 100명만 넘어가도 운영 속도가 급격히 떨어집니다.  
학습자 1,000명 이상을 전제로 하면 첫 화면은 반드시 아래 질문에 바로 답해야 합니다.

- 지금 전체 퍼널이 어디까지 왔는가
- 어느 주차에서 병목이 생기는가
- 어떤 학습자를 지금 바로 봐야 하는가
- 어떤 퀴즈/테스트가 전체 성과를 깎고 있는가
- 최근 7일 기준 실제 활성 학습자는 몇 명인가

즉, 운영 첫 화면의 기준은 `drill-down`이 아니라 `scanability`입니다.

---

## 2. 조사 대상 5개

### 2.1 Canvas LMS
- 공식 문서:
  - https://community.canvaslms.com/t5/Canvas-Basics-Guide/What-is-New-Analytics/ta-p/73
- 확인 포인트:
  - New Analytics를 통해 `course grade`, `weekly online activity`, `students`, `reports`를 분리해서 봅니다.
  - 한 명씩 보는 구조가 아니라 `코스 단위 활동`, `주간 흐름`, `학생 목록 + 필터`가 먼저 나옵니다.

### 2.2 Moodle
- 공식 문서:
  - https://docs.moodle.org/501/en/Course_reports
  - https://docs.moodle.org/501/en/Analytics
- 확인 포인트:
  - 운영자는 `logs`, `activity report`, `course participation`, `completion`, `analytics`를 조합해 봅니다.
  - Moodle도 개별 유저 화면보다 먼저 `참여`, `완료`, `활동 기록`, `예측/리스크` 성격의 리포트를 깔아둡니다.

### 2.3 Thinkific
- 공식 문서:
  - https://support.thinkific.com/hc/en-us/articles/360030369974-Progress-Reports
- 확인 포인트:
  - 코스/코호트 기준으로 학습 진행률을 요약하고, 학생별 상세는 그 다음 단계입니다.
  - 운영 판단 기준이 `누가 몇 % 했는가` 하나가 아니라 `누가 멈췄는가`, `어느 그룹이 느린가`에 가깝습니다.

### 2.4 Teachable
- 공식 문서:
  - https://www.teachable.com/analytics-and-reporting
- 확인 포인트:
  - 관리자/크리에이터는 학생 리포트와 코스 성과를 함께 봅니다.
  - 핵심은 `학생 단위 기록`이 아니라 `비즈니스/운영 요약`, `진행`, `완료`, `전환`을 한 화면에서 읽게 하는 것입니다.

### 2.5 Kajabi
- 공식 문서:
  - https://help.kajabi.com/en/articles/12696273-analytics-reports
  - https://help.kajabi.com/hc/en-us/articles/360040406473-Report-Product-Progress
- 확인 포인트:
  - Kajabi는 `Analytics Reports`를 별도 허브로 두고 운영자가 보고 싶은 보고서를 검색해 들어가게 만듭니다.
  - `Product Progress` 리포트에서는 개별 고객 상세로 들어가기 전에 전체 제품 진도와 고객 progress를 먼저 봅니다.

---

## 3. 공통 패턴

5개 레퍼런스를 묶으면 관리자보드 공통점은 거의 같습니다.

### 3.1 첫 화면은 유저 목록이 아니라 운영 요약이다
- 전체 사용자 수
- 최근 활성 사용자
- 수료/완료 수
- 위험군 수

### 3.2 퍼널을 먼저 보여준다
- 등록
- 시작
- 콘텐츠 진행
- 테스트 통과
- 완료

운영자는 여기서 바로 어디서 이탈이 큰지 봅니다.

### 3.3 병목은 주차/코스/모듈 단위로 본다
- 어느 주차에 사용자가 몰려 있는가
- 어느 주차에서 정체가 많은가
- 어느 주차 평균 진행률이 유독 낮은가

### 3.4 위험군 큐가 있다
- 7일 이상 비활성
- 저득점
- 반복 실패
- 미시작

즉시 확인해야 하는 학습자를 우선순위 큐로 분리합니다.

### 3.5 난도/마찰 지점을 콘텐츠 단위로 본다
- 통과율이 낮은 퀴즈
- 평균 점수가 낮은 테스트
- 많이 시도되지만 잘 안 넘어가는 콘텐츠

### 3.6 상세 drill-down은 유지하되 2차 레이어다
- 개별 학생 상세는 필요합니다.
- 다만 `운영 1차 화면`이 아니라 `문제 발견 후 진입하는 2차 레이어`로 배치합니다.

---

## 4. OnChain Korea 번역 원칙

OnChain Korea는 일반 LMS보다 더 좁은 학습 흐름을 가집니다.

- 8주 고정 커리큘럼
- Article quiz gate
- Weekly test gate
- Action / Hidden Topic / Proof 흐름

그래서 범용 LMS 메트릭을 그대로 가져오지 않고 아래처럼 번역하는 것이 맞습니다.

### 4.1 운영 상단 KPI
- 전체 학습자
- 최근 7일 활성
- 주의 필요
- 수료

### 4.2 학습 퍼널
- 등록
- 시작
- 아티클 퀴즈 통과
- 주간 테스트 통과
- 수료

### 4.3 병목 주차
- 주차별 학습자 수
- 주차별 정체 수
- 주차별 저득점 수
- 주차 평균 진행률

### 4.4 위험군 큐
- 7일 이상 정체
- 미시작
- 평균 점수 70% 미만
- 퀴즈 반복 실패

### 4.5 난도 경고
- 퀴즈/테스트 pass rate 낮은 순
- 평균 점수
- 응시 수

---

## 5. 이번 반영안

이번 라운드에서 관리자 콘솔에 반영할 핵심은 아래입니다.

- `운영 KPI 카드 4종`
- `학습 퍼널`
- `병목 주차`
- `주차 분포`
- `위험군 큐`
- `난도 경고`
- 기존 학습자 리스트 + 개별 상세 패널 유지

즉, 운영자는 더 이상 일일이 한 명씩 눌러서 상황을 파악하는 방식이 아니라:

1. 상단 KPI로 전체 상황을 보고
2. 퍼널에서 이탈 구간을 확인하고
3. 병목 주차와 난도 경고로 콘텐츠 문제를 찾고
4. 위험군 큐에서 즉시 대응 대상만 눌러 확인하는 흐름으로 전환됩니다.

---

## 6. 설계 결론

OnChain Korea 관리자보드의 정석은 아래 구조입니다.

1. `KPI strip`
2. `learning funnel`
3. `week bottleneck + week distribution`
4. `at-risk queue + difficulty alerts`
5. `learner list`
6. `learner detail`

이 구조가 유지되어야 학습자 수가 늘어나도 운영이 버틸 수 있습니다.

개별 유저 클릭 중심 구조로 다시 돌아가면 안 됩니다.
