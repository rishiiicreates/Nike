import { motion } from "framer-motion";
import { Gift, Truck, Calendar } from "lucide-react";

const MembershipBenefits = () => {
  const benefitVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Nike Membership
        </motion.h2>
        <motion.p 
          className="text-[#757575] mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Become a Member for the best products, inspiration and stories in sport.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="text-center"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={benefitVariants}
          >
            <div className="mb-6 flex justify-center">
              <Gift className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold mb-3">Member Products & Exclusives</h3>
            <p className="text-[#757575]">Shop member-exclusive styles and collections</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={benefitVariants}
          >
            <div className="mb-6 flex justify-center">
              <Truck className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold mb-3">Free Shipping & Returns</h3>
            <p className="text-[#757575]">Nike Members get free standard shipping on every order</p>
          </motion.div>
          
          <motion.div 
            className="text-center"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={benefitVariants}
          >
            <div className="mb-6 flex justify-center">
              <Calendar className="h-12 w-12" />
            </div>
            <h3 className="text-xl font-bold mb-3">Birthday Rewards</h3>
            <p className="text-[#757575]">Members receive special rewards during their birthday month</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a href="#" className="bg-[#111] text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Join Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
