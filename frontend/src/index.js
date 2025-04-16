import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen" ;
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute";
import PaymentMethod from "./screens/PaymentMethod";
import PlaceOrderScreen  from "./screens/PlaceOrderScreen";
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import ProfileScreen from "./screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import OrderListScreen from "./screens/admin/OrderListScreen"

import OrderScreen from "./components/OrderScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />}/>

      {/* insert any route you want it to be private */}
      <Route  element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}/>
        <Route path="/payment" element={<PaymentMethod />}/>
        <Route path="/placeorder" element={<PlaceOrderScreen />}/>
        <Route path="/placeorder" element={<PlaceOrderScreen />}/>
        <Route path="/order/:id" element={<OrderScreen />}/>
        <Route path="/profile" element={<ProfileScreen />}/>
      </Route>

      {/* insert any route you want it to be entered by admin */}
      <Route  element={<AdminRoute />}>
        <Route path="/admin/orderList" element={<OrderListScreen />}/>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
