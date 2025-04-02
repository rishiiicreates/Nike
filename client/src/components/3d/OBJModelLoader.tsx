import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';

interface OBJModelLoaderProps {
  objUrl: string;
  mtlUrl?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}

const OBJModelLoader: React.FC<OBJModelLoaderProps> = ({
  objUrl,
  mtlUrl,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#ffffff'
}) => {
  const group = useRef<THREE.Group>(null);
  const material = useRef<MeshStandardMaterial | null>(null);

  // Load the model using useGLTF
  const { scene } = useGLTF(objUrl);
  const model = scene.clone();

  // Apply color to all materials if a color is provided
  useEffect(() => {
    if (model && color) {
      model.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          // Create a new material with the desired color
          material.current = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 0.5,
            metalness: 0.1,
          });
          
          // Apply the material to the mesh
          child.material = material.current;
        }
      });
    }
  }, [model, color]);

  // Add gentle rotation animation
  useFrame(() => {
    if (group.current) {
      // Gentle auto-rotation
      group.current.rotation.y += 0.002;
    }
  });

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