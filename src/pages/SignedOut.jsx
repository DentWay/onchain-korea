import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Home, LogIn, Trash2 } from 'lucide-react'
import BrandLockup from '../components/brand/BrandLockup'
import useLang from '../hooks/useLang'

function pick(lang, ko, en) {
  return lang === 'ko' ? ko : en
}

export default function SignedOut() {
  const { lang } = useLang()
  const [searchParams] = useSearchParams()
  const reason = searchParams.get('reason')
  const accountDeleted = reason === 'deleted'

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-4xl p-5 md:p-8"
        >
          <div className="rounded-xl border border-[#dedee5] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="border-b border-[#dedee5] px-6 pb-6 pt-7 text-center md:px-8">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
                accountDeleted ? 'bg-[rgba(248,113,113,0.12)] text-[#FCA5A5]' : 'bg-[rgba(74,222,128,0.12)] text-[#4ADE80]'
              }`}>
                {accountDeleted ? <Trash2 size={24} /> : <CheckCircle2 size={24} />}
              </div>
              <div className="mt-5 flex justify-center">
                <BrandLockup surface="light" className="origin-center scale-[0.96] md:scale-[1.02]" />
              </div>
              <h1 className="mt-5 text-[30px] font-[800] tracking-[-0.05em] text-[#101114] md:text-[34px]">
                {accountDeleted
                  ? pick(lang, '계정이 삭제되었습니다', 'Your account has been deleted')
                  : pick(lang, '로그아웃되었습니다', 'You have signed out')}
              </h1>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#686b82]">
                {accountDeleted
                  ? pick(
                      lang,
                      '프로필과 학습 기록 정리를 마쳤습니다. 다시 시작하려면 새로 로그인하면 됩니다.',
                      'Your profile and learning records have been cleared. If you come back later, sign in again to start fresh.'
                    )
                  : pick(
                      lang,
                      '현재 브라우저 세션에서 로그아웃을 마쳤습니다. 다른 계정으로 다시 들어오거나 홈으로 돌아갈 수 있습니다.',
                      'This browser session has been signed out. You can sign back in with another account or return to the home page.'
                    )}
              </p>
            </div>

            <div className="flex flex-col gap-3 px-6 py-6 md:flex-row md:justify-center md:px-8">
              <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[13px] font-semibold text-[#101114] hover:bg-[#dedee5] transition-colors">
                <Home size={15} />
                <span>{pick(lang, '홈으로', 'Go Home')}</span>
              </Link>
              <Link to="/auth" className="inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-5 py-3 text-[13px] font-semibold text-white hover:bg-[#828fff] transition-colors">
                <LogIn size={15} />
                <span>{pick(lang, '다시 로그인', 'Sign In Again')}</span>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
