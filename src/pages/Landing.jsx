import Nav from '../components/landing/Nav'
import Hero from '../components/landing/Hero'
import Stats from '../components/landing/Stats'
import WhySection from '../components/landing/WhySection'
import SocialProof from '../components/landing/SocialProof'
import Testimonials from '../components/landing/Testimonials'
import Curriculum from '../components/landing/Curriculum'
import InlineCTA from '../components/landing/InlineCTA'
import Features from '../components/landing/Features'
import CertificatePreview from '../components/landing/CertificatePreview'
import FAQ from '../components/landing/FAQ'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)] text-[var(--text-high)] overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <SocialProof />
      <WhySection />
      <Curriculum />
      <InlineCTA />
      <Features />
      <CertificatePreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
