import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

const DistortedShape = ({ shape = 'torus', color = '#4c1d95', distort = 0.4, speed = 2 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.2
    }
  })
  
  const getGeometry = () => {
    switch(shape) {
      case 'sphere':
        return <sphereGeometry args={[1.5, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5, 8, 8, 8]} />
      case 'torus':
      default:
        return <torusGeometry args={[2, 0.5, 32, 100]} />
    }
  }
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={2}
      floatIntensity={1}
    >
      <mesh ref={meshRef}>
        {getGeometry()}
        <MeshDistortMaterial
          color={color}
          emissive="#6d28d9"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={distort}
          speed={speed}
        />
      </mesh>
    </Float>
  )
}

const Scene = () => {
  return (
    <group>
      <DistortedShape 
        shape="torus" 
        color="#4c1d95" 
        distort={0.4} 
      />
      <DistortedShape 
        shape="sphere" 
        color="#1d4ed8" 
        distort={0.2} 
        speed={1.5}
      />
      <DistortedShape 
        shape="box" 
        color="#be123c" 
        distort={0.6} 
        speed={2.5}
      />
      {/* Remove Environment component to avoid CORS issues */}
    </group>
  );
};

export default Scene