import { Link } from "wouter";
import { mainCategories } from "@/lib/data";
import { motion } from "framer-motion";

const CategoryShowcase = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Men's Category */}
          <motion.div 
            className="relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Men's Collection" 
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-4 drop-shadow-lg">Men's</h3>
                <Link href="/category/men">
                  <a className="bg-white text-[#111] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                    Shop
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Women's Category */}
          <motion.div 
            className="relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1536516677467-a8cf206e1066?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Women's Collection" 
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-4 drop-shadow-lg">Women's</h3>
                <Link href="/category/women">
                  <a className="bg-white text-[#111] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                    Shop
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Kids' Category */}
          <motion.div 
            className="relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1500468756762-a401b6f17b46?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Kids' Collection" 
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-white text-2xl font-bold mb-4 drop-shadow-lg">Kids'</h3>
                <Link href="/category/kids">
                  <a className="bg-white text-[#111] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                    Shop
                  </a>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
