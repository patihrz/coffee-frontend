import React from "react";
import { motion } from "framer-motion";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="hero-content">
        <h1>Rasakan Kopi Terbaik di Kotamu</h1>
        <p>Menu andalan kami siap menemani harimu — dari pagi sampai malam.</p>
        <a href="#order" className="order-btn">Pesan Sekarang</a>
      </div>
    </motion.section>
  );
};

export default HeroSection;
