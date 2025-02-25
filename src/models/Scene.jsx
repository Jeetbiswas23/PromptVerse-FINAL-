import { Float } from '@react-three/drei'
import { MeshDistortMaterial } from '@react-three/drei'

// Change to default export
const Scene = ({ scale, position, rotation }) => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={2}
      floatIntensity={1}
    >
      <mesh 
        scale={scale} 
        position={position} 
        rotation={rotation}
      >
        <torusGeometry args={[2, 0.5, 32, 100]} />
        <MeshDistortMaterial
          color="#4c1d95"
          emissive="#6d28d9"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export default Scene;