import React, { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Environment, 
  PresentationControls, 
  ContactShadows,
  Html,
  useProgress,
  Stage
} from '@react-three/drei';
import OBJModelLoader from './OBJModelLoader';
// Define Product interface locally to avoid import issues
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  colors: string[];
  sizes: string[];
  images: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  rating?: number;
  stock?: number;
}
import { formatPrice } from '../../lib/data';
import { Link } from 'wouter';
import { MODEL_PATHS, MODEL_SCALES, MODEL_POSITIONS, MODEL_ROTATIONS } from '../../lib/3dAssets';

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

interface ProductCarousel3DProps {
  products: Product[];
  title?: string;
  className?: string;
}

// Using imported 3D assets

const ProductCarousel3D: React.FC<ProductCarousel3DProps> = ({
  products,
  title = "Featured Products",
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentProduct = products[currentIndex];
  
  // Get appropriate model based on product name
  const getModelPath = (productName: string) => {
    const modelKey = Object.keys(MODEL_PATHS).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    
    return modelKey ? MODEL_PATHS[modelKey as keyof typeof MODEL_PATHS] : MODEL_PATHS["Default"];
  };

  const getModelScale = (productName: string) => {
    const modelKey = Object.keys(MODEL_SCALES).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    
    return modelKey ? MODEL_SCALES[modelKey as keyof typeof MODEL_SCALES] : MODEL_SCALES["Default"];
  };

  const getModelPosition = (productName: string) => {
    const modelKey = Object.keys(MODEL_POSITIONS).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    
    return modelKey ? MODEL_POSITIONS[modelKey as keyof typeof MODEL_POSITIONS] : MODEL_POSITIONS["Default"];
  };

  const getModelRotation = (productName: string) => {
    const modelKey = Object.keys(MODEL_ROTATIONS).find(key => 
      productName.toLowerCase().includes(key.toLowerCase())
    );
    
    return modelKey ? MODEL_ROTATIONS[modelKey as keyof typeof MODEL_ROTATIONS] : MODEL_ROTATIONS["Default"];
  };

  const productName = currentProduct?.name || "";
  const modelPath = getModelPath(productName);
  const modelScale = getModelScale(productName);
  const modelPosition = getModelPosition(productName);
  const modelRotation = getModelRotation(productName);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className={`w-full py-12 ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        
        <div className="relative" ref={carouselRef}>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {/* 3D Model Container */}
            <div className="h-[500px] bg-gray-100 rounded-xl overflow-hidden">
              <Canvas 
                shadows 
                camera={{ position: [0, 0, 5], fov: 45 }}
              >
                <color attach="background" args={['#f0f0f0']} />
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 10, 15]} angle={0.15} penumbra={1} intensity={1} castShadow />
                
                <Suspense fallback={<Loader />}>
                  <Stage environment="city" intensity={0.5}>
                    <PresentationControls
                      global
                      config={{ mass: 2, tension: 500 }}
                      snap
                      rotation={[0, 0, 0]}
                      polar={[-Math.PI / 4, Math.PI / 4]}
                      azimuth={[-Math.PI / 4, Math.PI / 4]}
                    >
                      <OBJModelLoader 
                        objUrl={modelPath}
                        position={modelPosition} 
                        rotation={modelRotation} 
                        scale={modelScale} 
                        color={currentProduct?.colors?.[0] || "#ffffff"}
                      />
                    </PresentationControls>
                  </Stage>
                  
                  <ContactShadows 
                    position={[0, -1.5, 0]} 
                    opacity={0.4} 
                    scale={5} 
                    blur={2} 
                  />
                  
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
              
              <div className="absolute bottom-4 right-4 text-xs text-gray-600">
                Interactive 3D - Drag to rotate
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col justify-center p-6">
              <h3 className="text-2xl font-bold mb-2">{currentProduct?.name}</h3>
              <p className="text-xl font-medium mb-4">{formatPrice(currentProduct?.price || 0)}</p>
              <p className="mb-6">{currentProduct?.description || "Experience the next generation of comfort and style with this iconic Nike design."}</p>
              
              {currentProduct?.colors && (
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Available Colors:</p>
                  <div className="flex space-x-2">
                    {currentProduct.colors.map((color: string, idx: number) => (
                      <div 
                        key={idx} 
                        className="w-6 h-6 rounded-full border border-gray-300" 
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4">
                <Link href={`/product/${currentProduct?.id}`}>
                  <a className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition">
                    View Details
                  </a>
                </Link>
                <button className="border border-black py-3 px-8 rounded-full hover:bg-gray-100 transition">
                  Add to Cart
                </button>
              </div>
              
              <div className="mt-8 text-xs text-gray-500">
                Created by rishiicreates
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-5 bg-white shadow-lg rounded-full p-3 z-10"
            onClick={handlePrev}
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-5 bg-white shadow-lg rounded-full p-3 z-10"
            onClick={handleNext}
            disabled={isTransitioning}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center mt-8">
            {products.map((_, idx) => (
              <button
                key={idx}
                className={`mx-1 w-3 h-3 rounded-full ${
                  idx === currentIndex ? 'bg-black' : 'bg-gray-300'
                }`}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentIndex(idx);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel3D;