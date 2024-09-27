import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import AdminLogin from '../components/AdminLogin'; 
import Orders from '../pages/Orders';
import Wishlist from '../pages/Wishlist';
import GiftCards from '../pages/GiftCards';
import SavedCards from '../pages/SavedCards';
import SavedAddresses from '../pages/SavedAddresses';




const RouterRoutes = () => {

    useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="/orders" element={<Orders />} /> {/* Change here */}
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/gift-cards" element={<GiftCards />} />
                <Route path="/saved-cards" element={<SavedCards />} />
                <Route path="/saved-addresses" element={<SavedAddresses />} />
              
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;