import { useEffect } from "react";
import HeroSection from "@/components/hero-section";
import FeaturedProducts from "@/components/featured-products";
import CategoryShowcase from "@/components/category-showcase";
import TrendingSection from "@/components/trending-section";
import MembershipBenefits from "@/components/membership-benefits";
import PopularSection from "@/components/popular-section";

const Home = () => {
  useEffect(() => {
    document.title = "Nike. Just Do It.";
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <TrendingSection />
      <MembershipBenefits />
      <PopularSection />
    </div>
  );
};

export default Home;
