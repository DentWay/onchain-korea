import Nav from '../components/landing/Nav'
import HeroStage from '../components/landing/HeroStage'
import Curriculum from '../components/landing/Curriculum'
import Features from '../components/landing/Features'
import FAQ from '../components/landing/FAQ'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0b0d]">
      <Nav />
      <HeroStage />
      <div className="relative z-10">
        <Curriculum />
        <Features />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  )
}
