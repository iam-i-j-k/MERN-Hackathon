import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function PlaceOrder() {
  const { cart, getTotal, removeFromCart } = useCart();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // If token exists → directly go to "details" step
  const [step, setStep] = useState(token ? "details" : "auth");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Dummy handlers for login/signup
  const handleLogin = () => {
    setIsLoggedIn(true);
    setStep("details");
  };
  const handleSignup = () => {
    setIsLoggedIn(true);
    setStep("details");
  };

  // Place order handler
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const orderId = `ORD${Math.floor(Math.random() * 1000000)}`;
    const statusOptions = ["Pending", "Preparing", "Out for Delivery", "Delivered"];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const order = {
      id: orderId,
      items: cart,
      total: `₹${getTotal()}`,
      address,
      payment,
      status,
    };

    const prevOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([order, ...prevOrders]));
    setOrderPlaced(true);

    localStorage.setItem("cart", JSON.stringify([]));
    cart.forEach(() => removeFromCart(0));

    setTimeout(() => navigate("/orders"), 2000);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Place Your Order</h1>

      {/* Show cart items */}
      {!orderPlaced && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your Cart Items</h2>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="mb-2">
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="font-bold">Total: ₹{getTotal()}</p>
        </div>
      )}

      {/* Auth step */}
      {!orderPlaced && step === "auth" && !isLoggedIn && (
        <div className="flex flex-col items-center space-y-4">
          <button
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 w-full"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className="px-6 py-2 bg-gray-200 text-orange-600 rounded-lg hover:bg-gray-300 w-full"
            onClick={handleSignup}
          >
            Signup
          </button>
        </div>
      )}

      {/* Details step */}
      {!orderPlaced && step === "details" && isLoggedIn && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
          <input
            type="text"
            placeholder="Enter your address/location"
            className="w-full p-2 border rounded mb-6"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h2 className="text-lg font-semibold mb-4">Payment Option</h2>
          <select
            className="w-full p-2 border rounded mb-6"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="">Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
          </select>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:cursor-pointer w-full"
            disabled={!address || !payment || cart.length === 0}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      )}

      {/* Order placed message */}
      {orderPlaced && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Order Placed!
          </h2>
          <p className="text-lg">Redirecting to your orders...</p>
        </div>
      )}
    </div>
  );
}
