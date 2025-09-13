import { useState, useEffect } from "react";
import axios from "axios";

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const token = localStorage.getItem("token");
  // Fetch Restaurant Profile
  const fetchProfile = async () => {
  try {
    const res = await axios.get("http://localhost:8000/api/restaurant/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.status) setRestaurant(res.data.restaurant);
  } catch (error) {
    console.error("Profile Fetch Error:", error.response?.data || error.message);
  }
};


  // Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/restaurant/orders",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
      );
      if (res.data.status) setOrders(res.data.orders);
    } catch (error) {
      console.error("Orders Fetch Error:", error);
    }
  };

  // Update Order Status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/restaurant/orders/${orderId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }, { status });
      if (res.data.status) {
        setOrders(orders.map(o => (o.id === orderId ? { ...o, status } : o)));
      }
    } catch (error) {
      console.error("Order Status Update Error:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchProfile();
      await fetchOrders();
      setLoading(false);
    })();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Restaurant Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["profile", "menu", "orders", "reviews"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile */}
      {activeTab === "profile" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Restaurant Profile</h2>
          <img src={restaurant?.image} alt={restaurant.name} className="w-32 h-32 rounded mb-4" />
          <p><strong>Name:</strong> {restaurant.name}</p>
          <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
          <p><strong>Location:</strong> {restaurant.location}</p>
        </div>
      )}

      {/* Menu */}
      {activeTab === "menu" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">
            + Add Food Item
          </button>
          <ul>
            {restaurant.menu.map(item => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>{item.name} - ${item.price}</span>
                <span>{item.available ? "Available" : "Not Available"}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          {orders.length > 0 ? (
            <table className="w-full border border-gray-200 rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Items</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.user?.name}</td>
                    <td className="px-4 py-2">
                      {order.items.map(i => i.name).join(", ")}
                    </td>
                    <td className="px-4 py-2">{order.status}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option>Pending</option>
                        <option>Preparing</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No orders yet.</p>
          )}
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Reviews</h2>
          {restaurant.reviews.length > 0 ? (
            <ul>
              {restaurant.reviews.map(review => (
                <li key={review.id} className="border-b py-2">
                  ⭐ {review.rating} - {review.comment} <br />
                  <span className="text-gray-500">by {review.user?.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantDashboard;
