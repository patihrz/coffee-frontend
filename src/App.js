import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Career from './pages/Career';
import CaraPesan from './pages/CaraPesan';
import HeroSection from './components/HeroSection';
import Menu from './components/Menu';
import OrderForm from './components/OrderForm';
import Partnership from './components/Partnership';
import Admin from './pages/Admin';
import './App.css';


function Home() {
  return (
    <>
      <HeroSection />
      <div id="menu">
        <Menu />
      </div>
      <div id="order">
        <OrderForm />
      </div>
      <div id="partnership">
        <Partnership />
      </div>
      <div id="contact">
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<Career />} />
        <Route path="/carapesan" element={<CaraPesan />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  );
}


export default App;
