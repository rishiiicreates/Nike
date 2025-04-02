import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  Float, 
  PresentationControls, 
  ContactShadows, 
  Html,
  useProgress
} from '@react-three/drei';
import OBJModelLoader from './OBJModelLoader';
import { Link } from 'wouter';

// Loading indicator
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white bg-black bg-opacity-75 p-4 rounded-md">
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
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
        
        <div className="lg:w-1/2 h-[500px] z-10">
          <Canvas 
            shadows 
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="bg-transparent"
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[5, 10, 15]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
            <directionalLight position={[-5, 5, -5]} intensity={0.5} />
            
            <Suspense fallback={<Loader />}>
              <PresentationControls
                global
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 300 }}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Float
                  speed={hovered ? 3 : 1}
                  rotationIntensity={hovered ? 0.4 : 0.2}
                  floatIntensity={hovered ? 0.4 : 0.2}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                >
                  <OBJModelLoader 
                    objUrl={modelPath}
                    position={[0, -0.5, 0]} 
                    rotation={[0, Math.PI / 6, 0]} 
                    scale={0.03} 
                    color="#ffffff"
                  />
                </Float>
              </PresentationControls>
              
              <ContactShadows 
                position={[0, -1.5, 0]} 
                opacity={0.5} 
                scale={10} 
                blur={2} 
              />
              
              <Environment preset="sunset" />
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