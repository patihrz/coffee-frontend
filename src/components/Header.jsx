import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ title }) => {
  return (
    <motion.div
      className="text-center my-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h2 className="fw-bold">{title}</h2>
    </motion.div>
  );
};

export default Header;
