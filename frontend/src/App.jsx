import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import Nav from "./components/Nav";

import CollectionsPage from './components/CollectionsPage'
import AboutPage from './components/AboutPage'
import ProductsPage from './components/ProductsPage'
import ProductDetailPage from './components/ProductDetailPage'
import CartPage from './components/CartPage'
import ProfilePage from './components/ProfilePage'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav /> {/* Nav har page par dikhega */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;