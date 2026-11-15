import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingParticles({ count = 200, color = '#00ff88', size = 0.1, speed = 0.5, spread = 50 }) {
  const pointsRef = useRef()
  const particleDataRef = useRef([])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const alphas = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    const colorObj = new THREE.Color(color)

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const radius = spread * (0.3 + Math.random() * 0.7)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi)
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      // Store initial spherical coords for animation
      particleDataRef.current[i] = {
        radius,
        theta,
        phi,
        speed: speed * (0.3 + Math.random() * 0.7),
        verticalSpeed: 0.02 + Math.random() * 0.05,
        verticalOffset: Math.random() * Math.PI * 2,
        size: size * (0.5 + Math.random() * 1.5),
      }

      colors[i * 3] = colorObj.r
      colors[i * 3 + 1] = colorObj.g
      colors[i * 3 + 2] = colorObj.b

      sizes[i] = particleDataRef.current[i].size
      alphas[i] = 0.3 + Math.random() * 0.7
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    geo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    return geo
  }, [count, color, size, speed, spread])

  const material = useMemo(() =>
    new THREE.PointsMaterial({
      size: size,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
    [size]
  )

  useFrame((state, delta) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const data = particleDataRef.current[i]
      if (!data) continue

      data.theta += delta * data.speed
      data.phi += delta * data.speed * 0.2

      // Vertical floating
      const verticalOffset = Math.sin(time * data.verticalSpeed + data.verticalOffset) * (spread * 0.1)

      positions[i * 3] = data.radius * Math.sin(data.phi) * Math.cos(data.theta)
      positions[i * 3 + 1] = data.radius * Math.cos(data.phi) + verticalOffset
      positions[i * 3 + 2] = data.radius * Math.sin(data.phi) * Math.sin(data.theta)
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y += delta * 0.005
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}