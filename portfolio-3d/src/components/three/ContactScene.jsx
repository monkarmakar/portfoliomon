import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function ContactScene() {
  const groupRef = useRef()
  const envelopeRef = useRef()
  const particlesRef = useRef()

  useEffect(() => {
    const group = new THREE.Group()
    groupRef.current = group

    // Create a floating envelope-like shape
    const envelopeGroup = new THREE.Group()

    // Envelope body
    const bodyGeo = new THREE.BoxGeometry(3, 2, 0.3, 4, 4, 1)
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.15,
      transmission: 0.9,
      thickness: 0.3,
      roughness: 0,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5,
    })
    const bodyWireMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })

    const body = new THREE.Mesh(bodyGeo, bodyMat)
    const bodyWire = new THREE.Mesh(bodyGeo, bodyWireMat)
    bodyWire.scale.setScalar(1.01)
    envelopeGroup.add(body)
    envelopeGroup.add(bodyWire)

    // Envelope flap
    const flapGeo = new THREE.BoxGeometry(3.2, 1.5, 0.2, 4, 2, 1)
    const flapMat = new THREE.MeshPhysicalMaterial({
      color: 0xff006e,
      transparent: true,
      opacity: 0.2,
      transmission: 0.9,
      thickness: 0.2,
      roughness: 0,
      metalness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      ior: 1.5,
    })
    const flapWireMat = new THREE.MeshBasicMaterial({
      color: 0xff006e,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })

    const flap = new THREE.Mesh(flapGeo, flapMat)
    const flapWire = new THREE.Mesh(flapGeo, flapWireMat)
    flapWire.scale.setScalar(1.01)
    flap.position.set(0, 0.5, 0.25)
    flap.rotation.x = -Math.PI / 6
    flapWire.position.set(0, 0.5, 0.25)
    flapWire.rotation.x = -Math.PI / 6
    envelopeGroup.add(flap)
    envelopeGroup.add(flapWire)

    envelopeRef.current = { body, bodyWire, flap, flapWire, group: envelopeGroup }
    group.add(envelopeGroup)

    // Floating particles around
    const particleCount = 80
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const alphas = new Float32Array(particleCount)

    const particleData = []

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.cos(phi)
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)

      particleData.push({
        radius,
        theta,
        phi,
        speed: 0.05 + Math.random() * 0.1,
        verticalSpeed: 0.02 + Math.random() * 0.05,
        verticalOffset: Math.random() * Math.PI * 2,
        baseY: radius * Math.cos(phi),
      })

      const hue = Math.random() < 0.5 ? 0.33 : 0.95 // green or pink
      const color = new THREE.Color().setHSL(hue, 1, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = 0.05 + Math.random() * 0.1
      alphas[i] = 0.3 + Math.random() * 0.5
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    particles.userData = { particleData }
    particlesRef.current = particles
    group.add(particles)

    // Floating geometric shapes
    const shapeTypes = [
      new THREE.TetrahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.IcosahedronGeometry(0.3, 0),
    ]

    for (let i = 0; i < 12; i++) {
      const geo = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      const mat = new THREE.MeshPhysicalMaterial({
        color: Math.random() < 0.5 ? 0x00ff88 : 0xff006e,
        transparent: true,
        opacity: 0.2,
        transmission: 0.9,
        thickness: 0.2,
        roughness: 0,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.5,
      })
      const wireMat = new THREE.MeshBasicMaterial({
        color: mat.color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      })

      const mesh = new THREE.Mesh(geo, mat)
      const wire = new THREE.Mesh(geo, wireMat)
      wire.scale.setScalar(1.05)

      const container = new THREE.Group()
      container.add(mesh)
      container.add(wire)

      container.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      )

      container.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.2 + Math.random() * 0.3,
        floatAmplitude: 0.5 + Math.random() * 1,
        basePosition: container.position.clone(),
      }

      group.add(container)
    }

    group.userData.shapes = group.children.filter(c => c.isGroup && c !== envelopeGroup && c !== particles)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()
    const group = groupRef.current

    // Animate envelope
    if (envelopeRef.current) {
      const { body, bodyWire, flap, flapWire } = envelopeRef.current

      // Float
      envelopeRef.current.group.position.y = Math.sin(time * 0.8) * 0.5
      envelopeRef.current.group.rotation.y += delta * 0.05
      envelopeRef.current.group.rotation.x = Math.sin(time * 0.5) * 0.1

      // Flap animation
      const flapTarget = Math.sin(time * 0.7) * 0.3 - 0.3
      flap.rotation.x += (flapTarget - flap.rotation.x) * 0.05
      flapWire.rotation.x = flap.rotation.x

      // Material pulse
      body.material.opacity = 0.1 + Math.sin(time * 2) * 0.05
      bodyWire.material.opacity = 0.3 + Math.sin(time * 3) * 0.15
      flap.material.opacity = 0.15 + Math.sin(time * 2.5) * 0.05
      flapWire.material.opacity = 0.4 + Math.sin(time * 3.5) * 0.1

      bodyWire.scale.setScalar(1.01 + Math.sin(time * 2.5) * 0.01)
      flapWire.scale.setScalar(1.01 + Math.sin(time * 3) * 0.01)
    }

    // Animate particles
    if (particlesRef.current) {
      const particles = particlesRef.current
      const positions = particles.geometry.attributes.position.array
      const particleData = particles.userData.particleData

      for (let i = 0; i < particleData.length; i++) {
        const p = particleData[i]
        p.theta += delta * p.speed
        p.phi += delta * p.speed * 0.2

        const verticalOffset = Math.sin(time * p.verticalSpeed + p.verticalOffset) * 1.5

        positions[i * 3] = p.radius * Math.sin(p.phi) * Math.cos(p.theta)
        positions[i * 3 + 1] = p.radius * Math.cos(p.phi) + verticalOffset
        positions[i * 3 + 2] = p.radius * Math.sin(p.phi) * Math.sin(p.theta)
      }
      particles.geometry.attributes.position.needsUpdate = true
      particles.rotation.y += delta * 0.01
    }

    // Animate floating shapes
    if (group.userData.shapes) {
      group.userData.shapes.forEach((shape, i) => {
        const data = shape.userData
        shape.position.y = data.basePosition.y + Math.sin(time * data.floatSpeed + data.floatOffset) * data.floatAmplitude
        shape.position.x = data.basePosition.x + Math.sin(time * 0.15 + data.floatOffset) * 0.5
        shape.position.z = data.basePosition.z + Math.cos(time * 0.15 + data.floatOffset) * 0.5

        shape.rotation.x += data.rotationSpeed.x
        shape.rotation.y += data.rotationSpeed.y
        shape.rotation.z += data.rotationSpeed.z

        const wire = shape.children[1]
        if (wire) {
          wire.material.opacity = 0.4 + Math.sin(time * 3 + i) * 0.15
          wire.scale.setScalar(1.05 + Math.sin(time * 2.5 + i) * 0.02)
        }
      })
    }

    // Slow group rotation
    group.rotation.y += delta * 0.003
  })

  return <group ref={groupRef} />
}