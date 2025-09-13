import { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // get token from storage
      const res = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/admin/viewUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users); 
    } catch (error) {
      console.error("Fetch Users Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.REACT_APP_BACKEND_URL}/api/admin/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted successfully!");
      setUsers(users.filter((u) => u.id !== id)); // update UI instantly
    } catch (error) {
      console.error("Delete User Error:", error.response?.data || error.message);
      alert("Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Created At</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
