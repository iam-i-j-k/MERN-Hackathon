import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RestaurantSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cuisine: "",
    location: "",
    image: ""
  })

  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ Validate inputs
  const validate = () => {
    const tempErrors = {}

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters"
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Enter a valid email address"
    }

    if (!formData.password) {
      tempErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters"
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.cuisine.trim()) {
      tempErrors.cuisine = "Cuisine is required"
    }

    if (!formData.location.trim()) {
      tempErrors.location = "Location is required"
    }

    if (!formData.image.trim()) {
      tempErrors.image = "Image URL is required"
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(formData.image)) {
      tempErrors.image = "Enter a valid image URL (jpg, png, webp, gif)"
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const res = await fetch("http://localhost:8000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          cuisine: formData.cuisine,
          location: formData.location,
          image: formData.image
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage("Account created successfully 🎉")
        console.log("Restaurant:", data)

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          cuisine: "",
          location: "",
          image: ""
        })
        navigate("/admin/login")
      } else {
        setMessage(data.message || "Sign up failed ❌")
      }
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Restaurant Sign Up</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Restaurant Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${errors.email ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded-lg ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        {/* Cuisine */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Cuisine</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g. Indian, Italian"
            className={`w-full p-2 border rounded-lg ${errors.cuisine ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, Street"
            className={`w-full p-2 border rounded-lg ${errors.location ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/restaurant.jpg"
            className={`w-full p-2 border rounded-lg ${errors.image ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Sign Up
        </button>

        {/* Message */}
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}

        <div className="p-3 text-center">
          <p>
            Already have an account?
            <a href="/admin/login" className="px-1 underline text-orange-500">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RestaurantSignUp
