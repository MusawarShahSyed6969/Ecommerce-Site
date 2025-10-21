import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";

const mockOrders = [
  {
    id: "ORD-1001",
    product: {
      title: "PS5 Pro Console",
      image:
        "https://gameforce.pk/wp-content/uploads/2024/11/ps5-pro-digital-edition-playstation-5-pro-2tb-price-in-pakistan-gameforcepk-3-1.webp",
    },
    status: "Shipped",
    date: "2025-09-10",
    total: 499,
  },
  {
    id: "ORD-1002",
    product: {
      title: "Xbox Series X",
      image:
        "https://gamestop.com.pk/cdn/shop/products/1-78_4ac9bdb4-0049-485f-8b47-78262754d6e5.jpg?v=1741689822&width=1946",
    },
    status: "Processing",
    date: "2025-09-12",
    total: 449,
  },
  {
    id: "ORD-1003",
    product: {
      title: "PS4 Pro (Refurbished)",
      image:
        "https://gameforce.pk/wp-content/uploads/2024/02/sony-playstation-4-ps4-pro-1tb-price-in-pakistan-pre-owned.webp",
    },
    status: "Delivered",
    date: "2025-08-30",
    total: 299,
  },
];

const OrderCard = ({ order }) => {
  return (
    <div
      className="w-full max-w-3xl bg-white  overflow-x-hidden rounded-lg shadow-sm flex gap-4 items-start"
      style={{ paddingInline: 16 }}
    >
    
    <div className="flex justify-between w-full flex-col md:flex-row">
        <div className="flex-shrink-0">
        <img
          src={order.product.image}
          alt={order.product.title}
          className="w-24 h-24 object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold">{order.product.title}</div>
            <div className="text-sm text-gray-500" style={{ marginTop: 4 }}>
              Order ID: {order.id}
            </div>
          </div>

          <div className="flex flex-col text-right items-end gap-1">
            <div className="text-xs text-gray-600">Status</div>
            <div
              style={{ padding: "4px 8px" }}
              className={`text-sm font-medium rounded ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Shipped"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {order.status}
            </div>

            <div className="text-xs text-gray-600" style={{ }}>
              Order on
            </div>
            <div className="text-sm text-gray-700">{order.date}</div>

            <div className="text-xs text-gray-600" style={{ marginTop: 12 }}>
              Total
            </div>
            <div className="text-sm font-semibold">${order.total}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const DashboardOrders = () => {
  const [query, setQuery] = useState("");
  const [orders] = useState(mockOrders);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.product.title.toLowerCase().includes(q)
    );
  }, [query, orders]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Search + total card */}
        <div
          className="bg-white rounded-lg shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ padding: 16, marginBottom: 16 }}
        >
          <div className="flex overflow-x-hidden items-center w-full md:w-2/3 bg-gray-50 rounded border border-gray-200">
            <button
              className=""
              aria-label="search"
              onClick={() => {}}
              style={{ padding: 12 }}
            >
              <FiSearch className="text-gray-600" />
            </button>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order id or product"
              className="flex-1 bg-transparent outline-none text-sm "
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">Total orders</div>
            <div className="text-2xl font-bold">{orders.length}</div>
          </div>
        </div>

        {/* Orders list */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-500" style={{ padding: 32 }}>
              No orders found
            </div>
          ) : (
            filtered.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrders;