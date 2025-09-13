import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate inputs
  const validate = () => {
    let tempErrors = {};

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/restaurant/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      console.log(data);

      // save token
      localStorage.setItem("token", data.token);

      setMessage("Login successful 🎉");
      navigate("/restaurant/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        setMessage(error.response.data.message || "Login failed ❌");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* decorative images (same as your code) */}
      <img
        src="https://b.zmtcdn.com/data/o2_assets/b4f62434088b0ddfa9b370991f58ca601743060218.png"
        className="absolute  right-[10%] top-[15%] z-30 aspect-[420/370] w-[120px] md:w-[min(24%,240px)] rounded-lg  xl:right-[15%] xl:top-8 "
      />
      <img
        src="https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png"
        className=" absolute   right-[12%] xl:right-[8%] xl:bottom-[55%] w-8 xl:w-12 aspect-[158/125] rotate-45"
      />
      <img
        src="https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png"
        className="absolute right-[12%] bottom-[10%] xl:bottom-10  xl:right-[10%] aspect-square w-[124px] md:w-[min(24%,240px)]  rounded-lg "
      />
      <img
        src="https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png"
        className=" absolute top-[10%] left-[30%] w-8 xl:w-12 aspect-[92/67] rotate-2"
      />
      <img
        src="https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png"
        className="absolute  top-[40%] w-[130px]  md:w-[min(22%,240px)]  rounded-lg left-[8%] xl:left-[15%]  "
      />
      <img
        src="https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png"
        className=" absolute bottom-[10%] left-[20%] xl:bottom-[2%] xl:left-[10%] w-8 xl:w-12 aspect-[158/125] -rotate-2"
      />

      {/* Login Card */}
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full cursor-pointer bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Login
        </button>

        {/* Message */}
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}

        <div className="p-3">
          <p>
            Don't have an Account?
            <a href="/restaurant/signup" className="px-1 underline text-orange-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantLogin;
