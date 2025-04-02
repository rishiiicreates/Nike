import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PresentationControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OBJModelLoader from './OBJModelLoader';
import { getModelInfo } from '../../lib/3dAssets';
import { formatPrice } from '../../lib/data';
import { Link } from 'wouter';

// Product type definition
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

// Loading indicator with Nike-inspired swoosh
function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-16 h-16 relative">
        <svg
          className="animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.16667L3.5 8.5L11 1.5"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface ProductCarousel3DProps {
  products: Product[];
  title?: string;
  className?: string;
}

const ProductCarousel3D: React.FC<ProductCarousel3DProps> = ({
  products,
  title = "Featured Products",
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  
  // Get current product
  const currentProduct = products[currentIndex];
  
  // Navigate to next product
  const nextProduct = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % products.length);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Navigate to previous product
  const prevProduct = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };
  
  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // If the swipe distance is significant, navigate
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextProduct();
      } else {
        prevProduct();
      }
    }
  };
  
  // Get model information based on product name
  const { path: modelPath, scale, position, rotation } = getModelInfo(currentProduct.name);
  
  // Auto-advance carousel every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextProduct();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentIndex, products.length]);
  
  return (
    <div className={`w-full ${className}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      
      <div 
        className="relative w-full h-[500px] bg-gradient-to-b from-gray-100 to-white rounded-xl overflow-hidden shadow-lg" 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* 3D Product Display */}
        <div className="absolute inset-0">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="w-full h-full"
            shadows
          >
            <Stage environment="city" intensity={0.5}>
              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
                config={{ mass: 2, tension: 500 }}
                snap={{ mass: 4, tension: 250 }}
              >
                <AnimatePresence>
                  <OBJModelLoader 
                    key={currentProduct.id}
                    objUrl={modelPath}
                    position={position}
                    rotation={rotation}
                    scale={scale * 1.2}
                    color={currentProduct.colors[0]}
                  />
                </AnimatePresence>
              </PresentationControls>
            </Stage>
            
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate
              autoRotateSpeed={2}
            />
          </Canvas>
        </div>
        
        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm p-6 text-white">
          <motion.div
            key={currentProduct.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-between items-start"
          >
            <div>
              <h3 className="text-2xl font-bold mb-1">{currentProduct.name}</h3>
              <p className="text-gray-300 mb-2">{currentProduct.description.substring(0, 100)}...</p>
              <p className="text-xl font-bold">{formatPrice(currentProduct.price)}</p>
              <div className="mt-3">
                <Link href={`/product/${currentProduct.id}`}>
                  <a className="inline-block bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                    View Details
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <p className="text-sm text-gray-300">Available Colors</p>
              <div className="flex space-x-2">
                {currentProduct.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-white cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Navigation Controls */}
        <button
          onClick={prevProduct}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 backdrop-blur-sm"
          disabled={isTransitioning}
          aria-label="Previous product"
        >
          <ChevronLeft className="h-6 w-6 text-black" />
        </button>
        
        <button
          onClick={nextProduct}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 backdrop-blur-sm"
          disabled={isTransitioning}
          aria-label="Next product"
        >
          <ChevronRight className="h-6 w-6 text-black" />
        </button>
        
        {/* Pagination Indicators */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-center space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-6 bg-white' : 'bg-gray-400'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Attribution */}
        <div className="absolute bottom-1 right-2 text-xs text-white opacity-60">
          Created by rishiicreates
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel3D;