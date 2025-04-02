import { Link } from "wouter";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative">
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
          alt="Nike shoes on a red background" 
          className="w-full h-[80vh] object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            JUST DO IT
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Next-level technology, iconic style. Introducing the Air Max Collection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href="/category/air-max">
              <a className="bg-white text-[#111] px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors">
                Shop Now
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
