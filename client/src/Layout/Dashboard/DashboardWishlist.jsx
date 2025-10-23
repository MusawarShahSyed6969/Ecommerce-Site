import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";

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
      className="w-full max-w-3xl bg-white hover:scale-[1.02] hover:shadow-md cursor-pointer transition-all duration-300  overflow-x-hidden rounded-lg shadow-sm flex gap-4 items-start"
      style={{ paddingInline: 16 }}
    >
    
    <div className="flex justify-between items-center w-full flex-col md:flex-row">

        <div className="flex-shrink-0 flex justify-center items-center" style={{padding:8}}>
        <img
          src={order.product.image}
          alt={order.product.title}
          className="w-24 h-24 object-cover rounded"
        />
         <div className="text-lg font-semibold">{order.product.title}</div>
      </div>

      <div>
        <div className="flex justify-center items-center">
        

          <div className="flex  text-right items-end gap-1">
          
          
          
          <div className="flex flex-col">
              <div className="text-sm text-gray-700"> <span>Added on:</span> {order.date}</div>

            <div className="text-sm font-semibold">${order.total}</div>

          </div>

            <div>
                <IoCloseCircleOutline className="h-8 w-8 cursor-pointer"/>
            </div>
            
          </div>

        

        </div>
      </div>
    </div>
    </div>
  );
};

const DashboardWishlist = () => {

  const [orders] = useState(mockOrders);


  

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

            <div>
              <h2>Wishlist items</h2>
            </div>
         
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500">Total orders</div>
            <div className="text-2xl font-bold">{orders.length}</div>
          </div>
        </div>

        {/* Orders list */}
        <div className="flex flex-col gap-4">
          {orders.length === 0 ? (
            <div className="text-center text-gray-500" style={{ padding: 32 }}>
              No orders found
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard order={order} key={order.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};


export default DashboardWishlist