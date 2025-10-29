import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromCart } from "../redux/slices/cartSlice";

const CartDrawer = ({ setisDrawerOpen, isDrawerOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🧠 Get cart data from Redux
  const { cartItems, subtotal } = useSelector((state) => state.cart);

  // 🧩 Single cart item component
  const CartDrawerCart = ({ _id, name, quantity, price, image }) => {
    return (
      <div
        style={{ paddingTop: 20 }}
        className="flex gap-5 p-5 justify-between border-b border-gray-200"
      >
        <div className="flex gap-5 items-center">
          <img
            className="w-20 h-20 object-cover rounded"
            src={image}
            alt={name}
          />
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-gray-600 text-sm">Quantity: {quantity}</p>
            <p className="text-gray-800 font-medium">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* ❌ Remove item */}
        <button
          onClick={() => dispatch(removeFromCart(_id))}
          className="cursor-pointer text-gray-600 hover:text-red-500"
        >
          <IoIosClose className="w-7 h-7" />
        </button>
      </div>
    );
  };

  return (
    <div
      className={`bg-white flex flex-col transition-all ease-in duration-300 fixed top-0 right-0 z-50 h-full min-h-full w-80 shadow-lg ${
        isDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div
        style={{ padding: 6 }}
        className="flex justify-between items-center p-5 border-b-2 border-gray-100"
      >
        <p className="text-2xl font-light">Shopping Cart</p>
        <button onClick={() => setisDrawerOpen(false)} className="cursor-pointer">
          <IoCloseCircleOutline className="w-8 h-8 text-gray-600 hover:text-gray-800" />
        </button>
      </div>

      {/* Cart items */}
      <div className="mt-5 overflow-y-auto flex flex-col gap-5 h-full">
        {cartItems.length === 0 ? (
          <div
            className="flex justify-center items-center h-full text-gray-500"
            style={{ padding: 20 }}
          >
            Your cart is empty 🛒
          </div>
        ) : (
          cartItems.map((item) => <CartDrawerCart key={item._id} {...item} />)
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto p-5 border-t-2 border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-700 font-medium">Subtotal:</p>
          <p className="text-xl font-semibold text-gray-900">
            ${subtotal.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setisDrawerOpen(false);
              navigate("/cartcheckout");
            }}
            className="w-full cursor-pointer bg-blue-600 text-white font-semibold h-10 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Cart
          </button>

          <button
            onClick={() => navigate("/orderpage")}
            className="w-full cursor-pointer bg-green-600 text-white font-semibold h-10 rounded-md hover:bg-green-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
