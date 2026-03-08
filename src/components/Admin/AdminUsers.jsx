import { useEffect, useState } from "react";
import axios from "../../utils/axios";

const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [toast, setToast] = useState(null);

  // =========================
  // Fetch Users
  // =========================
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const { data } = await axios.get("/admin/users");

        setUsers(data);

      } catch (error) {

        console.error("Fetch users error:", error);

      }

    };

    fetchUsers();

  }, []);


  // =========================
  // Toast Auto Close
  // =========================
  useEffect(() => {

    if (toast) {

      const timer = setTimeout(() => setToast(null), 2500);

      return () => clearTimeout(timer);

    }

  }, [toast]);


  // =========================
  // Delete User
  // =========================
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    try {

      await axios.delete(`/admin/users/${id}`);

      setUsers(users.filter((user) => user._id !== id));

      setToast("User deleted");

    } catch (error) {

      console.log(error);

    }

  };


  // =========================
  // Change Role
  // =========================
  const handleRoleChange = async (id, role) => {

    try {

      await axios.put(`/admin/users/${id}`, { role });

      const updatedUsers = users.map((user) =>
        user._id === id
          ? { ...user, role }
          : user
      );

      setUsers(updatedUsers);

      setToast(`Role updated to ${role}`);

    } catch (error) {

      console.log(error);

    }

  };


  // =========================
  // Filter Users
  // =========================
  const filteredUsers = users.filter((user) => {

    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;

  });


  // =========================
  // Role Badge Colors
  // =========================
  const roleColors = {
    admin: "bg-purple-100 text-purple-700",
    user: "bg-blue-100 text-blue-700",
  };


  return (

    <div className="p-6 relative">

      <h1 className="text-2xl font-bold text-[#4E342E] mb-6">
        User Management
      </h1>


      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-6">

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-64"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >

          <option value="All">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>

        </select>

      </div>


      {/* Users Table */}

      <div className="bg-white rounded-xl shadow-md border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-[#f3ede7] text-[#5D4037]">

            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="px-4">Email</th>
              <th className="px-4">Role</th>
              <th className="px-4">Change Role</th>
              <th className="px-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user._id} className="border-b">

                <td className="py-3 px-4 font-medium">
                  {user.name}
                </td>

                <td className="px-4">
                  {user.email}
                </td>

                {/* Role Badge */}

                <td className="px-4">

                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${roleColors[user.role]}`}
                  >
                    {user.role}
                  </span>

                </td>


                {/* Role Change */}

                <td className="px-4">

                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user._id, e.target.value)
                    }
                    className="border px-2 py-1 rounded"
                  >

                    <option value="user">User</option>
                    <option value="admin">Admin</option>

                  </select>

                </td>


                {/* Delete */}

                <td className="px-4 text-center">

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Toast */}

      {toast && (

        <div className="fixed bottom-6 right-6 bg-[#4E342E] text-white px-6 py-3 rounded-xl shadow-lg">
          {toast}
        </div>

      )}

    </div>

  );

};

export default AdminUsers;