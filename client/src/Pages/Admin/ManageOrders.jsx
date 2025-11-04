import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";

export default function OrdersPanel() {
    const dispatch = useDispatch();
    const ordersData = useSelector((state) => state.orders.orders || []);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const modalRef = useRef();

    const filters = ["all", "completed", "pending", "shipped", "cancelled"];

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const filteredOrders = ordersData.filter((order) => {
        const matchesFilter =
            selectedFilter === "all" ||
            (selectedFilter === "completed" && order.orderStatus === "Delivered") ||
            (selectedFilter === "pending" && order.orderStatus === "Processing") ||
            (selectedFilter === "shipped" && order.orderStatus === "Shipped") ||
            (selectedFilter === "cancelled" && order.orderStatus === "Cancelled");

        const matchesSearch =
            order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Count orders per status for badge
    const orderCounts = {
        pending: ordersData.filter(o => o.orderStatus === "Processing").length,
        shipped: ordersData.filter(o => o.orderStatus === "Shipped").length,
        cancelled: ordersData.filter(o => o.orderStatus === "Cancelled").length,
        completed: ordersData.filter(o => o.orderStatus === "Delivered").length,
        all: ordersData.length
    };

    const handleChangeStatus = (orderId, status) => {
        dispatch(updateOrderStatus({ id: orderId, orderStatus: status }))
            .then(() => {
                setSelectedOrder((prev) => ({ ...prev, orderStatus: status }));
                setSelectedOrder(null); // Close modal after action
            })
            .catch((err) => console.error(err));
    };

    // Close modal on click outside
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSelectedOrder(null);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="min-h-screen bg-gray-100 flex flex-col items-center" style={{ padding: "16px" }}>
                {/* Filter Buttons */}
                {/* Filter Buttons */}
                <div className="flex gap-2 flex-wrap" style={{ marginBottom: "16px" }}>
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`relative rounded ${selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            style={{ padding: "8px 16px" }}
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)} Orders
                            {(filter === "pending" && orderCounts.pending > 0) && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {orderCounts.pending}
                                </span>
                            )}
                            {(filter === "all" && orderCounts.all > 0) && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                    {orderCounts.all}
                                </span>
                            )}
                        </button>
                    ))}
                </div>


                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by Order ID or Username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ padding: "8px 16px", marginBottom: "16px", width: "100%", maxWidth: "400px" }}
                />

                {/* Orders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full" style={{ marginBottom: "32px" }}>
                    {filteredOrders.map((order) => (
                        <div
                            key={order._id}
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition flex flex-col items-center"
                            style={{ padding: "16px", width: "100%", maxWidth: "300px" }}
                        >
                            <div className="w-full h-48 overflow-hidden rounded-md flex justify-center items-center" style={{ marginBottom: "16px" }}>
                                <img
                                    src={order.items?.[0]?.image || "https://via.placeholder.com/150"}
                                    alt={order.items?.[0]?.name || "No Image"}
                                    className="object-contain w-full h-full"
                                />
                            </div>

                            <h2 className="font-semibold text-lg text-center" style={{ marginBottom: "8px" }}>
                                {order.items?.[0]?.name || "No Name"}
                            </h2>

                            <p className="text-gray-600 text-sm text-center" style={{ marginBottom: "4px" }}>
                                By: <span className="font-medium">{order.user?.name || "Unknown User"}</span>
                            </p>

                            <p className="text-gray-500 text-xs text-center" style={{ marginBottom: "4px" }}>
                                {order._id || "N/A"}
                            </p>

                            <p className="text-gray-500 text-xs text-center" style={{ marginBottom: "4px" }}>
                                Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                            </p>

                            <p
                                className={`font-semibold ${order.orderStatus === "Processing"
                                        ? "text-yellow-600"
                                        : order.orderStatus === "Delivered"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                style={{ marginTop: "8px" }}
                            >
                                {order.orderStatus || "Unknown Status"}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleOutsideClick}>
                        <div
                            ref={modalRef}
                            className="bg-white rounded-lg max-w-2xl w-full relative overflow-y-auto"
                            style={{ padding: "32px", maxHeight: "90vh" }}
                        >
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 font-bold text-lg"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-semibold text-center" style={{ marginBottom: "16px" }}>
                                Order Details
                            </h2>

                            {/* Product */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ marginBottom: "16px" }}>
                                <div className="w-full sm:w-1/3 h-40 overflow-hidden rounded-md flex justify-center items-center" style={{ marginBottom: "16px" }}>
                                    <img
                                        src={selectedOrder.items?.[0]?.image || "https://via.placeholder.com/150"}
                                        alt={selectedOrder.items?.[0]?.name || "No Image"}
                                        className="object-contain w-full h-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold" style={{ marginBottom: "4px" }}>
                                        {selectedOrder.items?.[0]?.name || "Unknown Product"}
                                    </h3>
                                    <p style={{ marginBottom: "4px" }}>Quantity: {selectedOrder.items?.[0]?.quantity || 0}</p>
                                    <p style={{ marginBottom: "4px" }}>Price: ${selectedOrder.items?.[0]?.price || 0}</p>
                                    <p>Total: ${selectedOrder.totalAmount || 0}</p>
                                </div>
                            </div>

                            {/* Shipping Info */}
                            <div style={{ marginBottom: "16px" }}>
                                <h3 className="font-semibold" style={{ marginBottom: "8px" }}>
                                    Shipping Information
                                </h3>
                                <p style={{ marginBottom: "4px" }}>Name: {selectedOrder.shippingInfo?.fullName || "N/A"}</p>
                                <p style={{ marginBottom: "4px" }}>Email: {selectedOrder.shippingInfo?.email || "N/A"}</p>
                                <p style={{ marginBottom: "4px" }}>Phone: {selectedOrder.shippingInfo?.phone || "N/A"}</p>
                                <p>
                                    Address: {selectedOrder.shippingInfo?.address || "N/A"},{" "}
                                    {selectedOrder.shippingInfo?.city || "N/A"}, {selectedOrder.shippingInfo?.zipCode || "N/A"}
                                </p>
                            </div>

                            {/* Payment Info */}
                            <div style={{ marginBottom: "16px" }}>
                                <h3 className="font-semibold" style={{ marginBottom: "8px" }}>
                                    Payment
                                </h3>
                                <p style={{ marginBottom: "4px" }}>Status: {selectedOrder.paymentStatus || "N/A"}</p>
                                <p>Payment ID: {selectedOrder.paymentIntentId || "N/A"}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 flex-wrap justify-center" style={{ marginTop: "16px" }}>
                                {["Delivered", "Shipped", "Cancelled"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => handleChangeStatus(selectedOrder._id, status)}
                                        className={`rounded text-white ${status === "Delivered"
                                                ? "bg-green-600 hover:bg-green-700"
                                                : status === "Shipped"
                                                    ? "bg-yellow-600 hover:bg-yellow-700"
                                                    : "bg-red-600 hover:bg-red-700"
                                            }`}
                                        style={{ padding: "8px 16px" }}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
