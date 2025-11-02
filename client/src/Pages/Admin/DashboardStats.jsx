import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { ShoppingBag, Users, Star, Activity } from "lucide-react";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

const DashboardStats = () => {
  const [visits, setVisits] = useState([
    { day: "Mon", visits: 150 },
    { day: "Tue", visits: 230 },
    { day: "Wed", visits: 320 },
    { day: "Thu", visits: 280 },
    { day: "Fri", visits: 350 },
    { day: "Sat", visits: 420 },
    { day: "Sun", visits: 390 },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 1,
      user: "John Doe",
      total: 220,
      status: "Delivered",
      date: "2025-11-02",
    },
    {
      id: 2,
      user: "Sarah Khan",
      total: 150,
      status: "Processing",
      date: "2025-11-01",
    },
  ]);

  const [reviews, setReviews] = useState([
    { id: 1, user: "Ali Raza", rating: 5, comment: "Amazing product!" },
    { id: 2, user: "Emma Watson", rating: 4, comment: "Good service!" },
  ]);

  const stats = [
    { title: "Total Orders", value: 1243, icon: <ShoppingBag className="text-btn-primary" size={26} /> },
    { title: "Visitors Today", value: 845, icon: <Activity className="text-btn-primary" size={26} /> },
    { title: "Active Users", value: 312, icon: <Users className="text-btn-primary" size={26} /> },
    { title: "New Reviews", value: 58, icon: <Star className="text-btn-primary" size={26} /> },
  ];

  return (
   <div>
        <Navbar/>


        <div>
             <div className="min-h-screen bg-gray-50 flex flex-col">
      <h1
        className="text-3xl font-bold text-center text-btn-primary"
        style={{ marginTop: 30, marginBottom: 20 }}
      >
        📊 Dashboard Overview
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-xl flex items-center justify-between"
            style={{ padding: "20px" }}
          >
            <div>
              <p className="text-gray-500 text-sm">{s.title}</p>
              <h2 className="text-2xl font-semibold text-gray-800">{s.value}</h2>
            </div>
            <div className="p-3 bg-btn-primary/10 rounded-full">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 px-6"
        style={{ marginBottom: 30 }}
      >
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-xl" style={{ padding: "20px" }}>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">📈 Daily Visits</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#007bff"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-xl" style={{ padding: "20px" }}>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">💰 Sales Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={visits}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders & Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6" style={{ marginBottom: 40 }}>
        {/* Orders */}
        <div className="bg-white shadow-md rounded-xl" style={{ padding: "20px" }}>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">🛒 Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{order.user}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-700">${order.total}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white shadow-md rounded-xl" style={{ padding: "20px" }}>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">⭐ Recent Reviews</h3>
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="flex justify-between items-center border-b border-gray-100 pb-2"
              >
                <div>
                  <p className="font-medium text-gray-800">{rev.user}</p>
                  <p className="text-sm text-gray-500">{rev.comment}</p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="text-yellow-500" size={16} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
        </div>


        <Footer/>
   </div>
  );
};

export default DashboardStats;
