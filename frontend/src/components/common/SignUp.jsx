"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const navigate = useNavigate()

  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState("")

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // ✅ Validate inputs without external libs
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

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      const res = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage("Account created successfully 🎉")
        console.log("User:", data)
        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
        navigate('/login')
      } else {
        setMessage(data.message || "Sign up failed ❌")
      }
    } catch (error) {
      console.error(error)
      setMessage("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Full Name</label>
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Sign Up
        </button>

        {/* Message */}
        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}

        <div className="p-3">
          <p>Already have an Account?
            <a href="/login" className="px-1 underline text-orange-500">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
