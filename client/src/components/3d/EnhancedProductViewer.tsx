import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PresentationControls,
  ContactShadows,
  useProgress,
  Html
} from '@react-three/drei';
import OBJModelLoader from './OBJModelLoader';

// URL paths to our 3D models
const MODELS = {
  "Air Jordan 1": "/uploads_files_3671566_Nike+Air+Jordan+1+Retro+High+OG+Rebellionaire.obj",
  "Nike Air Max": "/uploads_files_5132423_project+14.obj",
  "Default": "/uploads_files_5132423_project+14.obj", // Default fallback
};

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

interface EnhancedProductViewerProps {
  productName: string;
  price: string;
  colors: string[];
  className?: string;
}

export const EnhancedProductViewer: React.FC<EnhancedProductViewerProps> = ({
  productName,
  price,
  colors = ['#000000'],
  className = '',
}) => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  
  // Determine which 3D model to use based on product name
  const getModelPath = () => {
    const modelKey = Object.keys(MODELS).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    
    return modelKey ? MODELS[modelKey as keyof typeof MODELS] : MODELS["Default"];
  };

  const modelPath = getModelPath();

  return (
    <div className={`w-full h-[500px] rounded-lg overflow-hidden ${className}`}>
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <fog attach="fog" args={['#000', 10, 20]} />
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={1024} 
          shadow-mapSize-height={1024} 
        />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={<Loader />}>
          <PresentationControls
            global
            zoom={0.8}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <OBJModelLoader 
              objUrl={modelPath}
              position={[0, -1, 0]} 
              rotation={[0, Math.PI / 4, 0]} 
              scale={0.02} 
              color={currentColor}
            />
          </PresentationControls>
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={5} 
            blur={2.4} 
          />
          
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 p-4 rounded-lg">
        <p className="text-white font-bold">{productName}</p>
        <p className="text-white">{price}</p>
        <div className="flex mt-2 space-x-2">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setCurrentColor(color)}
              className={`w-6 h-6 rounded-full transition-transform ${
                currentColor === color ? 'transform scale-125 ring-2 ring-white' : ''
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-xs text-white mt-2">
          Created by rishiicreates
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductViewer;