import { useState, useEffect } from 'react'
import useLang from '../../hooks/useLang'

const MESSAGES_KO = [
  '김OO님이 Week 2를 시작했습니다',
  '새 멤버가 카카오톡에 입장했습니다',
  '이OO님이 Phantom 지갑을 설치했습니다',
  '박OO님이 수료증을 발급받았습니다',
  '최OO님이 첫 DEX 스왑을 완료했습니다',
  '정OO님이 히든 토픽에 참여했습니다',
]

const MESSAGES_EN = [
  'Kim XX started Week 2',
  'New member joined KakaoTalk',
  'Lee XX installed Phantom wallet',
  'Park XX received their certificate',
  'Choi XX completed first DEX swap',
  'Jung XX joined the hidden topic discussion',
]

export default function LiveTicker() {
  const { lang } = useLang()
  const messages = lang === 'ko' ? MESSAGES_KO : MESSAGES_EN
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setIndex(prev => (prev + 1) % messages.length); setVisible(true) }, 500)
    }, 6000)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden md:block">
      <div className={`ok-glass rounded-xl px-4 py-2.5 flex items-center gap-2.5 max-w-xs transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot shrink-0" />
        <p className="text-[11px] text-[var(--text-mid)]">{messages[index]}</p>
      </div>
    </div>
  )
}
