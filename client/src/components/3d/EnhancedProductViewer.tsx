import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import OBJModelLoader from './OBJModelLoader';
import { MODEL_PATHS } from '../../lib/3dAssets';

// Simple loading indicator
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
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
  const [hovered, setHovered] = useState(false);
  
  // Determine which 3D model to use based on product name
  const getModelPath = () => {
    const modelKey = Object.keys(MODEL_PATHS).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    
    return modelKey ? MODEL_PATHS[modelKey as keyof typeof MODEL_PATHS] : MODEL_PATHS["Default"];
  };

  const modelPath = getModelPath();
  
  useEffect(() => {
    // Log model path for debugging
    console.log('Using model:', modelPath);
  }, [modelPath]);

  return (
    <div className={`w-full h-[500px] rounded-lg overflow-hidden ${className}`}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        
        <Suspense fallback={<Loader />}>
          <OBJModelLoader 
            objUrl={modelPath}
            position={[0, -1, 0]} 
            rotation={[0, Math.PI / 4, 0]} 
            scale={0.02} 
            color={currentColor}
          />
        </Suspense>
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
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