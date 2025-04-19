import React from "react";
import menu from "../data/menuData";
import "../styles/Menu.css";

const Menu = () => {
  return (
    <section className="menu-section">
      <h2>Menu Kami</h2>
      <div className="menu-grid">
        {menu.map((item, index) => (
          <div className="menu-item" key={index}>
            {item.image && (
              <img src={item.image} alt={item.name} />
            )}
            <h3>{item.name}</h3>
            <p>{item.category} - Mulai dari Rp 15.000</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
