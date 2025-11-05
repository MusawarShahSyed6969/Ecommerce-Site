import React, { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../../redux/slices/orderSlice"; // ✅ thunk
import Pagination from "../../Components/common/Pagination";

const OrderCard = ({ order }) => {
  const total = order.totalAmount || order.total;
  const status = order.orderStatus || order.status;
  const date = new Date(order.createdAt).toLocaleDateString();

  return (
    <div className="w-full max-w-3xl rounded-lg shadow-sm flex transition-transform duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer p-4 gap-4">
      
      {/* Image */}
      <div className="flex-shrink-0 ">
        <img
          src={order.items?.[0]?.image}
          alt={order.items?.[0]?.name}
          className="w-24 h-24 object-cover rounded"
        />
      </div>

      {/* Info + Status */}
      <div className="flex  flex-1 justify-between items-center gap-4 flex-wrap md:flex-nowrap">
        
        {/* Left: Product Info */}
        <div className="flex-1  min-w-[150px]">
          <div className="text-lg font-semibold">{order.items?.[0]?.name}</div>
          <div className="text-sm text-gray-500 mt-1">Order ID: {order._id}</div>
        </div>

        {/* Right: Status / Date / Total */}
        <div className="flex flex-col  items-end gap-1 min-w-[120px]">
          <div className="text-xs text-gray-600">Status</div>
          <div
            className={`text-sm font-medium rounded px-2 py-1 ${
              status === "Delivered"
                ? "bg-green-100 text-green-700"
                : status === "Shipped"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {status}
          </div>

          <div className="text-xs text-gray-600 mt-1">Order on</div>
          <div className="text-sm text-gray-700">{date}</div>

          <div className="text-xs text-gray-600 mt-2">Total</div>
          <div className="text-sm font-semibold">${total}</div>
        </div>

      </div>
    </div>
  );
};

const DashboardOrders = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth?.userInfo.user); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserOrders());
    }
  }, [dispatch, user]);

  // ✅ Filtered orders based on search query
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders || [];
    return orders.filter(
      (o) =>
        o._id.toLowerCase().includes(q) ||
        o.items?.[0]?.name?.toLowerCase().includes(q)
    );
  }, [query, orders]);

  // ✅ Reset to page 1 whenever search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // ✅ Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Search + total card */}
        <div
          className="bg-white rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ padding: 16, marginBottom: 16 }}
        >
          <div className="flex overflow-x-hidden items-center w-full md:w-2/3 bg-gray-50 rounded border border-gray-200">
            <button className="" aria-label="search" style={{ padding: 12 }}>
              <FiSearch className="text-gray-600" />
            </button>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order id or product"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">Total orders</div>
            <div className="text-2xl font-bold">{orders?.length || 0}</div>
          </div>
        </div>

        {/* Orders list */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center text-gray-500" style={{ padding: 32 }}>
              Loading orders...
            </div>
          ) : error ? (
            <div className="text-center text-red-500" style={{ padding: 32 }}>
              {error}
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center text-gray-500" style={{ padding: 32 }}>
              No orders found
            </div>
          ) : (
            currentProducts.map((order) => <OrderCard order={order} key={order._id} />)
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-12"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardOrders;
