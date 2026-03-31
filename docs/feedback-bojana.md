# Bojana's Feedback — Applied 2026-03-29

## 1. How to get 0.1 SOL for practice — FAQ + content update

**Feedback:** FAQ answer about practice costs should explain HOW to get SOL and WHEN it becomes relevant.

**Resolution:**
- Updated FAQ Q4 answer in `src/components/landing/FAQ.jsx` to include:
  - KO: "업비트나 빗썸에서 SOL을 구매한 후 Phantom 지갑으로 출금하면 됩니다. 자세한 방법은 Week 1 레슨에서 안내합니다."
  - EN: "You can buy SOL on an exchange like Coinbase or Binance and withdraw to your Phantom wallet. Detailed instructions are provided in Week 1 lessons."
- Added timing context: Week 1 is free, costs only apply from Week 2 onwards.

---

## 2. Semester explanation — FAQ update

**Feedback:** FAQ about "next cohort" should explain what "Semester" means.

**Resolution:**
- Updated FAQ Q6 answer in `src/components/landing/FAQ.jsx` to prepend:
  - KO: "Semester는 Greed Academy의 학기 단위입니다. 현재 3기(Semester 3)가 진행 중이며,"
  - EN: "Semester refers to Greed Academy's cohort system. We're currently running Semester 3 (the 3rd cohort),"

---

## 3. Certificate wording — change across the site

**Feedback:** "Certificate" should be clarified as NOT an official academic certificate. Use "Proof of Attendance" language.

**Resolution — `src/hooks/useLang.jsx`:**
- `cert.certificateOfCompletion`: changed to "수료 증명 (Proof of Attendance)" / "Proof of Attendance"
- `cert.title`: changed to "수료 증명" / "Proof of Attendance"
- `landing.certTitle`: changed to "온체인 수료 증명" / "On-chain Proof of Attendance"
- `landing.certDesc`: updated to mention "PoAP(Proof of Attendance Protocol) 방식"
- `feat.cert.title` / `feat.cert.desc`: updated to "수료 증명(PoAP)" / "Proof of Attendance (PoAP-style)"
- `certprev.completionText`: changed to "참여하였음을 증명합니다" / "has attended and completed"
- `cert.notYetDesc`, `cert.issued`, `cert.preview`, `cert.shareText`, `dash.certLabel`, `sidebar.certificate`, `landing.startNowSub`: all updated consistently
- Added new key `cert.disclaimer` with bilingual disclaimer text

**Resolution — `src/pages/Certificate.jsx`:**
- Added disclaimer note below the certificate card

**Resolution — `src/components/landing/CertificatePreview.jsx`:**
- Changed hardcoded "Certificate of Completion" to use `t('cert.certificateOfCompletion')` translation key
- Added disclaimer note below the certificate preview card

---

## 4. Mobile seed phrase tip — Action Guide content

**Feedback:** Add mobile-specific tip to the seed-backup action guide safety tips.

**Resolution:**
- Added to `seed-backup` guide's `safetyTips` in `src/data/curriculum.js`:
  - KO: "모바일에서 진행하는 경우, 시드 문구를 메모 앱이 아닌 종이에 직접 적어주세요. 스크린샷도 금지입니다."
  - EN: "If you're on mobile, write down your seed phrase on paper, not in a notes app. Screenshots are also not recommended."

---

## Files Modified

- `src/components/landing/FAQ.jsx` — FAQ answers for practice costs (Q4) and semester (Q6)
- `src/hooks/useLang.jsx` — All certificate-related translation keys + new disclaimer key
- `src/pages/Certificate.jsx` — Added disclaimer below certificate card
- `src/components/landing/CertificatePreview.jsx` — Dynamic translation for heading + disclaimer
- `src/data/curriculum.js` — Mobile safety tip for seed-backup guide
