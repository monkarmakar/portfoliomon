import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'
import * as THREE from 'three'

// 3D Hero Scene with floating geometric shapes
function HeroScene() {
  const groupRef = useRef()
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05
      groupRef.current.rotation.x += delta * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {/* Central floating shape */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={(e) => { e.stopPropagation(); }}
        onPointerOut={(e) => { e.stopPropagation(); }}
      >
        <icosahedronGeometry args={[3, 1]} />
        <meshPhysicalMaterial
          color="#00ff88"
          transparent
          opacity={0.15}
          transmission={0.9}
          thickness={0.5}
          roughness={0}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[3.05, 1]} />
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Rotating ring */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[5, 0.08, 8, 64]} />
          <meshBasicMaterial
            color="#ff006e"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Second ring counter-rotating */}
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[6.5, 0.05, 6, 64]} />
          <meshBasicMaterial
            color="#7209b7"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Floating particles around */}
      <ParticleField count={30} radius={12} color="#00ff88" size={0.15} speed={0.2} />
      <ParticleField count={20} radius={15} color="#ff006e" size={0.1} speed={0.15} />
      <ParticleField count={15} radius={18} color="#7209b7" size={0.08} speed={0.1} />
    </group>
  )
}

function ParticleField({ count, radius, color, size, speed }) {
  const pointsRef = useRef()
  const positions = useRef([])

  // Initialize positions
  if (positions.current.length === 0) {
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.7 + Math.random() * 0.3)
      positions.current.push({
        theta,
        phi,
        r,
        speed: speed * (0.5 + Math.random() * 0.5),
        offset: Math.random() * Math.PI * 2,
      })
    }
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positionsArray = pointsRef.current.geometry.attributes.position.array
      let idx = 0
      positions.current.forEach((p, i) => {
        p.theta += delta * p.speed
        p.phi += delta * p.speed * 0.3
        const x = p.r * Math.sin(p.phi) * Math.cos(p.theta)
        const y = p.r * Math.cos(p.phi)
        const z = p.r * Math.sin(p.phi) * Math.sin(p.theta)
        positionsArray[idx++] = x
        positionsArray[idx++] = y
        positionsArray[idx++] = z
      })
      pointsRef.current.geometry.attributes.position.needsUpdate = true
      pointsRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          itemSize={3}
          array={new Float32Array(count * 3)}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Mouse follower glow effect
function MouseGlow() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const glowRef = useRef()

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame(() => {
    if (glowRef.current) {
      glowRef.current.position.x += (mouse.x * 15 - glowRef.current.position.x) * 0.05
      glowRef.current.position.y += (mouse.y * 10 - glowRef.current.position.y) * 0.05
    }
  })

  return (
    <mesh ref={glowRef} position={[0, 0, 20]}>
      <circleGeometry args={[25, 64]} />
      <meshBasicMaterial
        color="#00ff88"
        transparent
        opacity={0.03}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

import { useState } from 'react'

export default function Hero() {
  const scrollTo = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background grid and glow */}
      <div className="absolute inset-0 grid-bg" />
      <div className="radial-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 -z-10">
        <Canvas
          camera={{ position: [0, 0, 30], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ touchAction: 'none' }}
        >
          <color attach="background" args={['#0a0a0f', 0]} />
          <fog attach="fog" args={['#0a0a0f', 20, 100]} />
          <HeroScene />
          <MouseGlow />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 7]} intensity={1} color="#00ff88" />
          <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#ff006e" />
          <pointLight position={[0, 0, 15]} intensity={2} color="#7209b7" distance={50} decay={2} />
        </Canvas>
      </div>

      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-20" />

      {/* Content */}
      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gaming-card/50 border border-gaming-primary/30 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-gaming-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-xs text-gaming-primary uppercase tracking-wider">
              Available for Freelance
            </span>
            <span className="text-gaming-textMuted text-xs">|</span>
            <span className="font-mono text-xs text-gaming-textMuted uppercase tracking-wider">
              Video Editor & Motion Designer
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            id="hero-title"
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="block text-gaming-text">Edits That</span>
            <span className="block glitch-text text-gaming-primary" data-text="Stop the Scroll">
              Stop the Scroll
            </span>
            <span className="block text-gaming-text mt-2 text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wide text-gaming-textMuted">
              Motion Design • Video Editing • Visual Effects
            </span>
          </motion.h1>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <StatItem value="38+" label="Projects Delivered" icon="🎬" />
            <StatItem value="8" label="Categories" icon="📁" />
            <StatItem value="100%" label="Client Focus" icon="🎯" />
            <StatItem value="24/7" label="Support" icon="⚡" />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#portfolio"
              className="btn-primary w-full sm:w-auto"
              onClick={(e) => { e.preventDefault(); scrollTo('#portfolio'); }}
            >
              <span className="flex items-center gap-2">
                View My Work
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </a>
            <a
              href="#contact"
              className="btn-secondary w-full sm:w-auto"
              onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            >
              <span className="flex items-center gap-2">
                Let's Talk
                <span>💬</span>
              </span>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gaming-textMuted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <span className="font-mono text-xs uppercase tracking-wider">Scroll to Explore</span>
            <motion.div
              className="w-1 h-10 relative overflow-hidden"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute w-full h-1/3 bg-gradient-to-b from-gaming-primary to-transparent rounded-full"
                animate={{ y: ['-100%', '300%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <FloatingOrbs />
    </section>
  )
}

function StatItem({ value, label, icon }) {
  return (
    <div className="flex flex-col items-center gap-1 group">
      <div className="relative">
        <span className="text-gaming-text">{icon}</span>
      </div>
      <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gaming-primary">
        {value}
      </div>
      <div className="font-mono text-xs text-gaming-textMuted uppercase tracking-wider">
        {label}
      </div>
      <motion.div
        className="mt-2 h-0.5 w-0 bg-gradient-to-r from-gaming-primary to-gaming-secondary rounded-full"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ type: 'spring', stiffness: 500 }}
      />
    </div>
  )
}

function FloatingOrbs() {
  const orbs = [
    { x: '5%', y: '15%', size: 'w-24 h-24', color: 'bg-gaming-primary/10', blur: 'blur-3xl', delay: 0 },
    { x: '90%', y: '20%', size: 'w-32 h-32', color: 'bg-gaming-secondary/10', blur: 'blur-3xl', delay: 1 },
    { x: '10%', y: '70%', size: 'w-20 h-20', color: 'bg-gaming-accent/10', blur: 'blur-3xl', delay: 2 },
    { x: '85%', y: '80%', size: 'w-28 h-28', color: 'bg-gaming-primary/10', blur: 'blur-3xl', delay: 3 },
  ]

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${orb.size} ${orb.color} ${orb.blur} pointer-events-none`}
          style={{ left: orb.x, top: orb.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: orb.delay }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border border-gaming-primary/20"
            animate={{ rotate: 360, borderRadius: ['50%', '30% 70% 70% 30% / 30% 30% 70% 70%', '50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      ))}
    </>
  )
}