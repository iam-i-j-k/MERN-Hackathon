import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Cart from "./components/user/Cart";
import Navbar from "./components/user/Navbar";
import CheckConnection from "./components/common/CheckConnection";
import Login from "./components/common/Login";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/common/LandingPage";
import NotFound from "./components/common/NotFound";
import Home from "./components/user/Home";
import SignUp from "./components/common/SignUp";
import RestaurantDetail from "./components/user/RestaurantDetails";
import Restaurants from "./components/user/Restaurants";
import AdminDashboard from "./components/admin/AdminDashboard";
import RestaurantsPage from "./components/admin/RestaurantsPage";
import UsersPage from "./components/admin/UsersPage";
import AdminLogin from "./components/admin/AdminLogin";
import AdminSignUp from "./components/admin/AdminSignUp";
import RestaurantLogin from "./components/restaurant/RestaurantLogin";
import RestaurantSignUp from "./components/restaurant/RestaurantSignUp";
import RestaurantDashboard from "./components/restaurant/RestaurantDashboard";
import Order from "./components/user/Order";
import PlaceOrder from "./components/user/PlaceOrder";


const AppContent = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  return (
    <>
      <CheckConnection />

      {/* Navbar shown only if NOT on landing page */}
      {location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname!=="/admin/dashboard" && location.pathname!=="/admin/users" && location.pathname!=="/admin/restaurants" && location.pathname!=="/admin/login" && location.pathname!=="/restaurant/login" && location.pathname!=="/restaurant/signup" && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/placeorder" element={<PlaceOrder />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/dashboard" element={ <AdminDashboard /> } />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/restaurants" element={<RestaurantsPage />} />
        
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/signup" element={<RestaurantSignUp />} />
        <Route path="/restaurant/dashboard" element={ <RestaurantDashboard /> } />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
