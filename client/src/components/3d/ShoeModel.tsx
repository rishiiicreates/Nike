import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ShoeModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}

/**
 * Advanced 3D Shoe Model
 * Uses procedural geometry to create a realistic and customizable shoe
 */
const ShoeModel: React.FC<ShoeModelProps> = ({
  position = [0, 0, 0],
  rotation = [0, Math.PI / 4, 0],
  scale = 1,
  color = '#ff0000'
}) => {
  const shoeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [rotating, setRotating] = useState(false);
  
  // Create a material color based on props
  const mainColor = new THREE.Color(color);
  const accentColor = new THREE.Color(color).offsetHSL(0, -0.2, 0.2);
  const soleColor = new THREE.Color('#f5f5f5');
  
  // Animation effect when hovered
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  // Rotation animation
  useFrame((state) => {
    if (shoeRef.current) {
      // Base animation with gentle bob
      shoeRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Automatic rotation or interactive response
      if (rotating) {
        shoeRef.current.rotation.y += 0.01;
      } else if (hovered) {
        // Smooth rotation to target based on mouse position
        const targetRotation = rotation[1] + (state.mouse.x * 0.5);
        shoeRef.current.rotation.y += (targetRotation - shoeRef.current.rotation.y) * 0.05;
      } else {
        // Return to default rotation when not hovered
        shoeRef.current.rotation.y += (rotation[1] - shoeRef.current.rotation.y) * 0.05;
      }
    }
  });
  
  return (
    <group
      ref={shoeRef}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setRotating(!rotating)}
    >
      {/* Shoe sole */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.3, 1.2]} />
        <meshPhysicalMaterial 
          color={soleColor} 
          roughness={0.8}
          metalness={0}
        />
      </mesh>
      
      {/* Shoe body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[3, 0.8, 1.2]} />
        <meshPhysicalMaterial 
          color={mainColor} 
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>
      
      {/* Shoe toe */}
      <mesh position={[1.3, 0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 1.2]} />
        <meshPhysicalMaterial 
          color={mainColor} 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      
      {/* Shoe heel */}
      <mesh position={[-1.3, 0.5, 0]} castShadow>
        <boxGeometry args={[0.5, 1, 1.2]} />
        <meshPhysicalMaterial 
          color={mainColor} 
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>
      
      {/* Shoe collar/opening */}
      <mesh position={[-0.8, 0.8, 0]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[1, 0.4, 1.2]} />
        <meshPhysicalMaterial 
          color={accentColor} 
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Shoelaces */}
      <mesh position={[0.2, 0.83, 0]} castShadow>
        <boxGeometry args={[1.8, 0.1, 0.8]} />
        <meshPhysicalMaterial 
          color={'#ffffff'} 
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Nike swoosh logo */}
      <group position={[0.2, 0.4, 0.61]} rotation={[0, 0, Math.PI / 6]} scale={[1, 1, 1]}>
        <mesh castShadow>
          <torusGeometry args={[0.4, 0.08, 16, 32, Math.PI * 1.4]} />
          <meshStandardMaterial color={'#ffffff'} />
        </mesh>
      </group>
      
      {/* Add a reflection and shadow */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.6}
        scale={10}
        blur={2}
        far={4}
        resolution={256}
        color="#000000"
      />
      
      {/* Ambient environment for reflections */}
      <Environment preset="city" />
    </group>
  );
};

export default ShoeModel;