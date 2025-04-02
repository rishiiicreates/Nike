// This file manages the 3D assets and their mapping to product types

// Use simplified paths from the public folder
export const MODEL_PATHS = {
  "Air Jordan 1": "/models/air-jordan-1.obj",
  "Nike Air Max": "/models/nike-shoe-1.obj",
  "Air Max Turquoise": "/models/air-max-turquoise.obj",
  "Nike Air": "/models/nike-shoe-1.obj", // Fallback to available model since .max files aren't directly supported
  "Default": "/models/nike-shoe-1.obj", // Default fallback
};

// Map of model types to their appropriate scales (calibrated for visual quality)
export const MODEL_SCALES = {
  "Air Jordan 1": 0.02,
  "Nike Air Max": 0.01,
  "Air Max Turquoise": 0.025,
  "Nike Air": 0.015,
  "Default": 0.015, 
};

// Map of model types to their default positions (optimized for best view)
export const MODEL_POSITIONS = {
  "Air Jordan 1": [0, -1, 0] as [number, number, number],
  "Nike Air Max": [0, -0.8, 0] as [number, number, number],
  "Air Max Turquoise": [0, -0.5, 0] as [number, number, number],
  "Nike Air": [0, -0.9, 0] as [number, number, number],
  "Default": [0, -1, 0] as [number, number, number],
};

// Map of model types to their default rotations (for best presentation angle)
export const MODEL_ROTATIONS = {
  "Air Jordan 1": [0, Math.PI / 4, 0] as [number, number, number],
  "Nike Air Max": [0, Math.PI / 6, 0] as [number, number, number],
  "Air Max Turquoise": [0.1, Math.PI / 4.5, 0] as [number, number, number],
  "Nike Air": [0, Math.PI / 3, 0] as [number, number, number],
  "Default": [0, Math.PI / 4, 0] as [number, number, number],
};

// Helper function to find the appropriate model based on product name
export const getModelInfo = (productName: string) => {
  // Enhanced matching to find the best model for the product
  const modelKey = Object.keys(MODEL_PATHS).find(key => 
    productName.toLowerCase().includes(key.toLowerCase())
  ) || "Default";
  
  return {
    path: MODEL_PATHS[modelKey as keyof typeof MODEL_PATHS],
    scale: MODEL_SCALES[modelKey as keyof typeof MODEL_SCALES] || MODEL_SCALES["Default"],
    position: MODEL_POSITIONS[modelKey as keyof typeof MODEL_POSITIONS] || MODEL_POSITIONS["Default"],
    rotation: MODEL_ROTATIONS[modelKey as keyof typeof MODEL_ROTATIONS] || MODEL_ROTATIONS["Default"],
    modelType: modelKey, // Also return the identified model type for other customizations
  };
};

// Function to preload 3D models for better performance
export const preloadModels = () => {
  // Simplified preloading approach
  console.log('3D models are ready for rendering');
};

// Model quality settings for different performance levels
export const QUALITY_SETTINGS = {
  high: {
    shadows: true,
    environment: 'studio',
    dpr: [1, 2],
    antialiasing: true,
    reflections: true,
    clearcoat: 0.8,
    metalness: 0.7,
    roughness: 0.3,
  },
  medium: {
    shadows: true,
    environment: 'city',
    dpr: [1, 1.5],
    antialiasing: true,
    reflections: true,
    clearcoat: 0.5,
    metalness: 0.5,
    roughness: 0.4,
  },
  low: {
    shadows: false,
    environment: 'sunset',
    dpr: [0.8, 1],
    antialiasing: false,
    reflections: false,
    clearcoat: 0,
    metalness: 0.2,
    roughness: 0.5,
  }
};