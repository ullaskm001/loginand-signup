import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/users", {
        headers: {
          "x-access-token": token, // ⬅ Add token here
        },
      });

      console.log(res.data);

      if (res.data.status === "ok") {
        setUsers(res.data.users);
      } else {
        alert("Access Denied! Login first.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-blue-800 text-white p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={logout} className="bg-red-500 px-4 py-2 rounded-md">
          Logout
        </button>
      </div>

      <div className="bg-blue-950 mt-6 p-6 rounded-xl">
        <h2 className="text-xl mb-4">Registered Users</h2>
        
        <table className="w-full border text-white text-center">
          <thead>
            <tr className="bg-blue-700">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">DOB</th>
              <th className="p-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr key={i} className="border">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.dob}</td>
                  <td className="p-2 border">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2">No Users Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
