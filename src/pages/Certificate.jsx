import { Link } from 'react-router-dom'
import { ArrowLeft, Lock, CheckCircle, Circle } from 'lucide-react'
import { userProgress } from '../data/curriculum'

const requirements = [
  { text: '주차별 학습 콘텐츠 80% 완료', current: 3, total: 13, done: false },
  { text: '온체인 액션 3개 이상 인증', current: 1, total: 3, done: false },
  { text: '히든 토픽 2개 이상 참여', current: 0, total: 2, done: false },
]

export default function Certificate() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">🏆 수료증</h1>
        <Link to="/dashboard" className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline">
          <ArrowLeft size={12} /> 대시보드
        </Link>
      </div>

      <div className="text-center py-8">
        <Lock size={40} className="mx-auto text-gray-300 mb-3" />
        <p className="text-[15px] font-medium text-gray-900">아직 수료 전이에요</p>
        <p className="text-[12px] text-gray-500 mt-1">
          4주 중 80% 이상 완료 + 온체인 액션 3개 이상 시 발급
        </p>
      </div>

      <p className="text-[12px] text-gray-500 mb-2">수료 조건:</p>
      <div className="border rounded-lg overflow-hidden mb-6">
        {requirements.map((req, i) => (
          <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 text-[12px] ${
            i < requirements.length - 1 ? 'border-b' : ''
          }`}>
            {req.done ? (
              <CheckCircle size={14} className="text-emerald-500 shrink-0" />
            ) : req.current > 0 ? (
              <div className="w-[14px] h-[14px] rounded-full border-2 border-blue-400 shrink-0" />
            ) : (
              <Circle size={14} className="text-gray-300 shrink-0" />
            )}
            <span className="flex-1 text-gray-900">{req.text}</span>
            <span className={`text-[10px] ${req.done ? 'text-emerald-600' : 'text-gray-400'}`}>
              {req.current}/{req.total}
            </span>
          </div>
        ))}
      </div>

      <p className="text-[12px] text-gray-500 mb-2">수료 시 받게 될 인증서:</p>
      <div className="bg-gradient-to-br from-[#16213E] to-[#0F3460] rounded-xl p-8 text-white text-center">
        <p className="text-[9px] uppercase tracking-[3px] text-white/40">Certificate of completion</p>
        <p className="text-2xl font-semibold mt-2 tracking-tight">Onchain Korea</p>
        <p className="text-[12px] text-white/50 mt-1">Blockchain Literacy & Safety Program</p>

        <div className="border-t border-white/10 mt-5 pt-5">
          <p className="text-[16px] font-medium">{userProgress.name} Lee</p>
          <p className="text-[11px] text-white/40 mt-1">
            has successfully completed the 4-week program
          </p>
          <p className="text-[10px] text-white/30 mt-0.5">
            including on-chain verified actions
          </p>
        </div>

        <div className="inline-block mt-4 px-4 py-1.5 border border-white/20 rounded-full text-[11px]">
          🔗 On-chain verified
        </div>

        <p className="text-[9px] text-white/20 mt-4">
          Powered by Greed Academy × Elixi Venture Studio Group
        </p>
      </div>
    </div>
  )
}
