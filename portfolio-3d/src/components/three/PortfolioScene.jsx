import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function PortfolioScene({ activeCategory = 'all' }) {
  const groupRef = useRef()
  const cubesRef = useRef([])
  const wiresRef = useRef([])

  // Category colors
  const categoryColors = {
    all: 0x00ff88,
    saas: 0x00d4ff,
    'best-work': 0xffaa00,
    roadcoderr: 0xff3366,
    signature: 0x7209b7,
    gig: 0xff006e,
    ai: 0x00ff88,
    podcast: 0xff6600,
    'talking-head': 0x00ffcc,
    shorts: 0xff33aa,
  }

  const targetColor = useMemo(() => new THREE.Color(categoryColors[activeCategory] || 0x00ff88), [activeCategory])
  const currentColor = useRef(new THREE.Color(0x00ff88))

  useEffect(() => {
    const group = new THREE.Group()
    groupRef.current = group

    // Create a grid of floating cubes representing projects
    const gridSize = 6
    const spacing = 4

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Skip some randomly for organic look
        if (Math.random() < 0.15) continue

        const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2, 2, 2, 2)

        const material = new THREE.MeshPhysicalMaterial({
          color: currentColor.current,
          transparent: true,
          opacity: 0.15,
          transmission: 0.9,
          thickness: 0.5,
          roughness: 0,
          metalness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          ior: 1.5,
        })

        const wireMaterial = new THREE.MeshBasicMaterial({
          color: currentColor.current,
          wireframe: true,
          transparent: true,
          opacity: 0.4,
        })

        const mesh = new THREE.Mesh(geometry, material)
        const wireMesh = new THREE.Mesh(geometry, wireMaterial)
        wireMesh.scale.setScalar(1.02)

        const container = new THREE.Group()
        container.add(mesh)
        container.add(wireMesh)

        const posX = (x - gridSize / 2 + 0.5) * spacing
        const posZ = (z - gridSize / 2 + 0.5) * spacing
        const posY = (Math.random() - 0.5) * 8

        container.position.set(posX, posY, posZ)
        container.userData = {
          basePosition: new THREE.Vector3(posX, posY, posZ),
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.3 + Math.random() * 0.5,
          floatAmplitude: 0.5 + Math.random() * 1.5,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
          },
          colorPhase: Math.random() * Math.PI * 2,
        }

        cubesRef.current.push({ container, mesh, wireMesh })
        group.add(container)
      }
    }

    // Add connecting lines between nearby cubes
    for (let i = 0; i < cubesRef.current.length; i++) {
      for (let j = i + 1; j < cubesRef.current.length; j++) {
        const dist = cubesRef.current[i].container.position.distanceTo(cubesRef.current[j].container.position)
        if (dist < 6) {
          const points = [
            cubesRef.current[i].container.position.clone(),
            cubesRef.current[j].container.position.clone(),
          ]
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          const material = new THREE.LineBasicMaterial({
            color: currentColor.current,
            transparent: true,
            opacity: 0.08,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
          const line = new THREE.Line(geometry, material)
          line.userData = { from: i, to: j }
          group.add(line)
        }
      }
    }

    group.userData.lines = group.children.filter(c => c.isLine)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const group = groupRef.current

    // Smooth color transition
    currentColor.current.lerp(targetColor, 0.02)

    // Animate cubes
    cubesRef.current.forEach(({ container, mesh, wireMesh }, i) => {
      const data = container.userData

      // Floating
      container.position.y = data.basePosition.y + Math.sin(time * data.floatSpeed + data.floatOffset) * data.floatAmplitude

      // Subtle horizontal drift
      container.position.x = data.basePosition.x + Math.sin(time * 0.2 + data.floatOffset) * 0.3
      container.position.z = data.basePosition.z + Math.cos(time * 0.2 + data.floatOffset) * 0.3

      // Rotation
      container.rotation.x += data.rotationSpeed.x
      container.rotation.y += data.rotationSpeed.y
      container.rotation.z += data.rotationSpeed.z

      // Color pulse
      const colorPulse = Math.sin(time * 2 + data.colorPhase) * 0.1 + 0.9
      mesh.material.color.lerp(currentColor.current, 0.05)
      mesh.material.opacity = 0.1 * colorPulse
      wireMesh.material.color.lerp(currentColor.current, 0.05)
      wireMesh.material.opacity = 0.3 + Math.sin(time * 3 + i) * 0.15
      wireMesh.scale.setScalar(1.02 + Math.sin(time * 2.5 + i) * 0.015)
    })

    // Animate connection lines
    if (group.userData.lines) {
      group.userData.lines.forEach((line, i) => {
        const data = line.userData
        const fromCube = cubesRef.current[data.from]
        const toCube = cubesRef.current[data.to]

        if (fromCube && toCube) {
          const positions = line.geometry.attributes.position.array
          positions[0] = fromCube.container.position.x
          positions[1] = fromCube.container.position.y
          positions[2] = fromCube.container.position.z
          positions[3] = toCube.container.position.x
          positions[4] = toCube.container.position.y
          positions[5] = toCube.container.position.z
          line.geometry.attributes.position.needsUpdate = true

          line.material.color.lerp(currentColor.current, 0.05)
          line.material.opacity = 0.05 + Math.sin(time * 2 + i * 0.5) * 0.05
        }
      })
    }

    // Slow group rotation
    group.rotation.y += delta * 0.005
  })

  return <group ref={groupRef} />
}