import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { X } from 'lucide-react'
import useLang from '../hooks/useLang'

const FomoToastContext = createContext(null)

const NAMES_KO = ['민수', '지영', '현우', '수빈', '준혁', '서연', '태민', '하은', '동현', '유나']
const NAMES_EN = ['Alex', 'Sarah', 'James', 'Emma', 'Daniel', 'Sophia', 'Ryan', 'Mia', 'Kevin', 'Luna']

const MESSAGES_KO = [
  (n) => `${n}님이 방금 수료증을 발급받았습니다!`,
  (n) => `${n}님이 Week 2 액션을 완료했습니다`,
  (n) => `${n}님이 커뮤니티에 입장했습니다`,
  (n) => `${n}님이 Phantom 지갑을 설치했습니다`,
  (n) => `${n}님이 첫 DEX 스왑을 완료했습니다`,
]
const MESSAGES_EN = [
  (n) => `${n} just received their certificate!`,
  (n) => `${n} completed Week 2 actions`,
  (n) => `${n} joined the community`,
  (n) => `${n} installed Phantom wallet`,
  (n) => `${n} completed their first DEX swap`,
]

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

export function FomoToastProvider({ children }) {
  const { lang } = useLang()
  const [toast, setToast] = useState(null)
  const [exiting, setExiting] = useState(false)

  const dismiss = useCallback(() => {
    setExiting(true)
    setTimeout(() => { setToast(null); setExiting(false) }, 300)
  }, [])

  useEffect(() => {
    const showToast = () => {
      const names = lang === 'ko' ? NAMES_KO : NAMES_EN
      const messages = lang === 'ko' ? MESSAGES_KO : MESSAGES_EN
      const name = randomItem(names)
      setToast({ message: randomItem(messages)(name), initial: name[0] })
      setExiting(false)
      setTimeout(() => { setExiting(true); setTimeout(() => { setToast(null); setExiting(false) }, 300) }, 4000)
    }
    const firstTimer = setTimeout(showToast, 10000)
    const interval = setInterval(showToast, 15000 + Math.random() * 10000)
    return () => { clearTimeout(firstTimer); clearInterval(interval) }
  }, [lang])

  return (
    <FomoToastContext.Provider value={{ dismiss }}>
      {children}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[60] max-w-xs ${exiting ? 'animate-[ok-slide-out-right_0.3s_ease-in_forwards]' : 'animate-[ok-slide-in-right_0.3s_ease-out]'}`}>
          <div className="ok-glass rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl">
            <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[var(--text-mid)]">{toast.initial}</span>
            </div>
            <p className="text-[12px] text-[var(--text-mid)] leading-snug flex-1">{toast.message}</p>
            <button onClick={dismiss} className="text-[var(--text-low)] hover:text-[var(--text-mid)] transition-colors shrink-0"><X size={14} /></button>
          </div>
        </div>
      )}
    </FomoToastContext.Provider>
  )
}

export default function useFomoToast() { return useContext(FomoToastContext) }
