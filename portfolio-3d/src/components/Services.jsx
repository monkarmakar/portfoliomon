import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ServiceCard3D } from './three/ServiceCard3D'

const services = [
  {
    id: 'video-editing',
    title: 'Video Editing',
    short: 'Precision cuts, seamless pacing, story-driven edits',
    description: 'Broadcast-quality editing for YouTube, social media, corporate, documentaries, and commercials. Premiere Pro workflow with multi-cam, proxy, and color-managed pipelines.',
    features: ['Multi-cam editing', 'Proxy workflow', 'Audio mixing', 'Caption/Subtitle design', 'Format optimization'],
    icon: '✂️',
    color: '#00ff88',
    stats: { projects: 18, hours: 500, satisfaction: '100%' },
  },
  {
    id: 'motion-graphics',
    title: 'Motion Graphics',
    short: 'Dynamic animations, kinetic typography, logo reveals',
    description: 'After Effects mastery with expressions, scripts, and plugin ecosystem. From lower thirds to full explainer videos, UI animations, and broadcast packages.',
    features: ['Kinetic typography', 'Logo animations', 'UI/UX motion', 'Data visualization', 'Character rigging'],
    icon: '🎞️',
    color: '#ff006e',
    stats: { projects: 12, hours: 350, satisfaction: '100%' },
  },
  {
    id: 'color-grading',
    title: 'Color Grading',
    short: 'Cinematic looks, HDR workflows, LUT creation',
    description: 'DaVinci Resolve expert grading for narrative, commercial, and social content. Custom LUT development, ACES workflow, HDR delivery, and shot matching.',
    features: ['ACES/HDR workflow', 'Custom LUTs', 'Shot matching', 'Skin tone mastery', 'Creative looks'],
    icon: '🎨',
    color: '#7209b7',
    stats: { projects: 8, hours: 200, satisfaction: '100%' },
  },
  {
    id: 'ai-video',
    title: 'AI Video Generation',
    short: 'Runway, Pika, Sora, Stable Video, custom workflows',
    description: 'Cutting-edge AI video tools integration. Prompt engineering, image-to-video, video-to-video, consistency control, and hybrid AI/traditional pipelines.',
    features: ['Runway Gen-3', 'Pika Labs', 'Stable Video Diffusion', 'Consistency control', 'Hybrid pipelines'],
    icon: '🤖',
    color: '#00d4ff',
    stats: { projects: 5, hours: 120, satisfaction: '100%' },
  },
  {
    id: 'signature-animation',
    title: 'Signature Animation',
    short: 'Custom animated logos, brand motion systems',
    description: 'Distinctive animated brand identities. Logo reveals, animated mascots, motion design systems, and brand guideline animation specs.',
    features: ['Logo animation', 'Brand motion systems', 'Mascot animation', 'Style guides', 'Social media kit'],
    icon: '✍️',
    color: '#ffaa00',
    stats: { projects: 7, hours: 180, satisfaction: '100%' },
  },
  {
    id: 'saas-product',
    title: 'SaaS & Product Videos',
    short: 'Demo videos, feature tours, onboarding flows',
    description: 'Product-focused videos that convert. Screen recording choreography, UI animation, feature highlights, and localization-ready deliverables.',
    features: ['Product demos', 'Feature tours', 'Onboarding videos', 'UI choreography', 'Multi-language'],
    icon: '📦',
    color: '#ff3366',
    stats: { projects: 10, hours: 280, satisfaction: '100%' },
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="services-title"
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
          <span className="font-mono text-gaming-primary text-sm uppercase tracking-wider mb-4 block">02 / Services</span>
          <h2 id="services-title" className="section-title mb-4">Available <span className="text-gradient">Quests</span></h2>
          <p className="text-gaming-textMuted text-lg max-w-2xl mx-auto mt-4">
            Specialized services tailored for brands that need content with impact. Each quest unlocks new levels of engagement.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-gaming-textMuted mb-6 max-w-xl mx-auto">
            Need a custom quest? <span className="text-gaming-primary font-medium">Side missions</span> welcome — let's craft something unique.
          </p>
          <a
            href="#contact"
            className="btn-primary inline-block"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span className="flex items-center gap-2">
              Start a Project
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Background 3D elements */}
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
          <ServicesBackground />
        </Canvas>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      className="relative card-glass card-glass-hover p-6 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderColor: isHovered ? service.color : 'rgba(31,31,46,0.5)' }}
    >
      {/* 3D Icon Preview */}
      <div className="relative mb-6 h-32 flex items-center justify-center">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 30 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={['#0a0a0f', 0]} />
          <ServiceCard3D color={service.color} type={index} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 3, 5]} intensity={1} color={service.color} />
          <pointLight position={[0, 2, 5]} intensity={2} color={service.color} distance={20} decay={2} />
        </Canvas>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br"
          style={{ background: `radial-gradient(ellipse at center, ${service.color}33 0%, transparent 70%)` }}
          animate={{ opacity: isHovered ? 1 : 0.3, scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl mt-1">{service.icon}</span>
          <div className="flex-1">
            <h3 className="font-display text-xl font-bold text-gaming-text">{service.title}</h3>
            <p className="text-gaming-textMuted text-sm mt-1">{service.short}</p>
          </div>
        </div>

        <p className="text-gaming-textMuted text-sm leading-relaxed mb-4 flex-1">{service.description}</p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          {service.features.slice(0, 4).map((feature, i) => (
            <motion.span
              key={i}
              className="px-2.5 py-1 text-xs font-mono bg-gaming-card border border-gaming-border/50 text-gaming-textMuted rounded hover:border-gaming-primary/50 hover:text-gaming-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gaming-border/30">
          <StatMini label="Projects" value={service.stats.projects} />
          <StatMini label="Hours" value={service.stats.hours} />
          <StatMini label="Rating" value={service.stats.satisfaction} />
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-b-lg bg-gradient-to-r"
        style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}88)` }}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ type: 'spring', stiffness: 500 }}
      />
    </div>
  )
}

function StatMini({ label, value }) {
  return (
    <div className="text-center">
      <div className="font-display font-bold text-lg text-gaming-primary">{value}</div>
      <div className="font-mono text-xs text-gaming-textMuted uppercase tracking-wider">{label}</div>
    </div>
  )
}

function ServicesBackground() {
  // Floating service icons in 3D space
  return null // Handled by main Scene3D
}

import React from 'react'