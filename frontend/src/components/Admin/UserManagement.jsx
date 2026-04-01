import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      _id: "12345",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      _id: "12346",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Customer",
    },
    {
      _id: "12347",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Customer",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      _id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    setUsers([...users, newUser]); // 🔥 add user

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, role: newRole } : user,
    );

    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const filteredUsers = users.filter((user) => user._id !== userId);
      setUsers(filteredUsers);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6 font-manrope">
      <h2 className="text-2xl font-dm-serif mb-6">User Management</h2>

      {/* Add new user form */}
      <div className="bg-white p-6 rounded-lg border border-border mb-6">
        <h3 className="text-xl font-semibold mb-6 text-heading">
          Add New User
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm mb-1 text-heading">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full px-3 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary-500 outline-none transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-heading">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-3 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary-500 outline-none transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm mb-1 text-heading">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-3 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary-500 outline-none transition"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm mb-1 text-heading">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-border focus:ring-2 focus:ring-primary-500 outline-none transition"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-md transition font-medium"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-body">
          {/* Table Header */}
          <thead className="bg-neutral-100 text-sm uppercase text-heading">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          {/* User List */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-border cursor-pointer hover:bg-neutral-100 transition-colors"
              >
                <td className="p-4 font-medium text-body whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border border-border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-4">
                  <div className="relative group inline-block">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="w-10 h-10 flex items-center justify-center rounded-full 
               border border-border text-body 
               hover:bg-error hover:text-white transition-all duration-200"
                    >
                      <AiOutlineDelete className="text-lg" />
                    </button>

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
               opacity-0 group-hover:opacity-100
               transition-all duration-200 pointer-events-none"
                    >
                      <div className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-md shadow-md">
                        Delete
                      </div>

                      {/* Arrow */}
                      <div className="w-2 h-2 bg-gray-800 rotate-45 mx-auto -mt-1"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
