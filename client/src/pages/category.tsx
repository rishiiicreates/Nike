import { useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

const Category = () => {
  const [match, params] = useRoute("/category/:category");
  const category = params?.category || "";
  const categoryName = category.replace(/-/g, " ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: [`/api/products/category/${category}`],
    enabled: !!category,
  });

  useEffect(() => {
    document.title = `${categoryName} | Nike`;
  }, [categoryName]);

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/3 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item}>
                <Skeleton className="w-full h-[380px] mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
          <div className="flex items-center justify-center p-8 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="mr-2 h-6 w-6" />
            <p>Error loading products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found in this category.</p>
            <p className="mt-2 text-gray-400">Please try another category or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
