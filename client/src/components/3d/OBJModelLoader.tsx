import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import ShoeModel from './ShoeModel';

interface OBJModelLoaderProps {
  objUrl: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}

const OBJModelLoader: React.FC<OBJModelLoaderProps> = ({
  objUrl,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#ffffff'
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Animate the model container if needed
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle container movement, most animation is in the ShoeModel
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 0.3) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    >
      <Center>
        <ShoeModel 
          color={color} 
          position={[0, 0, 0]} 
          rotation={[0, rotation[1], 0]}
          scale={1} 
        />
      </Center>
    </group>
  );
};

export default OBJModelLoader;