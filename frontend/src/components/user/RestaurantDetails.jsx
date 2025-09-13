import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { restaurants } from "./data"; // ✅ make sure data.js exports restaurants
import { useCart } from "../../context/CartContext";

export default function RestaurantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("overview");

  if (!restaurant) {
    return <h2 className="text-center mt-10">Restaurant not found</h2>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Big Image */}
      <div className="mt-16">
            <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />

        {/* Info */}
        <div className="mt-4">
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            <p className="text-gray-600 mt-2">{restaurant.description}</p>
            <p className="text-gray-800 mt-2 font-medium">{restaurant.priceRange}</p>
            <div className="flex items-center mt-2">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="ml-1 text-gray-700">{restaurant.rating}</span>
            </div>
            <p className="text-gray-600 mt-2">
            📍 <span className="font-medium">{restaurant.location}</span>
            </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b mt-6">
            {["overview", "menu", "reviews"].map((tab) => (
            <button
                key={tab}
                className={`pb-2 text-lg hover:cursor-pointer capitalize ${
                activeTab === tab
                    ? "border-b-2 border-orange-600 text-orange-600"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
            >
                {tab}
            </button>
            ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
            {/* Overview with More Info & Timings */}
            {activeTab === "overview" && (
            <div className="space-y-6">
                <p className="text-gray-700">{restaurant.moreInfo}</p>

                {/* Timings */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3">Timings</h2>
                <p className="text-gray-700">{restaurant.timings}</p>
                </div>
            </div>
            )}

            {/* Menu */}
            {activeTab === "menu" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                {
                    name: "Paneer Butter Masala",
                    price: "₹220",
                    image:
                    "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/paneer-butter-masala.jpg",
                },
                {
                    name: "Chicken Biryani",
                    price: "₹300",
                    image:
                    "https://saihomefood.in/cdn/shop/products/n7.jpg?v=1572348312",
                },
                {
                    name: "Masala Dosa",
                    price: "₹150",
                    image:
                    "https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg",
                },
                {
                    name: "Sambar Idly",
                    price: "₹120",
                    image:
                    "https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg",
                },
                ].map((item, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-700">{item.price}</p>
                    <button
                        className="mt-2 px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 hover:cursor-pointer"
                        onClick={() => {
                        addToCart(item);
                        navigate("/cart");
                        }}
                    >
                        Add to Bag
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}

            {/* Reviews */}
            {activeTab === "reviews" && (
            <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-medium">Amit</p>
                <p className="text-gray-700">Amazing food! Will order again.</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg">
                <p className="font-medium">Priya</p>
                <p className="text-gray-700">
                    Good service but biryani was spicy!
                </p>
                </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}