import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; // ✅ back arrow icon

export default function Cart() {
  const { cart, removeFromCart, getTotal, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center mb-4 mt-16">
          <IoArrowBack
            className="text-2xl text-orange-600 hover:cursor-pointer"
            onClick={() => navigate(-1)} // ✅ go back
          />
          <h1 className="text-2xl font-bold ml-3">Your Bag</h1>
        </div>
        <h2 className="text-center font-semibold text-xl mt-10">🛒 Your Bag is Empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header with back button */}
      <div className="flex items-center mb-4 mt-16">
        <IoArrowBack
          className="text-2xl text-orange-600 hover:cursor-pointer"
          onClick={() => navigate(-1)} // ✅ go back to restaurant detail
        />
        <h1 className="text-2xl font-bold ml-3">Your Bag</h1>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.price}</p>
                {/* Quantity controls */}
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 hover:cursor-pointer"
                    onClick={() => updateQuantity(index, Math.max((item.quantity || 1) - 1, 1))}
                  >
                    −
                  </button>
                  <span className="px-3 py-1 border-t border-b">{item.quantity || 1}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300 hover:cursor-pointer"
                    onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(index)}
              className="text-orange-500 hover:underline hover:cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total and Order button */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: ₹{getTotal()}</h2>
        <button
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 hover:cursor-pointer"
          onClick={()=>navigate('/placeorder')}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}