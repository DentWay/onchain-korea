import { useState, useEffect, useCallback } from 'react'
import useLang from '../hooks/useLang'

const NAMES_KO = ['민수', '지영', '현우', '수빈', '준혁', '서연', '태민', '하은', '동현', '유나', '성민', '채원', '재현', '소희', '우진']
const NAMES_EN = ['Alex', 'Sarah', 'James', 'Emma', 'Daniel', 'Sophia', 'Ryan', 'Mia', 'Kevin', 'Luna', 'Chris', 'Yuna', 'Jay', 'Hana', 'Tom']

const ACTIONS_KO = ['Week 1 레슨을 완료했습니다', 'Phantom 지갑을 설치했습니다', 'Week 2를 시작했습니다', 'DEX 첫 스왑을 완료했습니다', '히든 토픽을 읽었습니다', 'NFT 민팅을 완료했습니다', 'SOL 스테이킹을 시작했습니다', '수료증을 발급받았습니다', '커뮤니티에 입장했습니다', 'Week 3 액션을 완료했습니다']
const ACTIONS_EN = ['completed Week 1 lessons', 'installed Phantom wallet', 'started Week 2', 'completed first DEX swap', 'read the hidden topic', 'completed NFT minting', 'started SOL staking', 'received their certificate', 'joined the community', 'completed Week 3 actions']

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function generateActivity(lang) {
  const name = lang === 'ko' ? randomItem(NAMES_KO) : randomItem(NAMES_EN)
  const action = lang === 'ko' ? randomItem(ACTIONS_KO) : randomItem(ACTIONS_EN)
  const minutes = Math.floor(Math.random() * 15) + 1
  return { id: Date.now() + Math.random(), name, action, timeAgo: lang === 'ko' ? `${minutes}분 전` : `${minutes}m ago`, initial: name[0] }
}

export default function ActivityFeed({ maxItems = 5 }) {
  const { lang } = useLang()
  const [items, setItems] = useState(() => Array.from({ length: maxItems }, () => generateActivity(lang)))

  const addActivity = useCallback(() => {
    setItems(prev => [generateActivity(lang), ...prev.slice(0, maxItems - 1)])
  }, [lang, maxItems])

  useEffect(() => {
    const id = setInterval(addActivity, 8000 + Math.random() * 4000)
    return () => clearInterval(id)
  }, [addActivity])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-success ok-pulse-dot" />
        <span className="text-[11px] text-[var(--text-low)] font-medium">{lang === 'ko' ? '실시간' : 'LIVE'}</span>
      </div>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2.5 ok-fade-in">
          <div className="w-6 h-6 rounded-full bg-[var(--surface-2)] flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-[var(--text-low)]">{item.initial}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-[var(--text-mid)] truncate">
              <span className="text-[var(--text-high)] font-medium">{item.name}</span>
              {lang === 'ko' ? '님이 ' : ' '}{item.action}
            </p>
          </div>
          <span className="text-[9px] text-[var(--text-low)] shrink-0">{item.timeAgo}</span>
        </div>
      ))}
    </div>
  )
}
