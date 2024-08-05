import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddToCart from "./Component/AddToCart";
import AddCategory from "./Container/Admin/AddCategory";
import AddProduct from "./Container/Admin/AddProduct";
import Dashboard from "./Container/Admin/Dashboard";
import ViewCategory from "./Container/Admin/ViewCategory";
import ViewProduct from "./Container/Admin/ViewProduct";
import Home from "./Container/Home/Home";
import Login from "./Container/Login";
import Registartion from "./Container/Login/Registartion";
import Products from "./Container/Product";
import ProductDetail from "./Container/ProductDetail";
import AdminRoutes from "./Layout/AdminRoute";
import NormalRoute from "./Layout/NormalRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Route */}
        <Route
          path="/admin-dashboard"
          element={<AdminRoutes Component={Dashboard} />}
        >
          <Route path="manage-category" element={<ViewCategory />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="manage-product" element={<ViewProduct />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>

        {/* user route */}
        <Route path="/" element={<NormalRoute Component={Home} />}>
          <Route path="login" element={<Login />} />
          <Route path="category" element={<Products />} />
          <Route path="product" element={<ProductDetail />} />
          <Route path="register" element={<Registartion />} />
          <Route path="cart" element={<AddToCart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
