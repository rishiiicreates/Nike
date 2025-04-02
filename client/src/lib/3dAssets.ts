// This file manages the 3D assets and their mapping to product types

// Map of model files to relative paths
export const MODEL_PATHS = {
  "Air Jordan 1": "/models/air-jordan-1.obj",
  "Nike Air Max": "/models/nike-shoe-1.obj",
  "Air Max Turquoise": "/models/air-max-turquoise.obj",
  "Default": "/models/nike-shoe-1.obj", // Default fallback
};

// Map of model types to their appropriate scales
export const MODEL_SCALES = {
  "Air Jordan 1": 0.02,
  "Nike Air Max": 0.01,
  "Air Max Turquoise": 0.03,
  "Default": 0.015, 
};

// Map of model types to their default positions
export const MODEL_POSITIONS = {
  "Air Jordan 1": [0, -1, 0] as [number, number, number],
  "Nike Air Max": [0, -0.8, 0] as [number, number, number],
  "Air Max Turquoise": [0, -0.7, 0] as [number, number, number],
  "Default": [0, -1, 0] as [number, number, number],
};

// Map of model types to their default rotations
export const MODEL_ROTATIONS = {
  "Air Jordan 1": [0, Math.PI / 4, 0] as [number, number, number],
  "Nike Air Max": [0, Math.PI / 6, 0] as [number, number, number],
  "Air Max Turquoise": [0, Math.PI / 5, 0] as [number, number, number],
  "Default": [0, Math.PI / 4, 0] as [number, number, number],
};

// Helper function to find the appropriate model based on product name
export const getModelInfo = (productName: string) => {
  const modelKey = Object.keys(MODEL_PATHS).find(key => 
    productName.toLowerCase().includes(key.toLowerCase())
  ) || "Default";
  
  return {
    path: MODEL_PATHS[modelKey as keyof typeof MODEL_PATHS],
    scale: MODEL_SCALES[modelKey as keyof typeof MODEL_SCALES],
    position: MODEL_POSITIONS[modelKey as keyof typeof MODEL_POSITIONS],
    rotation: MODEL_ROTATIONS[modelKey as keyof typeof MODEL_ROTATIONS],
  };
};

// Function to preload 3D models for better performance
export const preloadModels = () => {
  Object.values(MODEL_PATHS).forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = path;
    link.as = 'fetch';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};