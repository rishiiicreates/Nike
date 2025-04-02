import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ShoeModel from './ShoeModel';

interface ProductSceneProps {
  color?: string;
  backgroundColor?: string;
}

const ProductScene: React.FC<ProductSceneProps> = ({ 
  color = '#ffffff',
  backgroundColor = '#f8f8f8'
}) => {
  return (
    <div className="w-full h-[500px] rounded-lg" style={{ backgroundColor }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        shadows
        gl={{ 
          outputEncoding: THREE.sRGBEncoding,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <ShoeModel 
            position={[0, -0.5, 0]} 
            rotation={[0, Math.PI / 4, 0]} 
            color={color} 
          />
          <Environment preset="city" />
          <ContactShadows
            opacity={0.5}
            scale={10}
            blur={1}
            far={10}
            resolution={256}
            color="#000000"
          />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default ProductScene;