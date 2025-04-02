import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import OBJModelLoader from './OBJModelLoader';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'wouter';

// Simple loading indicator with spinning cube
function Loader() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

interface FeaturedModelShowcaseProps {
  title: string;
  subtitle: string;
  modelPath: string;
  ctaLink: string;
  ctaText: string;
  bgColor?: string;
}

const FeaturedModelShowcase: React.FC<FeaturedModelShowcaseProps> = ({
  title,
  subtitle,
  modelPath,
  ctaLink,
  ctaText,
  bgColor = "bg-gray-900",
}) => {
  // Rotation animation speed for the model
  const [hovered, setHovered] = useState(false);
  
  // State for dynamic quality adjustment based on performance
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high');
  
  return (
    <section className={`w-full py-16 ${bgColor} text-white relative overflow-hidden`}>
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0 z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8">{subtitle}</p>
          <Link href={ctaLink}>
            <a className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all">
              {ctaText}
            </a>
          </Link>
        </div>
        
        <div className="lg:w-1/2 h-[500px] z-10 relative">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="bg-transparent"
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            
            <Suspense fallback={<Loader />}>
              <OBJModelLoader 
                objUrl={modelPath}
                position={[0, -0.5, 0]} 
                rotation={[0, Math.PI / 6, 0]} 
                scale={0.03} 
                color="#ffffff"
              />
              <OrbitControls 
                enableZoom={true}
                enablePan={false}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-white rounded-full -mr-32 -mb-32" />
        <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-white rounded-full" />
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs opacity-70">
        Created by rishiicreates
      </div>
    </section>
  );
};

export default FeaturedModelShowcase;