import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./UsersPage";
import RestaurantsPage from "./RestaurantsPage";

const AdminDashboard = () => (
  <div className="flex">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <nav className="space-y-2">
        <Link to="/admin/users" className="block hover:text-red-500">Manage Users</Link>
        <Link to="/admin/restaurants" className="block hover:text-red-500">Manage Restaurants</Link>
      </nav>
    </aside>
  </div>
);

export default AdminDashboard;
