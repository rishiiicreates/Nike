import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial, MeshPhysicalMaterial } from 'three';

interface OBJModelLoaderProps {
  objUrl: string;
  mtlUrl?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  quality?: 'low' | 'medium' | 'high'; // New prop for quality control
}

const OBJModelLoader: React.FC<OBJModelLoaderProps> = ({
  objUrl,
  mtlUrl,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#ffffff',
  quality = 'high'
}) => {
  const group = useRef<THREE.Group>(null);
  const material = useRef<MeshStandardMaterial | null>(null);

  // Load the model using useGLTF
  const { scene } = useGLTF(objUrl);
  const model = scene.clone();

  // Apply enhanced materials if a color is provided, with quality control
  useEffect(() => {
    if (model && color) {
      model.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          // Create material based on quality setting
          if (quality === 'high') {
            // High quality physical material for realistic rendering
            material.current = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(color),
              roughness: 0.3,
              metalness: 0.7,
              clearcoat: 0.8,
              clearcoatRoughness: 0.2,
              reflectivity: 1.0,
              envMapIntensity: 1.5,
            });
          } else if (quality === 'medium') {
            // Medium quality standard material
            material.current = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              roughness: 0.4,
              metalness: 0.5,
              envMapIntensity: 1.0,
            });
          } else {
            // Low quality basic material for performance
            material.current = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              roughness: 0.5,
              metalness: 0.2,
            });
          }
          
          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Apply the material to the mesh
          child.material = material.current;
        }
      });
    }
  }, [model, color, quality]);

  // Add gentle rotation animation
  useFrame(() => {
    if (group.current) {
      // Gentle auto-rotation
      group.current.rotation.y += 0.002;
    }
  });

  // Simplified return to fix rendering issues
  return (
    <group 
      ref={group} 
      position={new THREE.Vector3(...position)} 
      rotation={new THREE.Euler(...rotation)} 
      scale={new THREE.Vector3(scale, scale, scale)}
    >
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
};

export default OBJModelLoader;