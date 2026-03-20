import Nav from '../components/landing/Nav'
import Hero from '../components/landing/Hero'
import Stats from '../components/landing/Stats'
import Curriculum from '../components/landing/Curriculum'
import Features from '../components/landing/Features'
import CertificatePreview from '../components/landing/CertificatePreview'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Curriculum />
      <Features />
      <CertificatePreview />
      <FinalCTA />
      <Footer />
    </div>
  )
}
