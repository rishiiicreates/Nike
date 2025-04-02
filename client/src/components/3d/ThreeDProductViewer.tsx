import React, { useState } from 'react';
import ProductScene from './ProductScene';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ThreeDProductViewerProps {
  productName: string;
  price: string;
  colors: string[];
}

const ThreeDProductViewer: React.FC<ThreeDProductViewerProps> = ({ 
  productName, 
  price,
  colors = ['#ffffff', '#000000', '#eeeeee']
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedTab, setSelectedTab] = useState('3d');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  const availableSizes = ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11"];
  
  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to bag');
      return;
    }
    alert(`${productName} - Size ${selectedSize} has been added to your bag`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="rounded-lg overflow-hidden bg-[#f5f5f5]">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="p-4 bg-white">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="3d">3D View</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="3d" className="focus-visible:outline-none">
            <ProductScene color={colors[selectedColor]} />
          </TabsContent>
          
          <TabsContent value="images" className="focus-visible:outline-none">
            <div className="grid grid-cols-2 gap-2 h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt={productName} 
                className="w-full h-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt={`${productName} alternate`}
                className="w-full h-full object-cover"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold mb-2">{productName}</h1>
        <p className="text-xl font-medium mb-6">{price}</p>
        
        {/* Color Options */}
        <div className="mb-6">
          <p className="font-medium mb-3">Select Color</p>
          <div className="flex space-x-2">
            {colors.map((color, index) => (
              <div 
                key={index}
                className={`w-10 h-10 rounded-full cursor-pointer transition-all ${
                  selectedColor === index ? 'ring-2 ring-black scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Size Selection */}
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <p className="font-medium">Select Size</p>
            <a href="#" className="text-[#757575] text-sm underline">Size Guide</a>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {availableSizes.map((size) => (
              <div 
                key={size}
                className={`border ${selectedSize === size ? 'border-black' : 'border-gray-300'} rounded py-3 text-center cursor-pointer hover:border-black transition-colors`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        
        {/* Add to Bag Button */}
        <Button 
          className="w-full bg-[#111] text-white py-4 rounded-full font-medium mb-4 hover:bg-gray-800 transition-colors h-12"
          onClick={handleAddToBag}
        >
          Add to Bag
        </Button>
        
        <Button 
          className="w-full bg-white text-[#111] py-4 rounded-full font-medium border border-gray-300 mb-6 hover:border-gray-500 transition-colors h-12"
          variant="outline"
        >
          Favorite
        </Button>
        
        {/* Product Description */}
        <div className="mb-6">
          <p className="mb-4">The radiance lives on in the Nike shoe that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.</p>
          <ul className="list-disc list-inside space-y-2 text-[#757575]">
            <li>Shown: {colors[selectedColor] === '#ffffff' ? 'White' : colors[selectedColor] === '#000000' ? 'Black' : 'Grey'}</li>
            <li>Style: 315122-111</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThreeDProductViewer;