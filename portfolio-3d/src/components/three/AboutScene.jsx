import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AboutScene() {
  const groupRef = useRef()
  const shapesRef = useRef([])
  const wireframesRef = useRef([])

  useEffect(() => {
    const group = new THREE.Group()
    groupRef.current = group

    // Create a "skill tree" visualization - connected nodes
    const nodeCount = 8
    const nodes = []
    const connections = []

    // Generate nodes in a circular pattern with some randomness
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 4 + Math.random() * 2
      const height = (Math.random() - 0.5) * 4

      nodes.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ),
        angle,
        radius,
        baseHeight: height,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    // Create connections between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position)
        if (dist < 6) {
          connections.push({ from: i, to: j, dist })
        }
      }
    }

    // Create node meshes
    nodes.forEach((node, i) => {
      const geometry = new THREE.IcosahedronGeometry(0.4, 1)
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL((i / nodeCount) * 0.3 + 0.3, 1, 0.5),
        transparent: true,
        opacity: 0.8,
        transmission: 0.9,
        thickness: 0.3,
        roughness: 0,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.5,
      })

      const wireMaterial = new THREE.MeshBasicMaterial({
        color: material.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })

      const mesh = new THREE.Mesh(geometry, material)
      const wireMesh = new THREE.Mesh(geometry, wireMaterial)
      wireMesh.scale.setScalar(1.05)

      const container = new THREE.Group()
      container.add(mesh)
      container.add(wireMesh)
      container.position.copy(node.position)
      container.userData = { ...node, index: i }

      shapesRef.current.push(container)
      wireframesRef.current.push({ mesh, wireMesh, node })
      group.add(container)
    })

    // Create connection lines
    connections.forEach((conn, i) => {
      const points = [
        nodes[conn.from].position.clone(),
        nodes[conn.to].position.clone(),
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(0.3 + (i % 3) * 0.1, 1, 0.5),
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const line = new THREE.Line(geometry, material)
      line.userData = { connection: conn, index: i }
      group.add(line)
    })

    // Add floating particles around
    const particleCount = 50
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const r = 6 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      particlePositions[i * 3 + 1] = r * Math.cos(phi)
      particlePositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      const hue = 0.3 + Math.random() * 0.3
      const color = new THREE.Color().setHSL(hue, 1, 0.6)
      particleColors[i * 3] = color.r
      particleColors[i * 3 + 1] = color.g
      particleColors[i * 3 + 2] = color.b

      particleSizes[i] = 0.05 + Math.random() * 0.1
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1))

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    particles.userData = { particleData: [] }
    for (let i = 0; i < particleCount; i++) {
      particles.userData.particleData.push({
        radius: 6 + Math.random() * 4,
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        speed: 0.05 + Math.random() * 0.1,
        verticalSpeed: 0.02 + Math.random() * 0.05,
        verticalOffset: Math.random() * Math.PI * 2,
      })
    }
    group.add(particles)
    group.userData.particles = particles
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const group = groupRef.current

    // Animate nodes
    shapesRef.current.forEach((container, i) => {
      const data = container.userData
      const pulse = Math.sin(time * 2 + data.pulsePhase) * 0.15 + 1
      container.scale.setScalar(pulse)

      // Orbit slowly
      data.angle += delta * 0.05
      const targetX = Math.cos(data.angle) * data.radius
      const targetZ = Math.sin(data.angle) * data.radius
      const targetY = data.baseHeight + Math.sin(time * 0.5 + data.pulsePhase) * 0.5

      container.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.02)

      // Rotate
      container.rotation.x += delta * 0.2
      container.rotation.y += delta * 0.3

      // Wireframe pulse
      const wireData = wireframesRef.current[i]
      if (wireData) {
        wireData.wireMesh.scale.setScalar(1.05 + Math.sin(time * 3 + i) * 0.03)
        wireData.wireMesh.material.opacity = 0.3 + Math.sin(time * 4 + i) * 0.2
      }
    })

    // Animate connection lines - pulse opacity
    group.children.forEach((child) => {
      if (child.isLine && child.userData.connection) {
        const conn = child.userData.connection
        const pulse = Math.sin(time * 3 + conn.index) * 0.5 + 0.5
        child.material.opacity = 0.1 + pulse * 0.3
      }
    })

    // Animate particles
    if (group.userData.particles) {
      const particles = group.userData.particles
      const positions = particles.geometry.attributes.position.array
      const particleData = particles.userData.particleData

      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i]
        p.theta += delta * p.speed
        p.phi += delta * p.speed * 0.3

        const verticalOffset = Math.sin(time * p.verticalSpeed + p.verticalOffset) * 1.5

        positions[i * 3] = p.radius * Math.sin(p.phi) * Math.cos(p.theta)
        positions[i * 3 + 1] = p.radius * Math.cos(p.phi) + verticalOffset
        positions[i * 3 + 2] = p.radius * Math.sin(p.phi) * Math.sin(p.theta)
      }
      particles.geometry.attributes.position.needsUpdate = true
      particles.rotation.y += delta * 0.01
    }

    // Slow group rotation
    group.rotation.y += delta * 0.01
  })

  return <group ref={groupRef} />
}