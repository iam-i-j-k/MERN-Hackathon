import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/home");
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        src="https://b.zmtcdn.com/data/file_assets/2627bbed9d6c068e50d2aadcca11ddbb1743095925.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Fallback Image */}
      <img
        src="https://b.zmtcdn.com/data/o2_assets/52c985ee025e442b74fb4c91cbe20ced1743099385.png"
        alt="Zomato logo"
        className="transition-opacity duration-200 opacity-0 absolute top-0 left-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Foodie Hub
        </h1>
        <p className="text-lg md:text-2xl mb-6 text-center">
          Order your favorite meals in just a few clicks!
        </p>
        <div className="flex flex-col gap-5">
            <button
            onClick={handleNavigateHome}
            className="px-6 py-3 cursor-pointer bg-orange-600 rounded-lg hover:bg-orange-700 transition"
          >
            Explore Menu
          </button>
          <button
          onClick={()=>navigate('/admin/login')}
            className="px-6 py-3 cursor-pointer bg-orange-600 rounded-lg hover:bg-orange-700 transition"
          >
            Admin Panel
          </button>
          <button
          onClick={()=>navigate('/restaurant/login')}
            className="px-6 py-3 cursor-pointer bg-orange-600 rounded-lg hover:bg-orange-700 transition"
          >
            Restaurant Panel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
