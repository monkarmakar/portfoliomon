import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { AboutScene } from './three/AboutScene'

const skills = [
  { name: 'Premiere Pro', level: 98, category: 'Video Editing', icon: '✂️' },
  { name: 'After Effects', level: 95, category: 'Motion Graphics', icon: '🎞️' },
  { name: 'DaVinci Resolve', level: 90, category: 'Color Grading', icon: '🎨' },
  { name: 'Cinema 4D', level: 85, category: '3D Motion', icon: '📦' },
  { name: 'Blender', level: 80, category: '3D Modeling', icon: '🔷' },
  { name: 'Photoshop', level: 92, category: 'Design', icon: '🖼️' },
  { name: 'Illustrator', level: 88, category: 'Vector Graphics', icon: '✏️' },
  { name: 'AI Video Tools', level: 82, category: 'AI Generation', icon: '🤖' },
]

const experience = [
  {
    role: 'Senior Video Editor & Motion Designer',
    company: 'Freelance / Agency Work',
    period: '2021 - Present',
    description: 'Delivering high-end video content for SaaS brands, tech companies, and content creators. Specialized in scroll-stopping edits, motion graphics, and brand storytelling.',
    achievements: ['38+ projects delivered', '100% client retention', 'Featured on Behance', 'Worked with 8+ industries'],
  },
  {
    role: 'Motion Graphics Designer',
    company: 'Creative Studio',
    period: '2019 - 2021',
    description: 'Created broadcast-quality motion graphics for TV commercials, social media campaigns, and brand identities. Mastered After Effects expressions and Cinema 4D integration.',
    achievements: ['50+ motion projects', 'Award-winning campaigns', 'Team lead for 3 designers'],
  },
  {
    role: 'Junior Video Editor',
    company: 'Production House',
    period: '2017 - 2019',
    description: 'Started career editing corporate videos, documentaries, and event coverage. Built strong foundation in pacing, storytelling, and client communication.',
    achievements: ['100+ videos edited', 'Learned full post-production pipeline', 'Mentored by industry veterans'],
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 overflow-hidden"
      aria-labelledby="about-title"
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
          <span className="font-mono text-gaming-primary text-sm uppercase tracking-wider mb-4 block">01 / About Me</span>
          <h2 id="about-title" className="section-title mb-4">Level Up Your <span className="text-gradient">Profile</span></h2>
          <p className="text-gaming-textMuted text-lg max-w-2xl mx-auto mt-4">
            Video editor & motion graphics designer crafting scroll-stopping content for brands that refuse to be ignored.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Profile Card + 3D Scene */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-lg">
              <Canvas
                camera={{ position: [0, 0, 15], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%' }}
              >
                <color attach="background" args={['#0a0a0f', 0]} />
                <AboutScene />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} color="#00ff88" />
                <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#ff006e" />
                <pointLight position={[0, 3, 10]} intensity={2} color="#7209b7" distance={30} decay={2} />
              </Canvas>

              {/* Profile overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-48 h-48 lg:w-64 lg:h-64 rounded-[50%] border-4 border-gaming-primary/50 bg-gaming-bg/80 backdrop-blur-xl flex items-center justify-center"
                  animate={{ rotate: [0, 0, 360], borderRadius: ['50%', '60% 40% 30% 70% / 60% 30% 70% 40%', '50%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-[90%] h-[90%] rounded-[50%] bg-gradient-to-br from-gaming-primary/20 via-gaming-bg to-gaming-secondary/20 border border-gaming-primary/30 flex items-center justify-center">
                    <span className="text-6xl lg:text-8xl">🎬</span>
                  </div>
                </motion.div>

                {/* Corner decorations */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gaming-primary/50 rounded-tl-xl" />
                <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-gaming-secondary/50 rounded-tr-xl" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-gaming-accent/50 rounded-bl-xl" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gaming-primary/50 rounded-br-xl" />
              </div>
            </div>

            {/* Stats around profile */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto lg:max-w-lg">
              {[
                { value: '5+', label: 'Years Exp' },
                { value: '38+', label: 'Projects' },
                { value: '8', label: 'Categories' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="card-glass p-4 text-center group"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className="font-display font-bold text-2xl lg:text-3xl text-gaming-primary">{stat.value}</div>
                  <div className="font-mono text-xs text-gaming-textMuted uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Skills + Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            {/* Bio */}
            <div className="card-glass p-6 lg:p-8">
              <h3 className="font-display text-xl lg:text-2xl font-bold text-gaming-text mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-gaming-primary to-gaming-secondary rounded-full" />
                Player Profile
              </h3>
              <div className="space-y-4 text-gaming-textMuted leading-relaxed">
                <p>
                  Hey! I'm <span className="text-gaming-text font-medium">MK</span> — a video editor and motion graphics designer
                  obsessed with creating content that makes people stop scrolling.
                </p>
                <p>
                  With <span className="text-gaming-primary font-medium">5+ years</span> in the industry, I've crafted everything from
                  high-converting SaaS product videos to viral social content, broadcast commercials, and immersive motion experiences.
                </p>
                <p>
                  My weapon of choice? <span className="text-gaming-secondary font-medium">Premiere Pro</span> for surgical precision editing,
                  <span className="text-gaming-accent font-medium">After Effects</span> for mind-bending motion graphics,
                  and <span className="text-gaming-primary font-medium">DaVinci Resolve</span> for cinematic color grading.
                </p>
                <p className="text-gaming-primary font-medium">
                  Currently: Leveling up in AI video generation & real-time 3D motion design 🚀
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-gaming-text mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-gaming-secondary to-gaming-accent rounded-full" />
                Skill Tree
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    className="card-glass p-4 group relative overflow-hidden"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{skill.icon}</span>
                      <div>
                        <div className="font-medium text-gaming-text">{skill.name}</div>
                        <div className="font-mono text-xs text-gaming-textMuted">{skill.category}</div>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gaming-bg rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gaming-primary via-gaming-secondary to-gaming-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 font-mono text-xs text-gaming-textMuted opacity-0 group-hover:opacity-100 transition-opacity">
                      {skill.level}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-gaming-text mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-gradient-to-b from-gaming-accent to-gaming-primary rounded-full" />
                Quest Log
              </h3>
              <div className="space-y-4">
                {experience.map((job, i) => (
                  <motion.div
                    key={i}
                    className="card-glass p-6 relative group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <div className="font-display font-bold text-lg text-gaming-text">{job.role}</div>
                        <div className="text-gaming-secondary font-medium mt-1">{job.company}</div>
                        <div className="font-mono text-xs text-gaming-textMuted mt-1">{job.period}</div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {job.achievements.map((achievement, j) => (
                          <motion.span
                            key={j}
                            className="px-2 py-1 text-xs font-mono bg-gaming-primary/10 border border-gaming-primary/20 text-gaming-primary rounded"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,255,136,0.2)' }}
                          >
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gaming-textMuted leading-relaxed">{job.description}</p>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gaming-primary to-gaming-secondary"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}