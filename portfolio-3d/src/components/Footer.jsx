import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 lg:py-16 border-t border-gaming-border/50 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] radial-glow opacity-50" style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,136,0.1) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 font-display font-bold text-2xl lg:text-3xl mb-4">
              <span className="text-gaming-primary">MK</span>
              <span className="text-gaming-text">MOTION</span>
              <span className="text-gaming-secondary">FX</span>
            </div>
            <p className="text-gaming-textMuted text-sm leading-relaxed max-w-xs">
              Crafting scroll-stopping video content for brands that refuse to be ignored.
              Video Editor & Motion Graphics Designer based in the digital realm.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { href: 'https://twitter.com/mkmotionfx', icon: '𝕏', label: 'Twitter' },
                { href: 'https://linkedin.com/in/mkmotionfx', icon: 'in', label: 'LinkedIn' },
                { href: 'https://discord.gg/example', icon: '💬', label: 'Discord' },
                { href: 'mailto:hello@mkmotionfx.com', icon: '✉️', label: 'Email' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gaming-card/50 border border-gaming-border/50 flex items-center justify-center text-gaming-textMuted hover:text-gaming-primary hover:border-gaming-primary/50 transition-all text-sm"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ y: -2, rotate: 5 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-gaming-text mb-4">QUICK LINKS</h4>
            <nav className="space-y-3" aria-label="Footer navigation">
              {[
                { href: '#hero', label: 'HOME' },
                { href: '#about', label: 'ABOUT' },
                { href: '#services', label: 'SERVICES' },
                { href: '#portfolio', label: 'PORTFOLIO' },
                { href: '#contact', label: 'CONTACT' },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="flex items-center gap-2 font-mono text-sm text-gaming-textMuted hover:text-gaming-primary transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <span className="w-1 h-1 bg-gaming-primary/30 group-hover:w-4 group-hover:bg-gaming-primary transition-all rounded" />
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Services List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-gaming-text mb-4">SERVICES</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Video Editing',
                'Motion Graphics',
                'Color Grading',
                'AI Video Gen',
                'Signature Animation',
                'SaaS Videos',
              ].map((service, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1.5 text-sm font-mono bg-gaming-card/50 border border-gaming-border/50 text-gaming-textMuted rounded-lg hover:border-gaming-primary/50 hover:text-gaming-primary transition-all cursor-default"
                  whileHover={{ scale: 1.02 }}
                >
                  {service}
                </motion.span>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8 pt-8 border-t border-gaming-border/30">
              <h4 className="font-display font-bold text-gaming-text mb-3">NEWSLETTER</h4>
              <p className="text-gaming-textMuted text-sm mb-4">Level up your motion design skills. Weekly tips, no spam.</p>
              <form className="flex gap-2" action="https://formspree.io/f/your-form-id" method="POST">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 bg-gaming-card/50 border border-gaming-border/50 rounded-lg text-gaming-text placeholder-gaming-textDim text-sm focus:outline-none focus:border-gaming-primary/50 focus:ring-2 focus:ring-gaming-primary/20"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary px-5 py-2.5 text-sm whitespace-nowrap"
                >
                  <span>SUBSCRIBE</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-4 pt-8 border-t border-gaming-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-gaming-textDim text-sm font-mono">
            <span>© {currentYear} MK MOTIONFX</span>
            <span className="hidden sm:inline">|</span>
            <span>All rights reserved</span>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gaming-primary transition-colors">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-gaming-primary transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-4 text-gaming-textDim text-sm font-mono">
            <span className="flex items-center gap-1">
              Built with
              <span className="text-gaming-secondary">❤️</span>
              React + Three.js
            </span>
            <motion.div
              className="w-2 h-2 rounded-full bg-gaming-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span>v3.0.0</span>
          </div>
        </motion.div>

        {/* Scroll to top */}
        <motion.button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gaming-primary/20 border border-gaming-primary/50 text-gaming-primary flex items-center justify-center hover:bg-gaming-primary/30 hover:border-gaming-primary transition-all z-40"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-200px' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
        </motion.button>
      </div>
    </footer>
  )
}