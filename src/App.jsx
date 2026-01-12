import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductGrid from "./components/ProductGrid";
import FeaturedCollections from "./components/FeaturedCollections";
import Features from "./components/Features";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ProductModal from "./components/ProductModal";
import SearchOverlay from "./components/SearchOverlay";
import SareesListing from "./components/SareesListing";
import KidsListing from "./components/KidsListing";
import Cart from "./components/Cart";
import EmptyCart from "./components/EmptyCart";
import Wishlist from "./components/Wishlist";
import MyAccount from "./components/MyAccount";
import Checkout from "./components/Checkout";
import Contact from "./components/ContactUs";
import InstagramGallery from "./components/InstagramGalleryPage";
import OrderSuccess from "./components/OrderSuccess";
import ProductDetail from "./components/ProductDetail";
import OurStory from "./components/OurStory";
import SareeCombo from "./components/SareeCombo";
import Reviews from "./components/Reviews";
import ScrollToTop from "./components/ScrollToTop";
import FloatingContacts from "./components/FloatingContacts";

import { products } from "./data/products";
import AllCategories from "./components/AllCategories";
import SilkCottonListing from "./components/SilkCottonListing";
import WeddingListing from "./components/WeddingListing";

/* GLOBAL STYLES COMPONENT */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Great+Vibes&display=swap');

    :root {
      /* ===== COLORS (Updated for High Contrast) ===== */
      --primary: #881337;       /* Deep Maroon */
      --primary-dark: #4c0519;  /* Darker Maroon */
      --secondary: #fff1f2;     /* Light Rose */
      --royal-blue: #1e40af;    /* Royal Blue */
      --accent: #ca8a04;        /* Gold */
      
      --background: #ffffff;
      --foreground: #0a0a0a;    /* Nearly Black for Text */
      --muted: #f3f4f6;
      --muted-foreground: #374151; /* Dark Gray for secondary text */
      
      --border: #e5e7eb;
      
      /* ===== SHADOWS ===== */
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
      --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
      
      /* ===== FONTS ===== */
      --font-primary: 'Montserrat', sans-serif;
      --font-secondary: 'Cormorant Garamond', serif;
      --font-accent: 'Great Vibes', cursive;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: var(--font-primary);
      color: var(--foreground);
      background-color: var(--background);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-secondary);
      color: var(--foreground);
      font-weight: 700;
    }

    a { text-decoration: none; color: inherit; transition: color 0.2s; }
    ul { list-style: none; }
    button { font-family: inherit; }

    /* UTILITIES */
    .container-custom {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 24px;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1rem;
      background: linear-gradient(to right, var(--primary), var(--royal-blue));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }
    
    @media (max-width: 768px) {
      .container-custom { padding: 0 16px; }
      .section-title { font-size: 2rem; }
    }

    /* ANIMATIONS */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-s { animation: fadeIn 0.5s ease-out forwards; }
  `}</style>
);

/* ---------------- HOME PAGE ---------------- */

function HomePage({
  products,
  cart,
  wishlist,
  onAddToCart,
  onToggleWishlist,
}) {
  return (
    <>
      <Hero />
      <Categories />

      <ProductGrid
        products={products}
        cart={cart}
        wishlist={wishlist}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
      />

      <FeaturedCollections />
      <Features />
    </>
  );
}

/* ---------------- APP ---------------- */

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* -------- CART -------- */

  const addToCart = (productId, quantity = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, change) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  /* -------- WISHLIST -------- */

  const toggleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === productId);
      if (exists) return prev.filter((p) => p.id !== productId);
      return [...prev, product];
    });
  };

  /* -------- PRODUCT MODAL (HOME ONLY) -------- */

  const openProductModal = (productId) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  /* -------- RENDER -------- */

  return (
    <Router>
      <ScrollToTop />
      <GlobalStyles />
      <Header
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              cart={cart}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        {/* PRODUCT DETAIL */}
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/sarees"
          element={
            <SareesListing
              cart={cart}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        {/* ALL CATEGORIES */}
        <Route path="/categories" element={<AllCategories />} />

        {/* MISSING CATEGORIES */}
        <Route
          path="/silk-cotton"
          element={
            <SilkCottonListing
              cart={cart}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/wedding"
          element={
            <WeddingListing
              cart={cart}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        {/* KIDS */}
        <Route
          path="/kids"
          element={
            <KidsListing
              cart={cart}
              wishlist={wishlist}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
            />
          }
        />

        {/* COMBO */}
        <Route path="/combo" element={<SareeCombo />} />

        {/* CART */}
        <Route
          path="/cart"
          element={
            cart.length === 0 ? (
              <EmptyCart
                cart={cart}
                wishlist={wishlist}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
              />
            ) : (
              <Cart
                cart={cart}
                onUpdateQty={updateQuantity}
                onRemove={removeFromCart}
              />
            )
          }
        />

        {/* WISHLIST */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
              onAddToCart={(id) => addToCart(id, 1)}
            />
          }
        />

        {/* OTHER */}
        <Route path="/account" element={<MyAccount />} />
        <Route path="/checkout" element={<Checkout cart={cart} onRemove={removeFromCart} />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/instagram" element={<InstagramGallery />} />
        <Route path="/about" element={<OurStory />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>

      <Footer />

      {/* QUICK VIEW MODAL */}
      {isModalOpen && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
          onAddToCart={(id, qty) => {
            addToCart(id, qty);
            closeProductModal();
          }}
          onToggleWishlist={toggleWishlist}
        />
      )}

      {/* SEARCH */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <FloatingContacts />
    </Router>
  );
}

export default App;
