import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const Navbar = () => {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [location, setLocation] = useState("Select City")
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault()
    console.log("Search for:", searchQuery, "in", location)
    // Add search handling logic here
  }

  return (
    <nav className="bg-gray-700 backdrop-blur-sm shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-5">
          {/* Brand / Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <img src="https://media.istockphoto.com/id/1435983029/vector/food-delivery-logo-images.jpg?s=612x612&w=0&k=20&c=HXPxcjOxUiW4pMW1u9E0k2dJYQOU37a_0qZAy3so8fY=" className="h-10 w-10 rounded-xl" alt="OniFood" />
            </div>
            <h1 className="text-2xl text-white font-bold text-primary font-inter">FoodieHub</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-white">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-card rounded-lg overflow-hidden shadow-sm"
            >
              <div className="flex items-center px-3">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search delicious food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 outline-none w-64 text-foreground bg-transparent placeholder-muted-foreground"
              />
              <button
                type="submit"
                className="bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium"
              >
                Search
              </button>
            </form>

            {/* Location Dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-muted-foreground mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-card text-foreground px-3 py-2 rounded-lg outline-none cursor-pointer hover:border-primary/50 transition-colors duration-200"
                >
                  <option>Select City</option>
                  <option>New York</option>
                  <option>Los Angeles</option>
                  <option>Chicago</option>
                  <option>Houston</option>
                </select>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="flex items-center text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </a>
              <a
                href="/orders"
                className="flex items-center text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Orders
              </a>
            </div>

            {/* Cart */}
            <div className="relative">
              <button onClick={()=>navigate('/cart')} className="flex items-center cursor-pointer text-foreground hover:text-primary transition-colors duration-200 p-2 rounded-lg hover:bg-card">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-bold min-w-[20px] text-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              <button onClick={()=>navigate('/login')} className="text-foreground cursor-pointer hover:text-primary transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-card">
                Login
              </button>
              <button onClick={()=>navigate('/signup')} className="bg-accent cursor-pointer flex text-accent-foreground px-3 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200 font-medium shadow-sm">
                SignUp
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            {/* Mobile Cart */}
            <div className="relative">
              <button className="flex items-center text-foreground hover:text-primary transition-colors duration-200 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full px-2 py-1 text-xs font-bold min-w-[20px] text-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none p-2 rounded-lg hover:bg-card transition-colors duration-200"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="flex-1 flex items-center bg-background rounded-lg border border-border overflow-hidden">
                <div className="flex items-center px-3">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-2 outline-none bg-transparent text-foreground placeholder-muted-foreground"
                />
              </div>
              <button className="bg-primary px-4 py-2 text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                Search
              </button>
            </form>

            {/* Mobile Location */}
            <div className="flex items-center">
              <svg className="w-4 h-4 text-muted-foreground mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg outline-none bg-background border border-border text-foreground"
              >
                <option>Select City</option>
                <option>New York</option>
                <option>Los Angeles</option>
                <option>Chicago</option>
                <option>Houston</option>
              </select>
            </div>

            {/* Mobile Links */}
            <div className="space-y-2">
              <a
                href="/"
                className="flex items-center text-foreground hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </a>
              <a
                href="/orders"
                className="flex items-center text-foreground hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Orders
              </a>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-border">
              <button className="flex-1 cursor-pointer text-foreground hover:text-primary transition-colors duration-200 font-medium px-4 py-2 rounded-lg border border-border hover:bg-background">
                Login
              </button>
              <button className="flex-1 cursor-pointer bg-accent text-accent-foreground px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200 font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
