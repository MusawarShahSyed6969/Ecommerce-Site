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
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";

const DashboardStats = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { reviews,loading } = useSelector((state) => state.reviews);

  const [visits, setVisits] = useState([]);

  // ✅ Track daily visitors in localStorage (simulate analytics)
  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "short",
    });

    let visitData = JSON.parse(localStorage.getItem("visits")) || [
      { day: "Mon", visits: 0 },
      { day: "Tue", visits: 0 },
      { day: "Wed", visits: 0 },
      { day: "Thu", visits: 0 },
      { day: "Fri", visits: 0 },
      { day: "Sat", visits: 0 },
      { day: "Sun", visits: 0 },
    ];

    const todayIndex = visitData.findIndex((d) => d.day === today);
    if (todayIndex !== -1) {
      visitData[todayIndex].visits += 1;
    }

    localStorage.setItem("visits", JSON.stringify(visitData));
    setVisits(visitData);
  }, []);

  // ✅ Fetch orders and reviews from Redux slices
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(fetchAllReviews());
  }, [dispatch]);

  // ✅ Compute stats dynamically
  const totalOrders = orders.length;
  const totalVisitorsToday =
    visits.find((d) => d.day === new Date().toLocaleDateString("en-US", { weekday: "short" }))
      ?.visits || 0;
  const totalUsers = new Set(orders.map((o) => o.userId)).size;
  const totalReviews = reviews.length;

  const stats = [
    { title: "Total Orders", value: totalOrders, icon: <ShoppingBag className="text-btn-primary" size={26} /> },
    { title: "Visitors Today", value: totalVisitorsToday, icon: <Activity className="text-btn-primary" size={26} /> },
    { title: "Active Users", value: totalUsers, icon: <Users className="text-btn-primary" size={26} /> },
    { title: "New Reviews", value: totalReviews, icon: <Star className="text-btn-primary" size={26} /> },
  ];

  console.log(reviews);
  
  const recentOrders = orders.slice(-5).reverse();
  const recentReviews = reviews.slice(-5).reverse();
  console.log(recentReviews);
  

  return (
    <div>
      <Navbar />

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
                <Line type="monotone" dataKey="visits" stroke="#007bff" strokeWidth={3} dot={{ r: 4 }} />
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
              {recentOrders.map((order, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-800">{order.user?.name || "Unknown User"}</p>
                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-700">${order.totalAmount}</p>
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
  {/* Reviews */}
<div className="bg-white shadow-md rounded-xl" style={{ padding: "20px" }}>
  <h3 className="text-xl font-semibold text-gray-700 mb-3">⭐ Recent Reviews</h3>

  {loading ? (
    <p className="text-gray-500 text-center">Loading reviews...</p>
  ) : reviews.length === 0 ? (
    <p className="text-gray-500 text-center">No reviews yet.</p>
  ) : (
    <div className="space-y-3">
      {recentReviews.slice(0, 5).map((rev, i) => (
        <div
          key={i}
          className="flex justify-between items-center border-b border-gray-100 pb-2"
        >
          <div>
            <p className="font-medium text-gray-800">
              {rev.name || "Anonymous"}
            </p>
            <p className="text-sm font-bold text-btn-primary ">{rev.product?.name}</p>
            <p className="text-sm text-gray-500">{rev.comment}</p>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: rev.rating }).map((_, j) => (
           <Star key={j} className="text-yellow-500" size={16} fill="currentColor" />

            ))}
          </div>
        </div>
      ))}
    </div>
  )}
</div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardStats;
