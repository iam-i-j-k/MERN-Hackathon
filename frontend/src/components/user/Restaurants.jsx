import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { restaurants } from "./data";

export default function Restaurants() {
    const navigate=useNavigate()
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nearby Restaurants</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((res) => (
          <Link to={`/restaurants/${res.id}`} key={res.id}>
            <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 hover:cursor-pointer">
              <img
                src={res.image}
                alt={res.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800">{res.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{res.description}</p>
                <p className="text-sm text-gray-700 mt-2 font-medium">
                  {res.priceRange}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="ml-1 text-gray-700">{res.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}