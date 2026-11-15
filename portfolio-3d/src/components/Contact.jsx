import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ContactScene } from './three/ContactScene'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error
  const [errors, setErrors] = useState({})
  const formRef = useRef(null)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.project.trim()) newErrors.project = 'Project type is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setStatus('submitting')

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // In production, replace with actual form submission (Formspree, Netlify Forms, etc.)
    // const response = await fetch('https://formspree.io/f/your-form-id', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })

    setStatus('success')
    setFormData({ name: '', email: '', project: '', budget: '', message: '' })

    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const projectTypes = [
    { value: '', label: 'SELECT QUEST TYPE' },
    { value: 'video-editing', label: '🎬 Video Editing' },
    { value: 'motion-graphics', label: '🎞️ Motion Graphics' },
    { value: 'color-grading', label: '🎨 Color Grading' },
    { value: 'ai-video', label: '🤖 AI Video Generation' },
    { value: 'signature-animation', label: '✍️ Signature Animation' },
    { value: 'saas-product', label: '📦 SaaS/Product Video' },
    { value: 'custom', label: '✨ Custom Quest' },
  ]

  const budgetOptions = [
    { value: '', label: 'SELECT BUDGET TIER' },
    { value: 'starter', label: '🥉 Starter ($500-1,500)' },
    { value: 'pro', label: '🥈 Pro ($1,500-5,000)' },
    { value: 'epic', label: '🥇 Epic ($5,000-15,000)' },
    { value: 'legendary', label: '💎 Legendary ($15,000+)' },
    { value: 'discuss', label: '💬 Let\'s Discuss' },
  ]

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-gaming-primary text-sm uppercase tracking-wider mb-4 block">04 / Contact</span>
          <h2 id="contact-title" className="section-title mb-4">Start a <span className="text-gradient">New Quest</span></h2>
          <p className="text-gaming-textMuted text-lg max-w-2xl mx-auto mt-4">
            Ready to level up your content? Fill out the quest form and I'll get back within 24 hours with a strategy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info & Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '📧', label: 'Email', value: 'hello@mkmotionfx.com', href: 'mailto:hello@mkmotionfx.com' },
                { icon: '💬', label: 'Discord', value: 'mkmotionfx', href: 'https://discord.gg/example' },
                { icon: '🐦', label: 'Twitter/X', value: '@mkmotionfx', href: 'https://twitter.com/mkmotionfx' },
                { icon: '💼', label: 'LinkedIn', value: 'mk-motionfx', href: 'https://linkedin.com/in/mkmotionfx' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass p-5 group flex items-start gap-4"
                  whileHover={{ y: -3, scale: 1.01, borderColor: 'rgba(0,255,136,0.5)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gaming-primary/10 border border-gaming-primary/20 flex items-center justify-center text-2xl group-hover:bg-gaming-primary/20 group-hover:border-gaming-primary/50 transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gaming-textMuted uppercase tracking-wider">{item.label}</div>
                    <div className="font-medium text-gaming-text mt-1 group-hover:text-gaming-primary transition-colors">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="card-glass p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-3 h-3 rounded-full bg-gaming-primary"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                  <div className="font-display font-bold text-gaming-text">STATUS: AVAILABLE</div>
                  <div className="font-mono text-xs text-gaming-textMuted">Accepting new quests for Q1 2025</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gaming-card/50 border border-gaming-border/50 rounded-lg">
                  <div className="font-display font-bold text-2xl text-gaming-primary">2-3</div>
                  <div className="font-mono text-xs text-gaming-textMuted">WEEKS LEAD TIME</div>
                </div>
                <div className="p-3 bg-gaming-card/50 border border-gaming-border/50 rounded-lg">
                  <div className="font-display font-bold text-2xl text-gaming-secondary">24h</div>
                  <div className="font-mono text-xs text-gaming-textMuted">RESPONSE TIME</div>
                </div>
                <div className="p-3 bg-gaming-card/50 border border-gaming-border/50 rounded-lg">
                  <div className="font-display font-bold text-2xl text-gaming-accent">∞</div>
                  <div className="font-mono text-xs text-gaming-textMuted">REVISIONS*</div>
                </div>
              </div>
              <p className="font-mono text-xs text-gaming-textDim mt-4 text-center">* Reasonable revisions within scope</p>
            </div>

            {/* Process Steps */}
            <div>
              <h3 className="font-display text-lg font-bold text-gaming-text mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-gaming-primary to-gaming-secondary rounded-full" />
                Quest Process
              </h3>
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Discovery Call', desc: '15-min call to understand your vision, goals, and requirements' },
                  { step: '02', title: 'Proposal & Contract', desc: 'Detailed scope, timeline, and pricing delivered within 48 hours' },
                  { step: '03', title: 'Production', desc: 'Iterative creation with regular updates and feedback loops' },
                  { step: '04', title: 'Delivery & Launch', desc: 'Final files in all formats, plus launch optimization tips' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-4 card-glass p-4 group"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gaming-primary/10 border border-gaming-primary/20 flex items-center justify-center font-display font-bold text-gaming-primary">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gaming-text">{item.title}</h4>
                      <p className="text-gaming-textMuted text-sm mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="card-glass p-6 lg:p-8 relative overflow-hidden">
              {/* 3D Form Background */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <Canvas
                  camera={{ position: [0, 0, 20], fov: 40 }}
                  gl={{ antialias: true, alpha: true }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <color attach="background" args={['#0a0a0f', 0]} />
                  <ContactScene />
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 5, 5]} intensity={0.8} color="#00ff88" />
                  <directionalLight position={[-5, -5, 5]} intensity={0.4} color="#ff006e" />
                </Canvas>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-5" noValidate>
                {/* Form Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="PLAYER NAME"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon="👤"
                    required
                  />
                  <FormField
                    label="EMAIL ADDRESS"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon="📧"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormSelect
                    label="QUEST TYPE"
                    name="project"
                    options={projectTypes}
                    value={formData.project}
                    onChange={handleChange}
                    error={errors.project}
                    icon="🎮"
                    required
                  />
                  <FormSelect
                    label="BUDGET TIER"
                    name="budget"
                    options={budgetOptions}
                    value={formData.budget}
                    onChange={handleChange}
                    error={errors.budget}
                    icon="💰"
                  />
                </div>

                <FormField
                  label="QUEST DETAILS"
                  name="message"
                  type="textarea"
                  placeholder="Describe your project, goals, timeline, and any specific requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  icon="📝"
                  rows={5}
                  required
                />

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="flex items-center justify-center gap-3">
                    {status === 'submitting' && (
                      <>
                        <motion.span className="w-5 h-5 border-2 border-gaming-bg/30 border-t-gaming-bg rounded-full animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    )}
                    {status === 'success' && (
                      <>
                        <span className="text-2xl">✅</span>
                        <span>QUEST ACCEPTED!</span>
                      </>
                    )}
                    {status === 'idle' && (
                      <>
                        <span>LAUNCH QUEST</span>
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Status Messages */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      className="p-4 bg-gaming-primary/10 border border-gaming-primary/30 rounded-lg text-gaming-primary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-2">
                        <span>✅</span>
                        <span className="font-medium">Message sent successfully!</span>
                      </div>
                      <p className="text-sm mt-1">I'll respond within 24 hours. Check your email for confirmation.</p>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      className="p-4 bg-gaming-secondary/10 border border-gaming-secondary/30 rounded-lg text-gaming-secondary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-center gap-2">
                        <span>❌</span>
                        <span className="font-medium">Transmission failed</span>
                      </div>
                      <p className="text-sm mt-1">Please try again or contact directly at hello@mkmotionfx.com</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="font-mono text-xs text-gaming-textDim text-center">
                  By submitting, you agree to our <a href="#" className="text-gaming-primary hover:underline">Privacy Policy</a>. No spam, ever.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3D Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#0a0a0f', 0]} />
          <fog attach="fog" args={['#0a0a0f', 30, 100]} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
        </Canvas>
      </div>
    </section>
  )
}

function FormField({ label, name, type, placeholder, value, onChange, error, icon, required, rows }) {
  const inputId = `contact-${name}`
  const errorId = `${inputId}-error`

  if (type === 'textarea') {
    return (
      <div className="relative">
        <label htmlFor={inputId} className="block font-mono text-xs text-gaming-primary uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>{icon}</span>
          {label}
          {required && <span className="text-gaming-secondary">*</span>}
        </label>
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 bg-gaming-card/50 border rounded-lg text-gaming-text placeholder-gaming-textDim font-sans text-sm resize-none transition-all focus:outline-none ${
            error
              ? 'border-gaming-secondary/50 focus:border-gaming-secondary focus:ring-2 focus:ring-gaming-secondary/20'
              : 'border-gaming-border/50 focus:border-gaming-primary/50 focus:ring-2 focus:ring-gaming-primary/20'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : undefined}
        />
        {error && (
          <motion.p
            id={errorId}
            className="mt-1.5 font-mono text-xs text-gaming-secondary flex items-center gap-1"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span>⚠</span>
            {error}
          </motion.p>
        )}
      </div>
    )
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="block font-mono text-xs text-gaming-primary uppercase tracking-wider mb-2 flex items-center gap-2">
        <span>{icon}</span>
        {label}
        {required && <span className="text-gaming-secondary">*</span>}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gaming-card/50 border rounded-lg text-gaming-text placeholder-gaming-textDim font-sans text-sm transition-all focus:outline-none ${
          error
            ? 'border-gaming-secondary/50 focus:border-gaming-secondary focus:ring-2 focus:ring-gaming-secondary/20'
            : 'border-gaming-border/50 focus:border-gaming-primary/50 focus:ring-2 focus:ring-gaming-primary/20'
        }`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <motion.p
          id={errorId}
          className="mt-1.5 font-mono text-xs text-gaming-secondary flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>⚠</span>
          {error}
        </motion.p>
      )}
    </div>
  )
}

function FormSelect({ label, name, options, value, onChange, error, icon, required }) {
  const inputId = `contact-${name}`
  const errorId = `${inputId}-error`

  return (
    <div className="relative">
      <label htmlFor={inputId} className="block font-mono text-xs text-gaming-primary uppercase tracking-wider mb-2 flex items-center gap-2">
        <span>{icon}</span>
        {label}
        {required && <span className="text-gaming-secondary">*</span>}
      </label>
      <select
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gaming-card/50 border rounded-lg text-gaming-text font-sans text-sm appearance-none transition-all focus:outline-none cursor-pointer ${
          error
            ? 'border-gaming-secondary/50 focus:border-gaming-secondary focus:ring-2 focus:ring-gaming-secondary/20'
            : 'border-gaming-border/50 focus:border-gaming-primary/50 focus:ring-2 focus:ring-gaming-primary/20'
        }`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gaming-textMuted">▼</div>
      {error && (
        <motion.p
          id={errorId}
          className="mt-1.5 font-mono text-xs text-gaming-secondary flex items-center gap-1"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>⚠</span>
          {error}
        </motion.p>
      )}
    </div>
  )
}

import { AnimatePresence } from 'framer-motion'