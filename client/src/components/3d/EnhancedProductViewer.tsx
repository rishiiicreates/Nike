import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  useGLTF, 
  ContactShadows,
  PresentationControls,
  Float,
  Html,
  Stage
} from '@react-three/drei';
import * as THREE from 'three';
import OBJModelLoader from './OBJModelLoader';
import { MODEL_PATHS, MODEL_POSITIONS, MODEL_ROTATIONS, MODEL_SCALES, getModelInfo } from '../../lib/3dAssets';

// Advanced 3D loading indicator with Nike-inspired swoosh animation
function Loader() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.5;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <group ref={ref}>
      {/* Nike Swoosh inspired shape */}
      <mesh>
        <torusGeometry args={[0.7, 0.15, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial color="#f7f7f7" emissive="#ffffff" emissiveIntensity={0.2} />
      </mesh>
      <pointLight position={[0, 0, 2]} intensity={1.5} color="#ffffff" />
    </group>
  );
}

// 3D scene effects component
function SceneEffects() {
  return (
    <>
      <fog attach="fog" args={['#202020', 8, 20]} />
      <Environment preset="city" />
      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.5}
        scale={10}
        blur={1.5}
        far={5}
      />
    </>
  );
}

// Camera controller that makes smooth movements
function CameraController({ 
  zoomLevel 
}: { 
  zoomLevel: number 
}) {
  const { camera } = useThree();
  
  useEffect(() => {
    // Smoothly animate camera to the new position
    const targetZ = 5 - zoomLevel * 2; // Map 0-1 zoom level to 5-3 camera position
    let animationFrame: number;
    
    const animateCamera = () => {
      const diff = targetZ - camera.position.z;
      if (Math.abs(diff) > 0.01) {
        camera.position.z += diff * 0.05;
        animationFrame = requestAnimationFrame(animateCamera);
      }
    };
    
    animationFrame = requestAnimationFrame(animateCamera);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [camera, zoomLevel]);
  
  return null;
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
  const [zoomLevel, setZoomLevel] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [viewMode, setViewMode] = useState<'normal' | 'exploded' | 'x-ray'>('normal');
  
  // Get appropriate model information based on product name
  const { path: modelPath, scale, position, rotation } = getModelInfo(productName);
  
  return (
    <div className={`relative w-full h-[600px] rounded-lg overflow-hidden ${className}`}>
      {/* Main 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="bg-gradient-to-b from-gray-900 to-black"
        shadows
        dpr={[1, 2]} // Better rendering on high-DPI screens
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        
        <Suspense fallback={<Loader />}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            config={{ mass: 2, tension: 200 }}
            snap={{ mass: 4, tension: 100 }}
            speed={1.5}
            zoom={1}
            enabled={true}
          >
            <Float 
              speed={3} 
              rotationIntensity={isRotating ? 0.2 : 0} 
              floatIntensity={0.2}
            >
              <OBJModelLoader 
                objUrl={modelPath}
                position={position} 
                rotation={rotation} 
                scale={scale * 1.2} // Slightly larger for better view
                color={currentColor}
              />
            </Float>
          </PresentationControls>
          
          <SceneEffects />
        </Suspense>
        
        <CameraController zoomLevel={zoomLevel} />
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={isRotating}
          autoRotateSpeed={2}
        />
      </Canvas>
      
      {/* Controls UI */}
      <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 p-4 rounded-lg backdrop-blur-sm transition-all">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-white font-bold text-xl">{productName}</p>
            <p className="text-white text-lg">{price}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setIsRotating(!isRotating)}
              className={`p-2 rounded ${isRotating ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
              aria-label={isRotating ? "Stop rotation" : "Start rotation"}
            >
              {isRotating ? "Stop Rotation" : "Auto Rotate"}
            </button>
            <button 
              onClick={() => setViewMode(viewMode === 'normal' ? 'exploded' : 'normal')}
              className="p-2 rounded bg-gray-800 text-white"
            >
              {viewMode === 'normal' ? "Exploded View" : "Normal View"}
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-white text-sm mb-1">Zoom</p>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={zoomLevel} 
            onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <p className="text-white text-sm mb-1">Colors</p>
          <div className="flex mt-2 space-x-3">
            {colors.map((color, index) => (
              <button
                key={index}
                onClick={() => setCurrentColor(color)}
                className={`w-8 h-8 rounded-full transition-transform shadow-md ${
                  currentColor === color ? 'transform scale-125 ring-2 ring-white' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-xs text-white mt-4 flex justify-between">
          <span>Interactive 3D Model - Drag to rotate, pinch/scroll to zoom</span>
          <span>Created by rishiicreates</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductViewer;