import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { formatPrice, formatProductImage } from "@/lib/data";
import { Truck, AlertCircle, Eye, Box } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import ThreeDProductViewer from "@/components/3d/ThreeDProductViewer";

const ProductDetail = () => {
  const [match, params] = useRoute("/product/:id");
  const id = params?.id ? parseInt(params.id) : null;
  const [selectedColor, setSelectedColor] = useState(0); // 0 = white, 1 = black, 2 = gray
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"3d" | "images">("images");
  const { toast } = useToast();

  const availableSizes = ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 10.5", "US 11"];
  const colorMap = ["#ffffff", "#000000", "#eeeeee"];

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Nike`;
    }
  }, [product]);

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to bag",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to bag",
      description: `${product?.name} - Size ${selectedSize} has been added to your bag`,
    });
  };

  const handleFavorite = () => {
    toast({
      title: "Added to favorites",
      description: `${product?.name} has been added to your favorites`,
    });
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="w-full h-[300px]" />
                <Skeleton className="w-full h-[300px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="w-full h-[300px]" />
                <Skeleton className="w-full h-[300px]" />
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/3 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-6" />
              
              {/* Color Options */}
              <div className="mb-6">
                <Skeleton className="h-5 w-1/4 mb-3" />
                <div className="flex space-x-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
              
              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <Skeleton className="h-5 w-1/4" />
                  <Skeleton className="h-4 w-1/5" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </div>
              
              <Skeleton className="h-12 w-full mb-4" />
              <Skeleton className="h-12 w-full mb-6" />
              
              {/* Product Description */}
              <div className="mb-6">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center p-8 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="mr-2 h-6 w-6" />
            <p>Error loading product. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <div className="inline-flex items-center rounded-md border border-gray-200 p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 px-3 ${viewMode === 'images' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('images')}
            >
              <Eye className="h-4 w-4" />
              <span>Images</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center space-x-1 px-3 ${viewMode === '3d' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode('3d')}
            >
              <Box className="h-4 w-4" />
              <span>3D View</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images or 3D View */}
          {viewMode === 'images' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <motion.img 
                  src={formatProductImage(product.image)} 
                  alt={product.name}
                  className="w-full h-[300px] object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.img 
                  src={product.hoverImage ? formatProductImage(product.hoverImage) : formatProductImage(product.image)} 
                  alt={`${product.name} Side View`}
                  className="w-full h-[300px] object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <motion.img 
                  src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt={`${product.name} Top View`}
                  className="w-full h-[300px] object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.img 
                  src="https://images.unsplash.com/photo-1593081891731-fda0877988da?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt={`${product.name} Detail`}
                  className="w-full h-[300px] object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#f5f5f5] rounded-lg overflow-hidden"
            >
              <ThreeDProductViewer 
                productName={product.name}
                price={formatPrice(product.price)}
                colors={[colorMap[selectedColor]]}
              />
            </motion.div>
          )}
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-[#757575] mb-4">{product.category}</p>
            <p className="text-xl font-medium mb-6">{formatPrice(product.price)}</p>
            
            {/* Color Options */}
            <div className="mb-6">
              <p className="font-medium mb-3">Select Color</p>
              <div className="flex space-x-2">
                <div 
                  className={`w-10 h-10 rounded-full bg-white border border-gray-300 cursor-pointer p-0.5 ${selectedColor === 0 ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setSelectedColor(0)}
                >
                  <div className="w-full h-full rounded-full bg-white"></div>
                </div>
                <div 
                  className={`w-10 h-10 rounded-full bg-black cursor-pointer ${selectedColor === 1 ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setSelectedColor(1)}
                ></div>
                <div 
                  className={`w-10 h-10 rounded-full bg-gray-200 cursor-pointer ${selectedColor === 2 ? 'ring-2 ring-black' : ''}`}
                  onClick={() => setSelectedColor(2)}
                ></div>
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
                    className={`border ${selectedSize === size ? 'border-black' : 'border-gray-300'} rounded py-3 text-center cursor-pointer hover:border-black`}
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
              onClick={handleFavorite}
            >
              Favorite
            </Button>
            
            {/* Product Description */}
            <div className="mb-6">
              <p className="mb-4">{product.description || 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.'}</p>
              <ul className="list-disc list-inside space-y-2 text-[#757575]">
                <li>Shown: {selectedColor === 0 ? 'White/White' : selectedColor === 1 ? 'Black/Black' : 'Grey/Grey'}</li>
                <li>Style: 315122-111</li>
              </ul>
            </div>
            
            {/* Free Shipping Note */}
            <div className="flex items-center space-x-2 text-sm mb-6">
              <Truck className="h-5 w-5" />
              <p>Free Shipping & Returns</p>
            </div>

            {/* Created by Attribution */}
            <div className="text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
              Created by <span className="font-medium">rishiicreates</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
