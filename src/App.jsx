import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./App.css";
import ProductsPage from "./ProductsPage";
import SharedLayout from "./SharedLayout";
import LoginPage from "./LoginPage";
import Orders from "./Orders";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="dashboard"
          element={isLogin ? <SharedLayout /> : <LoginPage />}
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
