import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Scene3D() {
  const sceneRef = useRef()
  const geometriesRef = useRef([])
  const materialsRef = useRef([])
  const initialPositionsRef = useRef([])

  useEffect(() => {
    // Create geometric shapes that float around
    const shapes = [
      { geometry: new THREE.OctahedronGeometry(1.5, 0), color: 0x00ff88, count: 5 },
      { geometry: new THREE.TetrahedronGeometry(1.2, 0), color: 0xff006e, count: 4 },
      { geometry: new THREE.IcosahedronGeometry(1, 0), color: 0x7209b7, count: 6 },
      { geometry: new THREE.BoxGeometry(1, 1, 1), color: 0x00ff88, count: 3 },
    ]

    const group = new THREE.Group()
    sceneRef.current = group

    shapes.forEach(({ geometry, color, count }) => {
      const material = new THREE.MeshPhysicalMaterial({
        color,
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
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })

      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geometry, material)
        const wireMesh = new THREE.Mesh(geometry, wireMaterial)
        wireMesh.scale.setScalar(1.02)

        const container = new THREE.Group()
        container.add(mesh)
        container.add(wireMesh)

        // Random initial position
        const radius = 25 + Math.random() * 20
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)

        container.position.set(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi) * 0.5,
          radius * Math.sin(phi) * Math.sin(theta)
        )

        container.userData = {
          radius,
          theta,
          phi,
          speed: 0.02 + Math.random() * 0.03,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01,
          },
          floatOffset: Math.random() * Math.PI * 2,
          floatSpeed: 0.05 + Math.random() * 0.05,
          floatAmplitude: 1 + Math.random() * 2,
        }

        initialPositionsRef.current.push(container.position.clone())
        geometriesRef.current.push(container)
        materialsRef.current.push({ mesh, wireMesh })
        group.add(container)
      }
    })
  }, [])

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    geometriesRef.current.forEach((container, index) => {
      const data = container.userData

      // Orbital motion
      data.theta += delta * data.speed
      data.phi += delta * data.speed * 0.3

      const targetX = data.radius * Math.sin(data.phi) * Math.cos(data.theta)
      const targetY = data.radius * Math.cos(data.phi) * 0.5 + Math.sin(time * data.floatSpeed + data.floatOffset) * data.floatAmplitude
      const targetZ = data.radius * Math.sin(data.phi) * Math.sin(data.theta)

      container.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.02)

      // Rotation
      container.rotation.x += data.rotationSpeed.x
      container.rotation.y += data.rotationSpeed.y
      container.rotation.z += data.rotationSpeed.z

      // Wireframe pulse
      if (materialsRef.current[index]?.wireMesh) {
        const scale = 1.02 + Math.sin(time * 2 + index) * 0.01
        materialsRef.current[index].wireMesh.scale.setScalar(scale)
        materialsRef.current[index].wireMesh.material.opacity = 0.3 + Math.sin(time * 3 + index) * 0.1
      }
    })
  })

  return <group ref={sceneRef} />
}