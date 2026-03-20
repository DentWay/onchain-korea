import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Shield, ExternalLink } from 'lucide-react'
import { actionGuides } from '../data/curriculum'

export default function ActionGuide() {
  const { actionId } = useParams()
  const guide = actionGuides.find(g => g.id === actionId) || actionGuides[0]
  const nextGuide = actionGuides.find(g => g.id !== guide.id && g.weekId === guide.weekId)

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-lg font-semibold text-gray-900">⚡ 실습: {guide.title}</h1>
        <Link to={`/week/${guide.weekId}`} className="text-[11px] text-blue-600 flex items-center gap-1 hover:underline">
          <ArrowLeft size={12} /> Week {guide.weekId}
        </Link>
      </div>

      <div className="border rounded-lg p-4 mb-3">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-lg">
            {guide.icon}
          </div>
          <div>
            <p className="text-[13px] font-medium text-gray-900">{guide.title}</p>
            <p className="text-[11px] text-gray-500">{guide.subtitle}</p>
          </div>
        </div>

        <p className="text-[12px] text-gray-600 leading-relaxed mb-4">{guide.description}</p>

        <div className="space-y-1">
          {guide.steps.map((step, i) => (
            <div key={i} className="flex gap-2.5 py-2">
              <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-medium shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="text-[12px] text-gray-900 leading-relaxed">
                <div>
                  {step.link ? (
                    <>
                      <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-0.5">
                        {step.link.replace('https://', '')} <ExternalLink size={10} />
                      </a>
                      {' '}{step.text.split(step.link.replace('https://', ''))[1] || step.text}
                    </>
                  ) : (
                    <span>{step.text}</span>
                  )}
                </div>
                {step.note && (
                  <p className="text-[10px] text-gray-500 mt-0.5">{step.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 transition-colors">
          ✓ {guide.title} 완료 — 인증하기
        </button>
      </div>

      {nextGuide && (
        <Link
          to={`/action/${nextGuide.id}`}
          className="block border rounded-lg p-4 opacity-40 hover:opacity-60 transition-opacity"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
              {nextGuide.icon}
            </div>
            <div>
              <p className="text-[13px] font-medium text-gray-900">다음 실습: {nextGuide.title}</p>
              <p className="text-[11px] text-gray-500">🔒 이전 실습 완료 후 잠금 해제</p>
            </div>
          </div>
        </Link>
      )}

      <div className="bg-amber-50 rounded-lg p-3.5 mt-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Shield size={14} className="text-amber-600" />
          <p className="text-[12px] font-medium text-amber-700">안전 수칙 — 반드시 읽으세요</p>
        </div>
        <ul className="space-y-0.5">
          {guide.safetyTips.map((tip, i) => (
            <li key={i} className="text-[11px] text-amber-700 leading-relaxed">• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
