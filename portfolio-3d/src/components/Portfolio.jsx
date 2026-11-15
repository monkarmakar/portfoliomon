import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { PortfolioScene } from './three/PortfolioScene'

const categories = [
  { id: 'all', label: 'ALL LEVELS', icon: '🎮' },
  { id: 'saas', label: 'SAAS', icon: '📦' },
  { id: 'best-work', label: 'BEST WORK', icon: '⭐' },
  { id: 'roadcoderr', label: 'ROADCODERR', icon: '🛣️' },
  { id: 'signature', label: 'SIGNATURE', icon: '✍️' },
  { id: 'gig', label: 'GIG VIDEOS', icon: '🎤' },
  { id: 'ai', label: 'AI GENERATED', icon: '🤖' },
  { id: 'podcast', label: 'PODCAST', icon: '🎙️' },
  { id: 'talking-head', label: 'TALKING HEAD', icon: '🗣️' },
  { id: 'shorts', label: 'SHORTS', icon: '📱' },
]

const projects = [
  {
    id: 1,
    title: 'SaaS Product Launch',
    category: 'saas',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example1/view',
    description: 'Product launch video for B2B SaaS platform',
    tools: ['Premiere Pro', 'After Effects', 'Figma'],
    stats: { views: '125K', likes: '3.2K', conversion: '+45%' },
  },
  {
    id: 2,
    title: 'Brand Motion System',
    category: 'signature',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example2/view',
    description: 'Complete animated brand identity system',
    tools: ['After Effects', 'Cinema 4D', 'Illustrator'],
    stats: { views: '89K', likes: '2.8K', awards: '2' },
  },
  {
    id: 3,
    title: 'AI Generated Short Film',
    category: 'ai',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example3/view',
    description: 'Experimental short using Runway Gen-3 & Pika',
    tools: ['Runway Gen-3', 'Pika Labs', 'Topaz Video AI'],
    stats: { views: '234K', likes: '8.9K', viral: true },
  },
  {
    id: 4,
    title: 'Podcast Episode Edit',
    category: 'podcast',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example4/view',
    description: 'Full episode edit with motion graphics package',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    stats: { views: '67K', likes: '1.5K', retention: '78%' },
  },
  {
    id: 5,
    title: 'Roadcoderr Documentary',
    category: 'roadcoderr',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example5/view',
    description: 'Mini-doc series for developer education platform',
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    stats: { views: '156K', likes: '4.1K', episodes: '8' },
  },
  {
    id: 6,
    title: 'Gig Promo Video',
    category: 'gig',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161f1547?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example6/view',
    description: 'High-energy promo for live music event',
    tools: ['Premiere Pro', 'After Effects', 'Cinema 4D'],
    stats: { views: '78K', likes: '2.3K', ticketSales: 'Sold Out' },
  },
  {
    id: 7,
    title: 'Talking Head Masterclass',
    category: 'talking-head',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example7/view',
    description: 'Educational series with dynamic B-roll & graphics',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    stats: { views: '92K', likes: '3.7K', completion: '82%' },
  },
  {
    id: 8,
    title: 'Viral Shorts Series',
    category: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example8/view',
    description: '15 vertical shorts for TikTok/Reels/Shorts',
    tools: ['Premiere Pro', 'After Effects', 'CapCut'],
    stats: { views: '2.1M', likes: '187K', viral: true },
  },
  {
    id: 9,
    title: 'Best Work Compilation',
    category: 'best-work',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&h=450&fit=crop',
    videoUrl: 'https://drive.google.com/file/d/1example9/view',
    description: 'Curated showreel of top projects 2023-2024',
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    stats: { views: '45K', likes: '2.1K', featured: true },
  },
]

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [filterText, setFilterText] = useState('')

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory
    const matchesSearch = project.title.toLowerCase().includes(filterText.toLowerCase()) ||
      project.description.toLowerCase().includes(filterText.toLowerCase()) ||
      project.tools.some(t => t.toLowerCase().includes(filterText.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section
      id="portfolio"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="portfolio-title"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-gaming-primary text-sm uppercase tracking-wider mb-4 block">03 / Portfolio</span>
              <h2 id="portfolio-title" className="section-title">Selected <span className="text-gradient">Levels</span></h2>
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search levels..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full px-4 py-3 bg-gaming-card/50 border border-gaming-border/50 rounded-lg text-gaming-text placeholder-gaming-textDim font-mono text-sm focus:outline-none focus:border-gaming-primary/50 focus:ring-2 focus:ring-gaming-primary/20 transition-all"
                aria-label="Search projects"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gaming-textMuted">🔍</div>
            </div>
          </div>

          {/* Category Tabs - Gaming Style */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                aria-controls={`panel-${cat.id}`}
                className={`relative px-4 py-2 font-display text-sm font-medium uppercase tracking-wider rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-gaming-primary/20 to-gaming-secondary/20 text-gaming-primary border border-gaming-primary/50 shadow-[0_0_20px_rgba(0,255,136,0.2)]'
                    : 'text-gaming-textMuted hover:text-gaming-text hover:bg-gaming-card/50 hover:border-gaming-border/50 border border-transparent'
                }`}
                onClick={() => setActiveCategory(cat.id)}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.label}
                </span>
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-gaming-primary to-gaming-secondary rounded-full"
                  animate={{ width: activeCategory === cat.id ? '80%' : 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filteredProjects.length === 0 ? (
              <motion.div
                className="col-span-full text-center py-20 card-glass"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gaming-textMuted">No levels found matching your criteria</p>
                <p className="text-gaming-textDim text-sm mt-2">Try adjusting your filters or search term</p>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Load More / View All */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="https://drive.google.com/drive/folders/1example" target="_blank" rel="noopener noreferrer"
            className="btn-secondary inline-block"
          >
            <span className="flex items-center gap-2">
              View All on Drive
              <span>🔗</span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

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
          <PortfolioScene activeCategory={activeCategory} />
        </Canvas>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="relative card-glass card-glass-hover overflow-hidden group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 font-mono text-xs bg-gaming-primary/90 text-gaming-bg rounded tracking-wider">
            {categories.find(c => c.id === project.category)?.label || project.category}
          </span>
        </div>
        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ scale: hovered ? 1 : 0.8 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <motion.div
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gaming-primary/90 flex items-center justify-center text-gaming-bg shadow-[0_0_40px_rgba(0,255,136,0.5)]"
            animate={{ rotate: [0, 0, 360], boxShadow: ['0 0 20px rgba(0,255,136,0.5)', '0 0 40px rgba(0,255,136,0.8)', '0 0 20px rgba(0,255,136,0.5)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg className="w-6 h-6 lg:w-8 lg:h-8 ml-1 text-gaming-bg" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </motion.div>
        </motion.div>

        {/* Stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-xs">
              {Object.entries(project.stats).map(([key, value]) => (
                <span key={key} className="flex items-center gap-1 text-gaming-textMuted">
                  <span className="text-gaming-primary font-mono">{value}</span>
                  <span className="uppercase tracking-wider">{key}</span>
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-gaming-primary opacity-0 group-hover:opacity-100 transition-opacity">
              VIEW PROJECT →
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-gaming-text mb-2 group-hover:text-gaming-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gaming-textMuted text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tools.slice(0, 3).map((tool, i) => (
            <span key={i} className="px-2 py-0.5 text-xs font-mono bg-gaming-card border border-gaming-border/50 text-gaming-textMuted rounded hover:border-gaming-primary/50 hover:text-gaming-primary transition-colors">
              {tool}
            </span>
          ))}
          {project.tools.length > 3 && (
            <span className="px-2 py-0.5 text-xs font-mono bg-gaming-card border border-gaming-border/50 text-gaming-textDim rounded">
              +{project.tools.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gaming-primary/10 via-transparent to-gaming-secondary/10 opacity-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  )
}

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    modalRef.current?.focus()
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden card-glass flex flex-col"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gaming-card/80 border border-gaming-border/50 text-gaming-textMuted hover:text-gaming-primary hover:border-gaming-primary/50 flex items-center justify-center transition-all"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <span className="px-3 py-1 font-mono text-xs bg-gaming-primary/20 text-gaming-primary border border-gaming-primary/30 rounded tracking-wider mb-3 block w-fit">
                {categories.find(c => c.id === project.category)?.label || project.category}
              </span>
              <h2 id="modal-title" className="font-display text-2xl lg:text-3xl font-bold text-gaming-text">{project.title}</h2>
            </div>
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap"
            >
              <span className="flex items-center gap-2">Watch Full Video <span>→</span></span>
            </a>
          </div>

          {/* Thumbnail */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-display text-lg font-bold text-gaming-text mb-3">Mission Brief</h3>
            <p className="text-gaming-textMuted leading-relaxed">{project.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-display text-lg font-bold text-gaming-text mb-3">Tools & Weapons</h3>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1.5 font-mono text-sm bg-gaming-card border border-gaming-border/50 text-gaming-text rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-gaming-text mb-3">Level Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    className="card-glass p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="font-display font-bold text-2xl text-gaming-primary">{value}</div>
                    <div className="font-mono text-xs text-gaming-textMuted uppercase tracking-wider">{key}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

import React from 'react'