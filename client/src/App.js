import React, { useContext } from "react";
import StatusTracker from "./components/StatusTracker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Allproduct from "./Pages/Products/Allproduct";
import Products from "./Pages/Products/Products";
import SingleProduct from "./Pages/Products/SingleProduct";
import Login from "./Pages/Login";
import AddProduct from "./Pages/Products/AddProduct";
import { Context } from "./Context/ContextProvider";
import Inventory from "./Pages/Inventory/Inventory";
import Cart from "./Pages/Cart/Cart";
import Scheme from "./Pages/Schemes/Scheme";

import UseAlan from "./components/UseAlan";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Forum from "./Pages/Forum/Forum";
import Tutorials from "./Pages/Tutorials/Tutorials";

function App() {
  const { user } = useContext(Context);
  UseAlan();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={user ? <Home /> : <Login />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/inventory" element={<Inventory /> } />
        <Route path="/cart" element={user ? <Cart /> : <Login />} />
        <Route path="/schemes" element={<Scheme />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route
          path="/products/:name"
          element={user ? <Products /> : <Login />}
        />
        <Route
          path="/singleProduct/:id"
          element={user ? <SingleProduct /> : <Login />}
        />
        <Route path="/status" element={<StatusTracker />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
