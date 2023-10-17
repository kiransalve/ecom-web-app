import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/Product/Product";
import ProductDetail from "./components/Product/ProductDetail";
import Cart from "./components/Cart/Cart";
import Register from "./components/Auth/Register";
import Signin from "./components/Auth/Signin";
import { useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import Order from "./components/Order/Order";

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <BrowserRouter>
        {user && <Header />}
        <Routes>
          {user && <Route element={<Product />} path="/"></Route>}
          {user && <Route element={<HomePage />} path="/home"></Route>}
          {user && (
            <Route
              element={<ProductDetail />}
              path="/products/:productId"
            ></Route>
          )}
          {user && <Route element={<Cart />} path="/cart"></Route>}
          {user && <Route element={<Order />} path="/order"></Route>}
          <Route element={<Register />} path="/register"></Route>
          {!user && <Route element={<Signin />} path="/login"></Route>}
          <Route path="*" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
