import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATHS } from '../../lib/3dAssets';

// Simple loading indicator with a spinning cube
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

// Simple shoe box component
function ShoeBox({ color }: { color: string }) {
  const boxRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <group ref={boxRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
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

  return (
    <div className={`w-full h-[500px] rounded-lg overflow-hidden ${className}`}
         onMouseEnter={() => console.log('Mouse enter')}
         onMouseLeave={() => console.log('Mouse leave')}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        <Suspense fallback={<Loader />}>
          <ShoeBox color={currentColor} />
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