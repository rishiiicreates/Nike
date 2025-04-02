import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PresentationControls, 
  ContactShadows,
  Float,
  Text,
  useProgress
} from '@react-three/drei';
import { motion } from 'framer-motion';
import ShoeModel from './ShoeModel';
import { Link } from 'wouter';
import { getModelInfo } from '../../lib/3dAssets';

// Loading indicator for 3D content
function Loader() {
  const { progress } = useProgress();
  
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="w-24 h-24 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium">{Math.round(progress)}% loaded</p>
    </div>
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
  bgColor = "#f5f5f5"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  
  // Extract model name from the path to use with getModelInfo
  const modelName = modelPath.split('/').pop()?.split('.')[0] || "Default";
  const { scale, position, rotation } = getModelInfo(modelName);
  
  // Color options for different parts of the shoe
  const mainColor = "#ff0000"; // Nike red
  
  return (
    <div className="w-full py-16" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button 
                className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsExploded(!isExploded)}
              >
                {isExploded ? "View Standard" : "Exploded View"}
              </button>
              
              <Link href={ctaLink}>
                <a className="ml-4 inline-block border-2 border-black px-8 py-3.5 rounded-full font-medium text-lg hover:bg-black hover:text-white transition-colors">
                  {ctaText}
                </a>
              </Link>
            </motion.div>
          </div>
          
          {/* Right side - 3D Model */}
          <div 
            className="w-full md:w-1/2 h-[500px] rounded-xl overflow-hidden shadow-xl transition-transform duration-500"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ 
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              boxShadow: isHovered ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 10px 20px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 45 }}
              dpr={[1, 2]}
              shadows
            >
              <color attach="background" args={[bgColor]} />
              
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <Suspense fallback={null}>
                <PresentationControls
                  global
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                  config={{ mass: 2, tension: 500 }}
                  snap={{ mass: 4, tension: 250 }}
                >
                  <Float 
                    speed={2} 
                    rotationIntensity={0.4} 
                    floatIntensity={0.6}
                    position={[0, 0.5, 0]}
                  >
                    <ShoeModel 
                      position={[0, 0, 0]}
                      rotation={[0, Math.PI / 4, 0]}
                      scale={2}
                      color={mainColor}
                    />
                    
                    <ContactShadows
                      position={[0, -1.5, 0]}
                      opacity={0.4}
                      scale={10}
                      blur={2}
                      far={4}
                    />
                  </Float>
                </PresentationControls>
                
                <Environment preset="city" />
              </Suspense>
              
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
              />
            </Canvas>
            
            {/* Overlay text */}
            <div className="absolute bottom-6 left-6 right-6 bg-black bg-opacity-70 text-white p-4 rounded-lg backdrop-blur-sm">
              <p className="text-lg font-medium">Interact with the 3D model</p>
              <p className="text-sm opacity-70">Drag to rotate • Pinch to zoom</p>
            </div>
            
            {/* Attribution */}
            <div className="absolute top-4 right-4 bg-white bg-opacity-80 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              Created by rishiicreates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedModelShowcase;