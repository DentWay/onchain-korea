import { ADMIN_ACCESS_PATH, ADMIN_CONSOLE_PATH, ADMIN_ENTRY_PATH } from '../../src/lib/adminRoute.js'

function renderAccessPage() {
  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OnChain Korea — Admin Access</title>
    <meta name="robots" content="noindex,nofollow" />
    <style>
      :root {
        --bg: #0c0d11;
        --panel: rgba(18, 20, 29, 0.92);
        --panel-2: rgba(255, 255, 255, 0.04);
        --border: rgba(255, 255, 255, 0.08);
        --text-high: rgba(255, 255, 255, 0.92);
        --text-mid: rgba(255, 255, 255, 0.66);
        --text-low: rgba(255, 255, 255, 0.38);
        --accent: #4f83ff;
        --accent-strong: #5d8cff;
        --danger: #fca5a5;
        --danger-bg: rgba(248, 113, 113, 0.10);
        --danger-border: rgba(248, 113, 113, 0.20);
        --success-bg: rgba(59, 130, 246, 0.08);
        --success-border: rgba(59, 130, 246, 0.18);
      }

      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: var(--bg); color: var(--text-high); font-family: Pretendard Variable, Inter, system-ui, sans-serif; }
      body { min-height: 100vh; }
      a { color: inherit; text-decoration: none; }
      button, input { font: inherit; }
      .page { min-height: 100vh; padding: 32px 16px 48px; }
      .frame { max-width: 960px; margin: 0 auto; }
      .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
      .home-link { font-size: 12px; color: var(--text-mid); }
      .eyebrow { font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--text-low); }
      .card {
        border: 1px solid var(--border);
        background: linear-gradient(180deg, rgba(18,20,29,0.94) 0%, rgba(11,12,16,0.98) 100%);
        border-radius: 28px;
        box-shadow: 0 20px 80px rgba(0,0,0,0.35);
        padding: 28px;
      }
      .title { margin: 12px 0 0; font-size: clamp(32px, 6vw, 44px); line-height: 0.98; letter-spacing: -0.05em; font-weight: 800; }
      .desc { margin: 16px 0 0; max-width: 56ch; font-size: 14px; line-height: 1.65; color: var(--text-mid); }
      .box { margin-top: 24px; border: 1px solid var(--border); background: var(--panel-2); border-radius: 20px; padding: 18px; }
      label { display: block; margin-bottom: 8px; font-size: 12px; font-weight: 600; color: var(--text-high); }
      input {
        width: 100%;
        border-radius: 16px;
        border: 1px solid var(--border);
        background: rgba(255,255,255,0.04);
        color: var(--text-high);
        padding: 14px 16px;
        outline: none;
      }
      input:focus { border-color: #79afff; }
      .hint { margin-top: 10px; font-size: 12px; line-height: 1.5; color: var(--text-mid); }
      .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
      .btn {
        display: inline-flex; align-items: center; justify-content: center;
        border-radius: 999px; padding: 12px 18px; font-size: 13px; font-weight: 600;
        border: 1px solid transparent; cursor: pointer;
      }
      .btn-primary { background: var(--accent); color: white; }
      .btn-primary:hover { background: var(--accent-strong); }
      .btn-secondary { background: rgba(255,255,255,0.05); border-color: var(--border); color: var(--text-high); }
      .status, .error {
        margin-top: 18px; border-radius: 16px; padding: 12px 14px; font-size: 13px; line-height: 1.5;
      }
      .status { border: 1px solid var(--success-border); background: var(--success-bg); color: #afcbff; }
      .error { border: 1px solid var(--danger-border); background: var(--danger-bg); color: var(--danger); }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      .brand { display: flex; align-items: center; gap: 10px; }
      .brand img { width: 36px; height: 36px; }
      .brand span { font-size: 24px; font-weight: 800; letter-spacing: -0.05em; }
      .brand small { margin-left: 4px; font-size: 12px; letter-spacing: 0.2em; color: var(--text-low); vertical-align: baseline; }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="frame">
        <div class="topbar">
          <a class="home-link" href="/">홈으로</a>
          <div class="eyebrow">Admin Access</div>
        </div>
        <div class="card">
          <div class="eyebrow">운영 콘솔 접근</div>
          <div class="brand"><img src="/brand/symbol-web.png" alt="OnChain Korea" /><span>OnChain <small>KR</small></span></div>
          <h1 class="title">관리자 잠금 해제</h1>
          <p class="desc">
            승인된 관리자 계정으로 로그인한 뒤 운영 비밀번호를 입력하면 관리자 콘솔이 열립니다.
            이 화면은 일반 사용자 내비게이션에 노출되지 않습니다.
          </p>

          <div>
              <div id="status" class="status" hidden>관리자 세션을 확인 중입니다.</div>
              <div id="error" class="error" hidden></div>

              <div class="box" id="signin-box" hidden>
                <label>로그인 필요</label>
                <p class="hint">먼저 승인된 관리자 계정으로 로그인해야 합니다.</p>
                <div class="actions">
                  <button class="btn btn-primary" id="signin-btn" type="button">승인 계정으로 로그인</button>
                </div>
              </div>

              <div class="box" id="gate-box" hidden style="max-width:480px">
                <label for="admin-password">관리자 비밀번호</label>
                <input id="admin-password" type="password" autocomplete="current-password" placeholder="비밀번호를 입력하세요" />
                <p class="hint">서버에서 검증합니다. 이 브라우저 세션에서만 유효해요.</p>
                <div class="actions">
                  <button class="btn btn-primary" id="unlock-btn" type="button">관리자 열기</button>
                  <a class="btn btn-secondary" href="/dashboard">대시보드로</a>
                </div>
              </div>

              <div class="box" id="denied-box" hidden>
                <label>접근 불가</label>
                <p class="hint" id="denied-copy">이 계정은 관리자 접근 대상이 아닙니다.</p>
                <div class="actions">
                  <button class="btn btn-primary" id="signin-again-btn" type="button">다시 로그인</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      const AUTH_INTENT_STORAGE_KEY = 'onchain-korea-auth-intent';
      const ACCESS_PATH = ${JSON.stringify(ADMIN_ACCESS_PATH)};
      const CONSOLE_PATH = ${JSON.stringify(ADMIN_CONSOLE_PATH)};
      const statusEl = document.getElementById('status');
      const errorEl = document.getElementById('error');
      const signInBox = document.getElementById('signin-box');
      const gateBox = document.getElementById('gate-box');
      const deniedBox = document.getElementById('denied-box');
      const deniedCopy = document.getElementById('denied-copy');
      const passwordInput = document.getElementById('admin-password');
      const unlockBtn = document.getElementById('unlock-btn');
      const signInBtn = document.getElementById('signin-btn');
      const signInAgainBtn = document.getElementById('signin-again-btn');

      function setStatus(message) {
        statusEl.textContent = message;
        statusEl.hidden = false;
      }

      function clearStatus() {
        statusEl.hidden = true;
      }

      function setError(message) {
        errorEl.textContent = message;
        errorEl.hidden = false;
      }

      function clearError() {
        errorEl.hidden = true;
      }

      function showBox(target) {
        [signInBox, gateBox, deniedBox].forEach((node) => {
          node.hidden = node !== target;
        });
      }

      function normalizeEmail(value) {
        return String(value || '').trim().toLowerCase();
      }

      function persistAuthIntent() {
        try {
          sessionStorage.setItem(AUTH_INTENT_STORAGE_KEY, ACCESS_PATH);
        } catch {}
      }

      function redirectToAuth() {
        persistAuthIntent();
        window.location.href = '/auth';
      }

      function readSupabaseSession() {
        try {
          for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index);
            if (!key || !key.startsWith('sb-') || !key.includes('auth-token')) continue;

            const rawValue = localStorage.getItem(key);
            if (!rawValue) continue;
            const parsed = JSON.parse(rawValue);

            if (parsed?.currentSession?.access_token) {
              return {
                accessToken: parsed.currentSession.access_token,
                email: parsed.currentSession.user?.email || parsed.currentUser?.email || '',
              };
            }

            if (parsed?.access_token) {
              return {
                accessToken: parsed.access_token,
                email: parsed.user?.email || '',
              };
            }
          }
        } catch {}

        return null;
      }

      function getGateError(code, email) {
        switch (String(code || '')) {
          case 'invalid_password':
          case 'admin_password_invalid':
            return '비밀번호가 맞지 않습니다.';
          case 'admin_email_not_allowed':
            return '이 계정은 관리자 접근 대상이 아닙니다.';
          case 'admin_promotion_failed':
            return '관리자 권한 전환에 실패했습니다. Supabase 보안 SQL 적용 상태를 확인해주세요.';
          case 'missing_token':
          case 'invalid_token':
            return '로그인 세션을 다시 확인해주세요.';
          default:
            return email
              ? '관리자 잠금 해제에 실패했습니다. 잠시 후 다시 시도해주세요.'
              : '승인된 관리자 계정으로 먼저 로그인해야 합니다.';
        }
      }

      async function checkExistingUnlock(accessToken) {
        try {
          const response = await fetch('/api/admin-gate/status', {
            method: 'GET',
            credentials: 'include',
            headers: { Authorization: 'Bearer ' + accessToken },
          });

          const payload = await response.json().catch(() => ({}));
          if (response.ok && payload?.unlocked) {
            window.location.replace(CONSOLE_PATH);
            return true;
          }
        } catch {}

        return false;
      }

      async function boot() {
        clearError();
        setStatus('관리자 세션을 확인 중입니다.');

        const session = readSupabaseSession();
        const email = normalizeEmail(session?.email);

        if (!session?.accessToken) {
          clearStatus();
          showBox(signInBox);
          return;
        }

        if (!email) {
          clearStatus();
          showBox(signInBox);
          return;
        }

        const response = await fetch('/api/admin-gate/status', {
          method: 'GET',
          credentials: 'include',
          headers: { Authorization: 'Bearer ' + session.accessToken },
        });

        if (response.status === 403) {
          clearStatus();
          deniedCopy.textContent = '현재 계정(' + (email || 'unknown') + ')은 관리자 접근 대상이 아닙니다. 승인된 관리자 계정으로 다시 로그인해야 합니다.';
          showBox(deniedBox);
          return;
        }

        const payload = await response.json().catch(() => ({}));
        if (response.ok && payload?.unlocked) {
          window.location.replace(CONSOLE_PATH);
          return;
        }

        clearStatus();
        showBox(gateBox);
      }

      async function handleUnlock() {
        const session = readSupabaseSession();
        const email = normalizeEmail(session?.email);
        clearError();

        if (!session?.accessToken) {
          showBox(signInBox);
          setError('먼저 승인된 관리자 계정으로 로그인해야 합니다.');
          return;
        }

        const password = passwordInput.value;
        if (!password) return;

        unlockBtn.disabled = true;
        setStatus('관리자 잠금을 해제하는 중입니다.');

        try {
          const response = await fetch('/api/admin-gate/unlock', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + session.accessToken,
            },
            body: JSON.stringify({ password }),
          });

          const payload = await response.json().catch(() => ({}));

          if (!response.ok) {
            clearStatus();
            setError(getGateError(payload?.error, email));
            unlockBtn.disabled = false;
            return;
          }

          window.location.replace(CONSOLE_PATH);
        } catch {
          clearStatus();
          setError('관리자 잠금 해제에 실패했습니다. 잠시 후 다시 시도해주세요.');
          unlockBtn.disabled = false;
        }
      }

      signInBtn.addEventListener('click', redirectToAuth);
      signInAgainBtn.addEventListener('click', redirectToAuth);
      unlockBtn.addEventListener('click', handleUnlock);
      passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleUnlock();
        }
      });

      boot();
    </script>
  </body>
</html>`
}

export default function handler(_req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(renderAccessPage())
}
