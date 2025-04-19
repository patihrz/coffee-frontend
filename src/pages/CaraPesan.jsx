import React from 'react';
import '../styles/PageLayoutACC.css';

const CaraPesan = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Cara Pesan Kopi</h1>
      <div className="page-content">
        <ol>
          <li>Pilih menu kopi atau makanan favoritmu</li>
          <li>Isi form pemesanan</li>
          <li>Tunggu konfirmasi dari barista kami</li>
          <li>Nikmati pesananmu ☕</li>
        </ol>
      </div>
    </div>
  );
};

export default CaraPesan;
