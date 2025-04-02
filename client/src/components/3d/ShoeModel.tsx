import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ShoeModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}

const ShoeModel: React.FC<ShoeModelProps> = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 3,
  color = '#ffffff'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovering, setHovering] = useState(false);
  const [initialRotation] = useState(rotation);
  
  // Rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      // Create a gentle floating animation when not hovering
      if (!hovering) {
        groupRef.current.rotation.y = initialRotation[1] + state.clock.getElapsedTime() * 0.3;
        // Add a slight bobbing motion
        groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime()) * 0.05;
      }
    }
  });

  // Creating a more complex shoe shape using multiple geometries
  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)} scale={scale}>
      {/* Main shoe body */}
      <mesh 
        position={[0, 0.05, 0]}
        onPointerOver={() => setHovering(true)}
        onPointerOut={() => setHovering(false)}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
        <boxGeometry args={[1, 0.3, 2.2]} />
      </mesh>
      
      {/* Shoe sole */}
      <mesh 
        position={[0, -0.1, 0]} 
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.1} />
        <boxGeometry args={[1.05, 0.1, 2.3]} />
      </mesh>
      
      {/* Shoe tongue */}
      <mesh 
        position={[0, 0.25, 0.2]} 
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
        <boxGeometry args={[0.7, 0.1, 1.2]} />
      </mesh>
      
      {/* Nike swoosh */}
      <group position={[0.45, 0.15, 0]} rotation={[0, 0, Math.PI / 8]}>
        <mesh castShadow>
          <meshStandardMaterial color="#000000" roughness={0.5} metalness={0.8} />
          <boxGeometry args={[0.1, 0.05, 1.2]} />
        </mesh>
        <mesh position={[-0.2, -0.15, 0.5]} rotation={[0, 0, Math.PI / 2.5]}>
          <meshStandardMaterial color="#000000" roughness={0.5} metalness={0.8} />
          <boxGeometry args={[0.1, 0.05, 0.7]} />
        </mesh>
      </group>
      
      {/* Laces */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.22, -0.6 + i * 0.3]}
          castShadow
        >
          <meshStandardMaterial color="#f5f5f5" roughness={0.9} metalness={0.1} />
          <boxGeometry args={[0.5, 0.05, 0.05]} />
        </mesh>
      ))}
    </group>
  );
};

export default ShoeModel;