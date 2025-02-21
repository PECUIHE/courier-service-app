import Image from "next/image";
import { motion } from "framer-motion";

const brands = [
  "/images/fedex-logo.png",
  "/images/dhl-express.png",
  "/images/indrive.png",
  "/images/gls-logo.png",
  "/images/tnt-logo.png",
  "/images/glovo-logo.png",
  "/images/Uber-Eats-logo.png",
  "/images/transco-delivery.png",
  // "/images/bolt-logo.png",
];

export default function Brands() {
  return (
    <div className="overflow-hidden py-16 bg-gray-100">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8">
        Brands
      </h2>
      <div className="relative flex flex-col gap-4">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear", velocity: 5, direction: "rtl" }}
        >
          {brands.map((src, index) => (
            <Image key={index} src={src} alt="Brand Logo" width={150} height={100} />
          ))}
          {brands.map((src, index) => (
            <Image key={`duplicate-${index}`} src={src} alt="Brand Logo" width={150} height={100} />
          ))}
        </motion.div>
        
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 50, ease: "linear", velocity: 5, direction: "ltr" }}
        >
          {brands.map((src, index) => (
            <Image key={`row2-${index}`} src={src} alt="Brand Logo" width={150} height={100} />
          ))}
          {brands.map((src, index) => (
            <Image key={`row2-duplicate-${index}`} src={src} alt="Brand Logo" width={150} height={100} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

