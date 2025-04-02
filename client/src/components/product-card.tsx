import { useState } from "react";
import { Link } from "wouter";
import { Product } from "@shared/schema";
import { formatPrice, formatProductImage } from "@/lib/data";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/product/${product.id}`}>
      <a 
        className="block product-card relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <img 
            src={formatProductImage(product.image)} 
            alt={product.name}
            className="w-full h-[380px] object-cover transition-opacity duration-500"
            style={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
          />
          
          {product.hoverImage && (
            <img 
              src={formatProductImage(product.hoverImage)} 
              alt={`${product.name} Alternate View`}
              className="w-full h-[380px] object-cover absolute top-0 left-0 transition-opacity duration-500"
              style={{ opacity: isHovered ? 1 : 0 }}
            />
          )}
          
          {product.isNew && (
            <div className="absolute top-4 left-4 bg-white text-xs px-2 py-1">New</div>
          )}
          
          {product.isTrending && !product.isNew && (
            <div className="absolute top-4 left-4 bg-white text-xs px-2 py-1">Trending</div>
          )}
          
          {product.isBestSeller && !product.isNew && !product.isTrending && (
            <div className="absolute top-4 left-4 bg-white text-xs px-2 py-1">Best Seller</div>
          )}
        </div>
        
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex justify-between mb-1">
            <h3 className="font-medium">{product.name}</h3>
            <p className="font-medium">{formatPrice(product.price)}</p>
          </div>
          <p className="text-[#757575] text-sm mb-1">{product.category}</p>
          <p className="text-[#757575] text-sm">
            {product.colors > 1 ? `${product.colors} Colors` : '1 Color'}
          </p>
        </motion.div>
      </a>
    </Link>
  );
};

export default ProductCard;
