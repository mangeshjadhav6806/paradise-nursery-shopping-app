import React from 'react';
import { NavLink, Route, Routes, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Leaf, ShoppingCart } from 'lucide-react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import { selectCartCount } from './CartSlice.jsx';

function Navbar() {
  const cartCount = useSelector(selectCartCount);
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <Link to="/" className="brand"><span className="brand-icon"><Leaf size={19} /></span><span>paradise<span className="brand-light">nursery</span></span></Link>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/plants">Plants</NavLink>
        <NavLink className="cart-nav-link" to="/cart" aria-label={`Cart, ${cartCount} items`}><ShoppingCart size={18} /><span>Cart</span><span className="cart-count">{cartCount}</span></NavLink>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow"><span /> A little life for your space</p>
          <h1>Paradise<br /><em>Nursery</em></h1>
          <p className="hero-copy">Find your next favorite thing to water.</p>
          <Link className="button button-light" to="/plants">Get started <span>↗</span></Link>
        </div>
        <div className="hero-caption"><span>01 / 03</span><span>Grown with care, chosen for home.</span></div>
      </section>
      <AboutUs />
      <section className="home-feature">
        <p className="eyebrow">A good place to begin</p>
        <h2>New leaves<br />look good on you.</h2>
        <Link className="text-link" to="/plants">Shop the collection <span>↗</span></Link>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="site-footer"><span>© 2026 Paradise Nursery</span><span>Made for the love of leaves <Leaf size={14} /></span></footer>
    </>
  );
}