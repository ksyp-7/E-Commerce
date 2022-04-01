import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Category from "./categories/Categories";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import NotFound from "./utils/not_found/NotFound";
import CreateProduct from "./createProduct/CreateProduct";
import { globalState } from "../../globalState";

function Pages() {
  const state = useContext(globalState);
  const [isLogged] = state.userApi.isLogged;
  const [isAdmin] = state.userApi.isAdmin;
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Products />} />
        <Route path="/detail/:id" exact element={<DetailProduct />} />
        <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
        <Route
          path="/register"
          exact
          element={isLogged ? <NotFound /> : <Register />}
        />
        <Route
          path="/history"
          exact
          element={isLogged ? <OrderHistory /> : <NotFound />}
        />

        <Route
          path="/history/:id"
          exact
          element={isLogged ? <OrderDetails /> : <NotFound />}
        />

        <Route
          path="/category"
          exact
          element={isAdmin ? <Category /> : <NotFound />}
        />

        <Route
          path="/create_product"
          exact
          element={isAdmin ? <CreateProduct /> : <NotFound />}
        />

<Route
          path="/edit_product/:id"
          exact
          element={isAdmin ? <CreateProduct /> : <NotFound />}
        />
        <Route path="/cart" exact element={<Cart />} />

        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </div>
  );

  // <Router>

  // </Router>;
}

export default Pages;
