import { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Html, Scroll } from '@react-three/drei'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { Scene3D } from './components/three/Scene3D'
import { FloatingParticles } from './components/three/FloatingParticles'
import { GridBackground } from './components/three/GridBackground'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />

      {/* 3D Canvas Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 50 }}
          gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
          style={{ touchAction: 'none' }}
        >
          <color attach="background" args={['#0a0a0f']} />
          <fog attach="fog" args={['#0a0a0f', 10, 100]} />

          <GridBackground />
          <FloatingParticles count={150} />
          <Scene3D />

          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight position={[10, 10, 10]} intensity={0.5} color="#00ff88" />
          <directionalLight position={[-10, -5, 5]} intensity={0.3} color="#ff006e" />
          <pointLight position={[0, 5, 10]} intensity={2} color="#7209b7" distance={50} decay={2} />
        </Canvas>
      </div>
    </div>
  )
}

export default App