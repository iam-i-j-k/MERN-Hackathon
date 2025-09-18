import { useEffect, useState } from "react";
import axios from "axios";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/viewRestaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.error("Fetch Restaurants Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete restaurant
  const handleDeleteRestaurant = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/api/admin/deleteRestaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Restaurant deleted successfully!");
      setRestaurants(restaurants.filter((r) => r.id !== id)); // update UI instantly
    } catch (error) {
      console.error("Delete Restaurant Error:", error.response?.data || error.message);
      alert("Failed to delete restaurant");
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading restaurants...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Restaurants</h2>

      <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Owner</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants?.length > 0 ? (
            restaurants.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.owner?.name || "N/A"}</td>
                <td className="px-4 py-2">{r.owner?.email || "N/A"}</td>
                <td className="px-4 py-2">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteRestaurant(r.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No restaurants found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantsPage;
