import React from 'react';
import '../styles/Partnership.css';

const Partnership = () => {
  return (
    <section
      id="partnership"
      className="partnership-section"
      style={{
        backgroundImage: "url('/images/bg-partnership.png')"
      }}
    >
      <div className="overlay">
        <h2>Bermitra dengan Trike Coffee</h2>
        <p>Bergabunglah menjadi bagian dari perjalanan kopi kami!</p>
        <button>Hubungi Kami</button>
      </div>
    </section>
  );
};

export default Partnership;
