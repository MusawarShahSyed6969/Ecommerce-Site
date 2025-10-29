import React, { useState, useMemo } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SNRtZAOvmXjsa9OyAPc7tGCWSRyVXMD1ZQyPp4EICMU8iAIbJextc4lV0pAB7QwOeqJb2QI6q7bLLunmkYGWWtY00voLG8v2k");

export default function OrderPage() {
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
    [cartItems]
  );

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const response = await fetch("http://localhost:4000/api/payment/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        shippingInfo: form,
        customerEmail: form.email,
      }),
    });

    const data = await response.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Navbar />

      <div
        className="flex flex-col md:flex-row items-start justify-center gap-10"
        style={{ padding: "60px 40px" }}
      >
        {/* LEFT FORM */}
        <div
          className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl border border-blue-400/30"
          style={{ padding: "40px" }}
        >
          <h2
            className="text-3xl font-bold text-blue-500 flex items-center gap-2"
            style={{ marginBottom: "24px" }}
          >
            <FaShoppingBag className="text-blue-500" /> Shipping Details
          </h2>

          <form
            onSubmit={handleOrderSubmit}
            className="flex flex-col gap-4"
            style={{ marginBottom: "16px" }}
          >
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="  rounded-lg focus:border-blue-500 outline-none p-3 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className=" rounded-lg focus:border-blue-500 outline-none p-3 w-full"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              onChange={handleChange}
              className=" rounded-lg focus:border-blue-500 outline-none p-3 w-full"
            />

            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                required
                onChange={handleChange}
                className=" rounded-lg focus:border-blue-500 outline-none p-3 w-1/2"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                required
                onChange={handleChange}
                className=" rounded-lg focus:border-blue-500 outline-none p-3 w-1/2"
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className=" rounded-lg focus:border-blue-500 outline-none p-3 w-full"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all w-full"
              style={{ padding: "12px", marginTop: "20px" }}
            >
              Proceed to Payment 💳
            </button>
          </form>
        </div>

        {/* RIGHT SIDE SUMMARY */}
        <div
          className="w-full md:w-1/3 bg-white rounded-2xl shadow-xl border border-gray-300"
          style={{ padding: "30px" }}
        >
          <h3
            className="text-2xl font-bold text-gray-700"
            style={{ marginBottom: "16px" }}
          >
            Order Summary 🧾
          </h3>

          <div className="flex flex-col gap-4">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-gray-200"
                style={{ paddingBottom: "10px" }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="text-left">
                    <p className="text-gray-800 font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                </div>
                <p className="text-blue-500 font-semibold">
                  ${item.price * (item.quantity || 1)}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex justify-between text-lg font-bold text-gray-800"
            style={{ marginTop: "24px" }}
          >
            <span>Total:</span>
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
