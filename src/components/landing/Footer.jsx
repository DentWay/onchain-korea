export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-white/20">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-cyan-400 flex items-center justify-center">
            <span className="text-white text-[7px] font-bold">OK</span>
          </div>
          <span>Onchain Korea · Powered by Elixi Venture Studio</span>
        </div>
        <span>Greed Academy 커리큘럼 기반</span>
      </div>
    </footer>
  )
}
