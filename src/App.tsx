import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Footer } from './components/layout/Footer'
import { LegalModal } from './components/layout/LegalModal'
import type { LegalDoc } from './components/layout/LegalModal'
import { Loader } from './components/layout/Loader'
import { Navbar } from './components/layout/Navbar'
import { ComingSoon } from './components/sections/ComingSoon'
import { Contact } from './components/sections/Contact'
import { Ecosystem } from './components/sections/Ecosystem'
import { Features } from './components/sections/Features'
import { Hero } from './components/sections/Hero'
import { HowItWorks } from './components/sections/HowItWorks'
import { Intro } from './components/sections/Intro'
import { Pricing } from './components/sections/Pricing'
import { Showcase } from './components/sections/Showcase'
import { Vision } from './components/sections/Vision'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [legal, setLegal] = useState<LegalDoc>(null)
  const done = useCallback(() => setLoading(false), [])
  const closeLegal = useCallback(() => setLegal(null), [])

  // Keep the page locked only while the intro is showing.
  useEffect(() => {
    if (!loading) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [loading])

  // If the page was opened with a #hash, jump there once the intro is gone.
  useEffect(() => {
    if (loading || !window.location.hash) return
    const id = window.location.hash.slice(1)
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50)
  }, [loading])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence>{loading && <Loader onDone={done} />}</AnimatePresence>

      <Navbar />
      <main id="main">
        <Hero ready={!loading} />
        <Intro />
        <Features />
        <HowItWorks />
        <Ecosystem />
        <Showcase />
        <Pricing />
        <Vision />
        <ComingSoon />
        <Contact />
      </main>
      <Footer onOpenLegal={setLegal} />
      <LegalModal doc={legal} onClose={closeLegal} />
    </>
  )
}
