import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'

const navLinks = [
  { href: '#hero', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#services', label: 'SERVICES' },
  { href: '#portfolio', label: 'WORK' },
  { href: '#contact', label: 'CONTACT' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gaming-bg/95 backdrop-blur-xl border-b border-gaming-border/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-2 font-display font-bold text-xl lg:text-2xl text-gaming-text"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            whileTap={{ scale: 0.95 }}
            aria-label="MK MotionFX - Home"
          >
            <span className="text-gaming-primary">MK</span>
            <span className="hidden sm:inline text-gaming-text">MOTION</span>
            <span className="text-gaming-secondary">FX</span>
            <motion.span
              className="ml-2 px-1.5 py-0.5 text-xs font-mono text-gaming-primary bg-gaming-primary/10 border border-gaming-primary/20 rounded"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              v3.0
            </motion.span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative font-display text-sm font-medium uppercase tracking-wider transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-gaming-primary'
                    : 'text-gaming-textMuted hover:text-gaming-primary'
                }`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                <motion.span
                  className="absolute bottom-[-4px] left-0 h-0.5 bg-gradient-to-r from-gaming-primary to-gaming-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === link.href.replace('#', '') ? '100%' : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#portfolio"
              className="btn-secondary text-sm px-5 py-2"
              onClick={(e) => { e.preventDefault(); scrollTo('#portfolio'); }}
            >
              <span>VIEW WORK</span>
            </a>
            <a
              href="#contact"
              className="btn-primary text-sm px-6 py-2"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            >
              <span>HIRE ME</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-gaming-card/50 border border-gaming-border/50 text-gaming-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-current transition-all"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current mt-1 transition-all"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              transition={{ duration: 100 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-current transition-all"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden overflow-hidden bg-gaming-bgSecondary/98 backdrop-blur-xl border-t border-gaming-border/50"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <div className="section-container py-6 space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg font-display font-medium uppercase tracking-wider transition-all ${
                      activeSection === link.href.replace('#', '')
                        ? 'bg-gaming-primary/20 text-gaming-primary border border-gaming-primary/30'
                        : 'text-gaming-textMuted hover:bg-gaming-card hover:text-gaming-primary hover:border-gaming-primary/20 border border-transparent'
                    }`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t border-gaming-border/30">
                  <a
                    href="#portfolio"
                    className="btn-secondary text-center"
                    onClick={(e) => { e.preventDefault(); scrollTo('#portfolio'); }}
                  >
                    <span>VIEW WORK</span>
                  </a>
                  <a
                    href="#contact"
                    className="btn-primary text-center"
                    onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                  >
                    <span>HIRE ME</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scanline effect */}
        <motion.div
          className="scanlines"
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </nav>
    </header>
  )
}