import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function GridBackground({ gridSize = 100, divisions = 50, color = '#00ff88', opacity = 0.03 }) {
  const gridRef = useRef()
  const linesRef = useRef([])

  const grid = useMemo(() => {
    const group = new THREE.Group()
    const lineMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
    })

    const halfSize = gridSize / 2
    const step = gridSize / divisions

    // Horizontal lines (XZ plane)
    for (let i = 0; i <= divisions; i++) {
      const z = -halfSize + i * step
      const points = [
        new THREE.Vector3(-halfSize, 0, z),
        new THREE.Vector3(halfSize, 0, z),
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial.clone())
      line.userData = { axis: 'z', index: i, originalZ: z }
      linesRef.current.push(line)
      group.add(line)
    }

    // Vertical lines (XZ plane)
    for (let i = 0; i <= divisions; i++) {
      const x = -halfSize + i * step
      const points = [
        new THREE.Vector3(x, 0, -halfSize),
        new THREE.Vector3(x, 0, halfSize),
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial.clone())
      line.userData = { axis: 'x', index: i, originalX: x }
      linesRef.current.push(line)
      group.add(line)
    }

    return group
  }, [gridSize, divisions, color, opacity])

  useFrame((state, delta) => {
    if (!gridRef.current) return

    const time = state.clock.getElapsedTime()
    const camera = state.camera

    // Move grid with camera but slower for parallax effect
    gridRef.current.position.x = -camera.position.x * 0.1
    gridRef.current.position.z = -camera.position.z * 0.1

    // Animate lines - pulse opacity based on distance from center
    linesRef.current.forEach((line, index) => {
      const data = line.userData
      const pulse = Math.sin(time * 2 + index * 0.1) * 0.5 + 0.5
      line.material.opacity = opacity * (0.5 + pulse * 0.5)

      // Subtle vertical wave
      if (data.axis === 'z') {
        const positions = line.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] = Math.sin(time * 1.5 + data.originalZ * 0.1 + i * 0.1) * 0.2
        }
        line.geometry.attributes.position.needsUpdate = true
      } else if (data.axis === 'x') {
        const positions = line.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] = Math.sin(time * 1.5 + data.originalX * 0.1 + i * 0.1) * 0.2
        }
        line.geometry.attributes.position.needsUpdate = true
      }
    })

    // Slow rotation
    gridRef.current.rotation.y += delta * 0.002
  })

  return <group ref={gridRef}>{grid}</group>
}