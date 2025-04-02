import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import CategoryShowcase from "@/components/category-showcase";
import TrendingSection from "@/components/trending-section";
import MembershipBenefits from "@/components/membership-benefits";
import PopularSection from "@/components/popular-section";
import FeaturedModelShowcase from "@/components/3d/FeaturedModelShowcase";
import ProductCarousel3D from "@/components/3d/ProductCarousel3D";
import { MODEL_PATHS, preloadModels } from "@/lib/3dAssets";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  useEffect(() => {
    document.title = "Nike. Just Do It.";
    // Preload 3D models for better performance
    preloadModels();
  }, []);

  const { data: featuredProducts = [] } = useQuery({
    queryKey: ['/api/featured-products'],
  });

  const { data: trendingProducts = [] } = useQuery({
    queryKey: ['/api/trending-products'],
  });

  return (
    <div>
      <HeroSection />
      
      {/* 3D Feature Showcase */}
      <FeaturedModelShowcase
        title="Experience in 3D"
        subtitle="Explore Nike Air Jordan 1 with our interactive 3D viewer. Rotate, zoom, and see every detail before you buy."
        modelPath={MODEL_PATHS["Air Jordan 1"]}
        ctaLink="/category/shoes"
        ctaText="Shop Now"
        bgColor="bg-gray-900"
      />
      
      <FeaturedProducts />
      
      {/* 3D Product Carousel */}
      {featuredProducts.length > 0 && (
        <ProductCarousel3D 
          products={featuredProducts} 
          title="Featured Products in 3D"
          className="bg-white"
        />
      )}
      
      <CategoryShowcase />
      <TrendingSection />
      
      {/* Another 3D Feature with Air Max */}
      <FeaturedModelShowcase
        title="Nike Air Max"
        subtitle="Legendary comfort and style, now in interactive 3D. Experience the Air Max difference."
        modelPath={MODEL_PATHS["Nike Air Max"]}
        ctaLink="/category/lifestyle"
        ctaText="Explore Air Max"
        bgColor="bg-black"
      />
      
      <MembershipBenefits />
      <PopularSection />
    </div>
  );
};

export default Home;
