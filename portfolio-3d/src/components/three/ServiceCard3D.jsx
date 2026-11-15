import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ServiceCard3D({ color = '#00ff88', type = 0 }) {
  const groupRef = useRef()
  const meshesRef = useRef([])
  const wireframesRef = useRef([])

  const geometry = useMemo(() => {
    switch (type % 6) {
      case 0: return new THREE.OctahedronGeometry(1.2, 1)
      case 1: return new THREE.TetrahedronGeometry(1.4, 0)
      case 2: return new THREE.IcosahedronGeometry(1.1, 1)
      case 3: return new THREE.BoxGeometry(1.5, 1.5, 1.5, 2, 2, 2)
      case 4: return new THREE.ConeGeometry(1, 2, 6)
      case 5: return new THREE.TorusGeometry(1, 0.4, 8, 16)
      default: return new THREE.OctahedronGeometry(1.2, 1)
    }
  }, [type])

  useEffect(() => {
    const group = new THREE.Group()
    groupRef.current = group

    // Main mesh
    const material = new THREE.MeshPhysicalMaterial({
      color,
      transparent: true,
      opacity: 0.2,
      transmission: 0.95,
      thickness: 0.3,
      roughness: 0,
      metalness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5,
    })

    const wireMaterial = new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })

    const mesh = new THREE.Mesh(geometry, material)
    const wireMesh = new THREE.Mesh(geometry, wireMaterial)
    wireMesh.scale.setScalar(1.02)

    group.add(mesh)
    group.add(wireMesh)
    meshesRef.current.push(mesh)
    wireframesRef.current.push(wireMesh)

    // Particle ring
    const particleCount = 30
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 2.5
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1
      positions[i * 3 + 2] = Math.sin(angle) * radius
      sizes[i] = 0.05 + Math.random() * 0.08
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particleMat = new THREE.PointsMaterial({
      color,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    particles.userData = { basePositions: positions.slice() }
    group.add(particles)
    group.userData.particles = particles
  }, [geometry, color])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const group = groupRef.current

    // Main rotation
    group.rotation.x += delta * 0.3
    group.rotation.y += delta * 0.5
    group.rotation.z += delta * 0.2

    // Float
    group.position.y = Math.sin(time * 1.5) * 0.3

    // Wireframe pulse
    wireframesRef.current.forEach((wire, i) => {
      wire.scale.setScalar(1.02 + Math.sin(time * 2 + i) * 0.02)
      wire.material.opacity = 0.4 + Math.sin(time * 3 + i) * 0.2
    })

    // Particle ring rotation and pulse
    if (group.userData.particles) {
      const particles = group.userData.particles
      particles.rotation.y += delta * 0.8
      particles.rotation.x = Math.sin(time * 0.5) * 0.3

      const positions = particles.geometry.attributes.position.array
      const basePositions = particles.userData.basePositions

      for (let i = 0; i < positions.length / 3; i++) {
        const pulse = Math.sin(time * 4 + i * 0.5) * 0.3
        positions[i * 3 + 1] = basePositions[i * 3 + 1] + pulse
      }
      particles.geometry.attributes.position.needsUpdate = true

      particles.material.opacity = 0.5 + Math.sin(time * 2) * 0.3
      particles.material.size = 0.08 + Math.sin(time * 3) * 0.03
    }
  })

  return <group ref={groupRef} />
}